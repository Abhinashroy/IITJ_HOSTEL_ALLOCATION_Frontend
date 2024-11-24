import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RoomFilter from '../components/RoomFilter';
import '../styles/RoomGrid.css';

const RoomGrid = () => {
  const { id: hostelId } = useParams();
  const [hostel, setHostel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by looking for a token
    const token = localStorage.getItem('authToken'); // Adjust based on your auth logic
    setIsLoggedIn(!!token); // Set isLoggedIn based on the presence of a token
  }, []); // Run once on component mount

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Fetching data for hostel:', hostelId);

        // Fetch hostel details
        const hostelResponse = await axios.get(`/hostels/${hostelId}`);
        console.log('Hostel response:', hostelResponse.data);
        setHostel(hostelResponse.data);

        // Fetch rooms
        const roomsResponse = await axios.get(`/hostels/${hostelId}/rooms`);
        console.log('Rooms response:', roomsResponse.data);

        // Sort rooms by roomNo in ascending order
        const sortedRooms = roomsResponse.data.sort((a, b) => {
          return a.roomNo - b.roomNo; // Assuming roomNo is a number
        });

        setRooms(sortedRooms);
        
        // Set filteredRooms based on login status
        if (!isLoggedIn) {
          setFilteredRooms(sortedRooms.filter(room => room.status === 'available')); // Show only available rooms if not logged in
        } else {
          setFilteredRooms(sortedRooms); // Show all rooms if logged in
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.error || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [hostelId, isLoggedIn]); // Add isLoggedIn to the dependency array

  useEffect(() => {
    // Update filteredRooms when login status changes
    if (rooms.length > 0) { // Ensure rooms are loaded before updating filteredRooms
      if (isLoggedIn) {
        setFilteredRooms(rooms); // Show all rooms if logged in
      } else {
        setFilteredRooms(rooms.filter(room => room.status === 'available')); // Show only available rooms if not logged in
      }
    }
  }, [isLoggedIn, rooms]);

  const handleRoomClick = (roomId) => {
    navigate(`/hostels/${hostelId}/room/${roomId}`);
  };

  const handleLogin = () => {
    // Logic to handle user login
    setIsLoggedIn(true); // Set login status to true
  };

  const handleFilterChange = (filterType) => {
    if (!isLoggedIn) {
      setFilteredRooms(rooms.filter(room => room.status === 'available')); // Show only available rooms if not logged in
      return;
    }
    
    if (filterType === 'all') {
      setFilteredRooms(rooms);
    } else if (filterType === 'occupied') {
      setFilteredRooms(rooms.filter(room => room.status === 'occupied'));
    } else if (filterType === 'available') {
      setFilteredRooms(rooms.filter(room => room.status === 'available'));
    }
  };

  if (loading) {
    return (
      <div className="room-grid-container">
        <div className="text-center">Loading rooms...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="room-grid-container">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!hostel) {
    return (
      <div className="room-grid-container">
        <div className="text-center">Hostel not found</div>
      </div>
    );
  }

  return (
    <div className="room-grid-container">
      <h2 className="font-bold text-3xl mb-6">Rooms in {hostel.name}</h2>
      
      {/* Stats section */}
      <div className="stats-container mb-6">
        <div className="stats-box">
          <span>Total Rooms: {rooms.length}</span>
          <span>Available: {rooms.filter(room => room.status === 'available').length}</span>
          <span>Occupied: {rooms.filter(room => room.status === 'occupied').length}</span>
        </div>
      </div>

      <RoomFilter onFilterChange={handleFilterChange} />
      <div className="rooms-grid">
        {filteredRooms.length === 0 ? (
          <div className="col-span-full text-center">No rooms found</div>
        ) : (
          filteredRooms.map((room) => (
            <div 
              key={room._id} 
              className={`room-icon ${room.status}`} 
              onClick={() => handleRoomClick(room._id)}
              title={`Room ${room.roomNo}${room.status === 'occupied' ? ' - ' + room.name : ''}`}
            >
              <div className="room-content">
                <span className="room-number">{room.roomNo}</span>
                {room.status === 'occupied' && (
                  <span className="room-status">●</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RoomGrid;