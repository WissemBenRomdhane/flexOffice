'use client';

import React, { useState } from 'react';
import CalendarBooking from '../components/CalendarBooking';

const rooms = [
  { id: 1, name: 'Salle 1', description: 'Grande salle de réunion.' },
  { id: 2, name: 'Salle 2', description: 'Petite salle de réunion.' },
  // Ajoutez plus de salles si nécessaire
];

const offices = [
  { id: 1, name: 'Bureau 1', description: 'Bureau spacieux avec vue.', roomId: 1 },
  { id: 2, name: 'Bureau 2', description: 'Bureau avec équipement moderne.', roomId: 2 },
  // Ajoutez plus de bureaux si nécessaire
];

const HomePage = () => {
  return <CalendarBooking rooms={rooms} offices={offices} />;
};

export default HomePage;
