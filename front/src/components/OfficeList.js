import React from 'react';
import Office from './Office';

const OfficeList = ({ offices, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {offices.map((office) => (
        <Office key={office.id} office={office} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default OfficeList;
