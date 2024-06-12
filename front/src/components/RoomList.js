import React from 'react';
import Room from './Room';

const RoomList = ({ rooms, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <Room key={room.id} room={room} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default RoomList;