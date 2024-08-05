'use client';

import React, { useEffect, useState } from 'react';
import CalendarBooking from '../../components/CalendarBooking';
import axios from 'axios';

const ReservationPage = () => {
  const [rooms, setRooms] = useState([]);
  const [offices, setOffices] = useState([]);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des salles:', error);
    }
  };

  const fetchOffices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/offices');
      setOffices(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des bureaux:', error);
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchOffices();
  }, []);

  return (
    <div className="page-content">
      <h1>Réservation</h1>
      <CalendarBooking rooms={rooms} offices={offices} />
    </div>
  );
};

export default ReservationPage;
