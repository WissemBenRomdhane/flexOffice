const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const Office = require("../models/Office");
const { startOfDay, endOfDay } = require("date-fns");

// Créer une réservation
router.post("/", async (req, res) => {
  const { roomId, officeId, date, timeSlot, userId } = req.body;

  try {
    // Vérifier si le bureau est déjà réservé
    const existingReservations = await Reservation.find({
      officeId,
      date,
      timeSlot: {
        $in:
          timeSlot === "fullDay"
            ? ["morning", "afternoon", "fullDay"]
            : [timeSlot, "fullDay"],
      },
    });

    if (existingReservations.length > 0) {
      return res
        .status(400)
        .json({ message: "Ce bureau est déjà réservé pour ce créneau." });
    }

    // Créer une nouvelle réservation
    const reservation = new Reservation({
      roomId,
      officeId,
      date,
      timeSlot,
      userId,
    });
    await reservation.save();
    // Mettre à jour l'état du bureau comme réservé
    if (timeSlot === "fullDay") {
      await Office.findByIdAndUpdate(officeId, { isBooked: true });
    }
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la réservation.", error });
  }
});

// Obtenir toutes les réservations
router.get("/", async (req, res) => {
  console.log("Date reçue :");
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des réservations.",
      error,
    });
  }
});

// Obtenir les réservations par salle et date
router.get("/:roomId", async (req, res) => {
  const { roomId } = req.params;
  const { date } = req.query;

  try {
    const startDate = startOfDay(new Date(date)); // Début de la journée
    const endDate = endOfDay(new Date(date)); // Fin de la journée
    // Récupérer les réservations pour la salle et la date données
    const reservations = await Reservation.find({
      roomId,
      date: { $gte: startDate, $lte: endDate }, // Plage de dates
    });
    // Regrouper les créneaux horaires réservés par officeId
    const bookedOffices = reservations.reduce((acc, reservation) => {
      if (!acc[reservation.officeId]) {
        acc[reservation.officeId] = new Set();
      }
      acc[reservation.officeId].add(reservation.timeSlot);
      return acc;
    }, {});

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des réservations.",
      error,
    });
  }
});

// Obtenir les réservations par salle et bureau
router.get("/:roomId/:officeId", async (req, res) => {
  try {
    const { roomId, officeId } = req.params;
    const reservations = await Reservation.find({ roomId, officeId });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des réservations.",
      error,
    });
  }
});

// Supprimer une réservation
router.delete("/:id", async (req, res) => {
  try {
    const reservationId = req.params.id;

    // Trouver la réservation à supprimer
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable." });
    }

    const { officeId } = reservation;

    // Supprimer la réservation
    await Reservation.findByIdAndDelete(reservationId);

    // Vérifier s'il reste des réservations pour ce bureau
    const remainingReservations = await Reservation.find({ officeId });
    if (remainingReservations.length === 0) {
      // Si plus aucune réservation, rendre le bureau libre
      await Office.findByIdAndUpdate(officeId, { isBooked: false });
    }

    res.status(200).json({ message: "Réservation supprimée avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression.", error });
  }
});

module.exports = router;
