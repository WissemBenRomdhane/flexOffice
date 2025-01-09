'use client';

import React, { useEffect, useState } from 'react';
import CalendarBooking from '../../components/CalendarBooking';
import axios from 'axios';
import Reservation from '@/components/Reservation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '@/actions/roomActions';
import { fetchOffices } from '@/actions/officeActions';

const ReservationPage = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.room.rooms);

  useEffect(() => {
    dispatch(fetchRooms()); // Récupère les salles au chargement
  }, [dispatch]);

  return (
    <div className="page-content">
      <h1 className="text-white text-2xl font-bold mb-4">Réservation</h1>
      {/* <CalendarBooking rooms={rooms} offices={offices} /> */}
      <Reservation rooms={rooms} />
    </div>
  );
};

export default ReservationPage;
