import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '../components/BookingForm';

const BookingPage = () => {
  const { roomId, officeId } = useParams();
  const [office, setOffice] = useState(null);
  const [room, setRoom] = useState(null);
  const rooms = [
    { id: 1, name: 'Flex Office Noven 1', description: 'Grande salle de 12 places.' },
    { id: 2, name: 'Flex Office Noven 2', description: 'Petite salle de 8 places.' },
    // Ajoutez plus de salles si nécessaire
  ];
  const offices = [
    { id: 1, name: 'Bureau 1', description: 'Bureau spacieux avec vue.', image: '/images/office1.jpg', roomId: parseInt(roomId) },
    { id: 2, name: 'Bureau 2', description: 'Bureau avec équipement moderne.', image: '/images/office2.jpg', roomId: parseInt(roomId) },
    // Ajoutez plus de bureaux si nécessaire
  ];

  useEffect(() => {
    const selectedRoom = rooms.find(r => r.id === parseInt(roomId));
    const selectedOffice = offices.find(o => o.id === parseInt(officeId));
    setRoom(selectedRoom);
    setOffice(selectedOffice);
  }, [roomId, officeId]);

  const handleBooking = (booking) => {
    // Gérer la logique de réservation
    console.log('Réservation effectuée:', booking);
  };

  if (!room || !office) return <div>Chargement...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Réservation de bureau</h1>
      <div className="p-4 mb-4 border rounded bg-gray-100">
        <h2 className="text-xl font-bold">Salle: {room.name}</h2>
        <p>{room.description}</p>
      </div>
      <div className="p-4 mb-4 border rounded bg-gray-100">
        <h2 className="text-xl font-bold">Bureau: {office.name}</h2>
        <p>{office.description}</p>
        <img src={office.image} alt={office.name} className="mt-2" />
      </div>
      <BookingForm onBook={handleBooking} roomId={room.id} officeId={office.id} />
    </div>
  );
};

export default BookingPage;
