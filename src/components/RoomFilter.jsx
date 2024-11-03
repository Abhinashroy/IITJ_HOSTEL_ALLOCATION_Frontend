import React from 'react';
import '../styles/RoomFilter.css'; // Include a new CSS file for styling

const RoomFilter = ({ onFilterChange }) => {
  return (
    <div className="filter-buttons">
      {/* Filter buttons with onClick handlers */}
      <button onClick={() => onFilterChange('all')}>Show All</button>
      <button onClick={() => onFilterChange('available')}>Show Available</button>
      <button onClick={() => onFilterChange('occupied')}>Show Occupied</button>
    </div>
  );
};

export default RoomFilter;
