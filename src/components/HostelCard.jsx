import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Hostels.css';

const HostelCard = ({ hostel }) => {
  return (
    <div className="hostel-card">
      {hostel.image && <img src={hostel.image} alt={hostel.name} className="hostel-image" />}
      <h3 className="hostel-name">{hostel.name || 'Unnamed Hostel'}</h3>
      <div className="hostel-info">
        <p>Total Rooms: {hostel.totalRooms || 'N/A'}</p>
        <p>Available Rooms: {hostel.availableRooms || 'N/A'}</p>
      </div>
      <Link to={`/hostels/${hostel._id}`} className="view-rooms-btn">View Rooms</Link>
    </div>
  );
};

export default HostelCard;
