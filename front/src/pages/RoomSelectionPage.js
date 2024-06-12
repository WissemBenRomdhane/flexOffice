import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoomList from '../components/RoomList';

const RoomSelectionPage = () => {
  const navigate  = useNavigate();
  const rooms = [
    { id: 1, name: 'Flex Office Noven 1', description: 'Grande salle de réunion.' },
    { id: 2, name: 'Flex Office Noven 2', description: 'Petite salle de réunion.' },
    // Ajoutez plus de salles si nécessaire
  ];

  const handleRoomSelect = (room) => {
    navigate(`/offices/${room.id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sélectionnez une salle</h1>
      <RoomList rooms={rooms} onSelect={handleRoomSelect} />
    </div>
  );
};

export default RoomSelectionPage;
