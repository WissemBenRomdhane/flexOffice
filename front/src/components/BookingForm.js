import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ onBook, roomId, officeId, selectedDate }) => {
  const [name, setName] = useState('');
  const [timeSlot, setTimeSlot] = useState('fullDay');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const booking = { name, date: selectedDate.toISOString().split('T')[0], timeSlot, roomId, officeId };
    try {
      const response = await axios.post('http://localhost:5000/api/reservations', booking);
      onBook(response.data);
    } catch (error) {
      console.error('Error booking the office:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md mb-4">
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Nom</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Date</label>
        <input
          type="text"
          value={selectedDate.toISOString().split('T')[0]}
          className="w-full p-2 border rounded"
          readOnly
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Créneau horaire</label>
        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="fullDay">Journée complète</option>
          <option value="morning">Matin</option>
          <option value="afternoon">Après-midi</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Réserver
      </button>
    </form>
  );
};

export default BookingForm;
