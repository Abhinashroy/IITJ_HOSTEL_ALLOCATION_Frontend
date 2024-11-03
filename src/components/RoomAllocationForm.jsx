import React, { useState } from 'react';

const RoomAllocationForm = ({ onSubmit }) => {
  const [studentName, setStudentName] = useState('');
  const [roomType, setRoomType] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ studentName, roomType, duration });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Student Name:</label>
        <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
      </div>
      <div>
        <label>Room Type:</label>
        <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Triple">Triple</option>
        </select>
      </div>
      <div>
        <label>Duration:</label>
        <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
      </div>
      <button type="submit">Allocate Room</button>
    </form>
  );
};

export default RoomAllocationForm;
