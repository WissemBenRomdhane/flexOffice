import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchOffices } from "@/actions/officeActions";
import {
  fetchReservationsByDate,
  addReservation,
} from "@/actions/reservationActions";
import Office from "./Office";
import { format } from "date-fns";

const Reservation = ({ rooms }) => {
  const dispatch = useDispatch();
  const offices = useSelector((state) => state.office.offices);
  const reservations = useSelector((state) => state.reservation.reservations);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [timeSlots, setTimeSlots] = useState({
    morning: false,
    afternoon: false,
    fullDay: false,
  });

  useEffect(() => {
    if (selectedRoom) {
      dispatch(fetchOffices(selectedRoom));
    }
  }, [selectedRoom, dispatch]);

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = format(new Date(selectedDate), "yyyy-MM-dd");
      dispatch(fetchReservationsByDate(selectedRoom, formattedDate));
    }
  }, [selectedRoom, selectedDate, dispatch]);

  const getOfficeStatus = (office) => {
    const formattedDate = format(new Date(selectedDate), "yyyy-MM-dd");

    // Récupérer les réservations du bureau pour la date sélectionnée
    const officeReservations = Array.isArray(reservations)
      ? reservations?.filter(
          (res) => res.officeId === office._id && res.date === formattedDate
        )
      : [];

    // Vérifier les créneaux réservés
    if (reservations?.some((res) => res.timeSlot === "fullDay")) {
      return "full"; // Toute la journée
    }
    if (reservations?.some((res) => res.timeSlot === "morning")) {
      return "morning"; // Matinée
    }
    if (reservations?.some((res) => res.timeSlot === "afternoon")) {
      return "afternoon"; // Après-midi
    }

    return "available"; // Bureau disponible
  };

  const roomOptions = rooms.map((room) => ({
    value: room._id,
    label: room.name,
  }));

  const handleRoomChange = (selectedOption) => {
    setSelectedRoom(selectedOption.value);
    setSelectedDate(null); // Réinitialise la date sélectionnée
  };

  const handleCheckboxChange = (slot) => {
    setTimeSlots({
      morning: slot === "morning",
      afternoon: slot === "afternoon",
      fullDay: slot === "fullDay",
    });
  };

  const handleReservation = async () => {
    const selectedSlot = Object.keys(timeSlots).find((key) => timeSlots[key]);

    // Vérifier si le bureau est déjà réservé pour le créneau sélectionné
    const officeReservations = reservations?.filter(
      (res) =>
        res.officeId === selectedOffice &&
        res.date === selectedDate?.toISOString() &&
        res.timeSlot === selectedSlot
    );

    if (officeReservations.length > 0) {
      alert("Ce bureau est déjà réservé pour ce créneau horaire.");
      return;
    }

    try {
      const response = await dispatch(
        addReservation({
          roomId: selectedRoom,
          officeId: selectedOffice,
          date: selectedDate?.toISOString(),
          timeSlot: selectedSlot,
          userId: currentUser._id,
        })
      );

      if (response) {
        alert("Réservation effectuée avec succès !");
        // Réinitialiser les sélections
        setSelectedRoom("");
        setSelectedDate(null);
        setSelectedOffice(null);
        setTimeSlots({ morning: false, afternoon: false, fullDay: false });
      }
    } catch (error) {
      alert("Erreur lors de la réservation : " + error.message);
    }
  };

  const isDateDisabled = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Réinitialise l'heure à 00:00:00
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 3); // Ajoute 3 mois à la date actuelle

    // Désactiver les week-ends
    const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Dimanche ou Samedi

    // Désactiver les dates avant aujourd'hui, après 3 mois, ou les week-ends
    return date < today || date > maxDate || isWeekend;
  };

  return (
    <div className="min-h-screen p-8">
      {/* Étape 1 : Sélection de la salle */}
      <div className="mb-6">
        <h2 className="text-white text-xl font-bold mb-4">
          Choisissez une salle
        </h2>
        <Select
          className="w-full text-black"
          options={roomOptions}
          value={
            roomOptions.find((option) => option.value === selectedRoom) || null
          }
          onChange={handleRoomChange}
          placeholder="Sélectionnez une salle"
        />
      </div>

      {/* Étape 2 : Sélection de la date */}
      {selectedRoom && (
        <div className="mb-6">
          <h2 className="text-white text-xl font-bold mb-4">
            Choisissez une date
          </h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileDisabled={isDateDisabled}
            className="bg-white rounded-md shadow-md"
          />
        </div>
      )}

      {/* Étape 3 : Sélection du créneau horaire */}
      {selectedDate && (
        <div className="mb-6">
          <h2 className="text-white text-xl font-bold mb-4">
            Choisissez un créneau horaire
          </h2>
          <div className="space-y-2">
            {["morning", "afternoon", "fullDay"].map((slot) => (
              <label
                key={slot}
                className="flex items-center space-x-2 text-white"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-500"
                  checked={timeSlots[slot]}
                  onChange={() => handleCheckboxChange(slot)}
                />
                <span>
                  {slot === "morning"
                    ? "Matinée"
                    : slot === "afternoon"
                    ? "Après-midi"
                    : "Toute la journée"}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Étape 4 : Sélection du bureau */}
      {selectedDate && Object.values(timeSlots).some((val) => val) && (
        <div className="mb-6">
          <h2 className="text-white text-xl font-bold mb-4">
            Sélectionnez votre bureau
          </h2>
          <div className="grid grid-cols-3 gap-4 p-8">
            {offices.map((office) => (
              <Office
                key={office._id}
                status={getOfficeStatus(office)}
                isSelected={selectedOffice === office._id}
                equipment={office.equipment}
                onClick={() => setSelectedOffice(office._id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Bouton de réservation */}
      {selectedOffice && (
        <button
          className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-700"
          onClick={handleReservation}
        >
          Réserver
        </button>
      )}
    </div>
  );
};

export default Reservation;
