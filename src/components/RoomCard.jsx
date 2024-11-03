import React from 'react';
import '../styles/RoomCard.css';

const RoomCard = ({ room, onAllocate, onDeallocate }) => {
  return (
    <div className={`room-card ${room.occupied ? 'occupied' : 'available'}`}>
      <h4>Room {room.number}</h4>
      <p>Type: {room.type}</p>
      <p>Status: {room.occupied ? 'Occupied' : 'Available'}</p>
      {room.occupied ? (
        <button onClick={() => onDeallocate(room.id)}>Deallocate</button>
      ) : (
        <button onClick={() => onAllocate(room.id)}>Allocate</button>
      )}
    </div>
  );
};

export default RoomCard;
