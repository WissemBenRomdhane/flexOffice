'use client'

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaRegSquare } from 'react-icons/fa'; // Importer une icône de bureau
import BookingForm from './BookingForm';
import { format, parseISO } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import useTranslation from 'next-translate/useTranslation';

const CalendarBooking = ({ rooms, offices }) => {
  const { t, lang } = useTranslation('common');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedOffice, setSelectedOffice] = useState(null);

  const handleDateChange = date => {
    setSelectedDate(date);
    setSelectedRoom(null);
    setSelectedOffice(null);
  }

  const handleRoomSelect = room => {
    setSelectedRoom(room);
    setSelectedOffice(null);
  }

  const handleOfficeSelect = office => {
    setSelectedOffice(office);
  }

  const handleBooking = booking => {
    console.log('Réservation effectuée:', booking);
  }

  const locale = lang === 'fr' ? fr : enUS;
console.log("offices", rooms);
  return (
    <div className='p-4 border rounded shadow-md mb-4'>
      <h1 className='text-2xl font-bold mb-4'>Réserver un bureau</h1>
      {/* <Calendar onChange={handleDateChange} value={selectedDate} /> */}
      <div>
        <h2>{t('Calendrier')}</h2>
        <input
          type='date'
          value={format(selectedDate, 'yyyy-MM-dd')}
          onChange={e => handleDateChange(parseISO(e.target.value))}
        />
        <p>{format(selectedDate, 'MMMM yyyy', { locale })}</p>
      </div>
      {selectedDate && (
        <div className='mt-4'>
          <h2 className='text-xl font-bold mb-4'>Sélectionner une salle</h2>
          <div className='grid grid-cols-2 gap-4'>
            {rooms.map(room => (
              <div
                key={room.id}
                className={`p-4 border rounded ${
                  selectedRoom && selectedRoom.id === room.id
                    ? 'bg-gray-200'
                    : ''
                }`}
                onClick={() => handleRoomSelect(room)}
              >
                <h3 className='font-bold'>{room.name}</h3>
                <p>{room.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedRoom && (
        <div className='mt-4'>
          <h2 className='text-xl font-bold mb-4'>Sélectionner un bureau</h2>
          <div className='grid grid-cols-2 gap-4'>
            {offices
              .filter(office => office.roomId === selectedRoom.id)
              .map(office => (
                <div
                  key={office.id}
                  className={`p-4 border rounded flex items-center justify-between ${
                    selectedOffice && selectedOffice.id === office.id
                      ? 'bg-gray-200'
                      : ''
                  }`}
                  onClick={() => handleOfficeSelect(office)}
                >
                  <div className='flex items-center'>
                    <FaRegSquare
                      size={24}
                      className={`mr-2 ${
                        office.isBooked ? 'text-red-500' : 'text-green-500'
                      }`} // Couleur de l'icône en fonction de la disponibilité
                    />
                    <div>
                      <h3 className='font-bold'>{office.name}</h3>
                      <p>{office.description}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {selectedOffice && (
        <div className='mt-4'>
          <BookingForm
            onBook={handleBooking}
            roomId={selectedRoom.id}
            officeId={selectedOffice.id}
            selectedDate={selectedDate}
          />
        </div>
      )}
    </div>
  )
};

export default CalendarBooking;
