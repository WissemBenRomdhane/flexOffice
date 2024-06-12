import React from 'react';

const Office = ({ office, onSelect }) => {
  return (
    <div className="p-4 border rounded shadow-md cursor-pointer" onClick={() => onSelect(office)}>
      <h3 className="text-lg font-bold">{office.name}</h3>
      <p>{office.description}</p>
      <img src={office.image} alt={office.name} className="mt-2" />
    </div>
  );
};

export default Office;
