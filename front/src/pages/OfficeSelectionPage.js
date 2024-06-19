import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import OfficeList from '../components/OfficeList';

const OfficeSelectionPage = () => {
  const { roomId } = useParams();
  const navigate  = useNavigate();
  const [offices, setOffices] = useState([]);
  const rooms = [
    { id: 1, name: 'Flex Office Noven 1', description: 'Grande salle de 12 places.' },
    { id: 2, name: 'Flex Office Noven 2', description: 'Petite salle de 8 places.' },
    // Ajoutez plus de salles si nécessaire
  ];
  const room = rooms.find(r => r.id === parseInt(roomId));

  useEffect(() => {
    // Simuler une requête pour obtenir les bureaux de la salle sélectionnée
    const fetchOffices = () => {
      const fetchedOffices = [
        { id: 1, name: 'Bureau 1', description: 'Bureau spacieux avec vue.', image: '/images/office1.jpg', roomId: parseInt(roomId) },
        { id: 2, name: 'Bureau 2', description: 'Bureau avec équipement moderne.', image: '/images/office2.jpg', roomId: parseInt(roomId) },
        // Ajoutez plus de bureaux si nécessaire
      ];
      setOffices(fetchedOffices.filter(office => office.roomId === parseInt(roomId)));
    };

    fetchOffices();
  }, [roomId]);

  const handleOfficeSelect = (office) => {
    navigate(`/booking/${roomId}/${office.id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bureaux disponibles dans {room.name}</h1>
      <OfficeList offices={offices} onSelect={handleOfficeSelect} />
    </div>
  );
};

export default OfficeSelectionPage;
