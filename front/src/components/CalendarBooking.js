import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import BookingForm from './BookingForm';

const CalendarBooking = ({ rooms, offices }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedOffice, setSelectedOffice] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedRoom(null);
    setSelectedOffice(null);
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setSelectedOffice(null);
  };

  const handleOfficeSelect = (office) => {
    setSelectedOffice(office);
  };

  const handleBooking = (booking) => {
    // Gérer la logique de réservation
    console.log('Réservation effectuée:', booking);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Réserver un bureau</h1>
      <Calendar onChange={handleDateChange} value={selectedDate} />
      {selectedDate && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Sélectionner une salle</h2>
          <div className="grid grid-cols-2 gap-4">
            {rooms.map((room) => (
              <div
                key={room.id}
                className={`p-4 border rounded ${selectedRoom && selectedRoom.id === room.id ? 'bg-gray-200' : ''}`}
                onClick={() => handleRoomSelect(room)}
              >
                <h3 className="font-bold">{room.name}</h3>
                <p>{room.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedRoom && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Sélectionner un bureau</h2>
          <div className="grid grid-cols-2 gap-4">
            {offices
              .filter((office) => office.roomId === selectedRoom.id)
              .map((office) => (
                <div
                  key={office.id}
                  className={`p-4 border rounded ${selectedOffice && selectedOffice.id === office.id ? 'bg-gray-200' : ''}`}
                  onClick={() => handleOfficeSelect(office)}
                >
                  <h3 className="font-bold">{office.name}</h3>
                  <p>{office.description}</p>
                  <img src={office.image} alt={office.name} className="mt-2" />
                </div>
              ))}
          </div>
        </div>
      )}
      {selectedOffice && (
        <div className="mt-4">
          <BookingForm
            onBook={handleBooking}
            roomId={selectedRoom.id}
            officeId={selectedOffice.id}
            selectedDate={selectedDate}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarBooking;
