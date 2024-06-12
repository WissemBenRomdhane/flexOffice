import React from 'react';

const Room = ({ room, onSelect }) => {
  return (
    <div className="p-4 border rounded shadow-md cursor-pointer" onClick={() => onSelect(room)}>
      <h3 className="text-lg font-bold">{room.name}</h3>
      <p>{room.description}</p>
    </div>
  );
};

export default Room;