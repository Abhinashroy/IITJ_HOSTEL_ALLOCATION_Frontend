import React from 'react';
import RoomAllocationForm from '../components/RoomAllocationForm';

const AllocateRoom = () => {
  const handleAllocation = (allocationData) => {
    // Handle room allocation logic here
    console.log('Allocating room with data:', allocationData);
  };

  return (
    <div>
      <h2>Allocate Room</h2>
      <RoomAllocationForm onSubmit={handleAllocation} />
    </div>
  );
};

export default AllocateRoom;
