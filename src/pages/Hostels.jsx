import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HostelCard from '../components/HostelCard';
import '../styles/Hostels.css';

const Hostels = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching hostels...");
    axios.get('http://localhost:4000/hostels')
      .then(response => {
        console.log('Fetched hostels:', response.data);
        setHostels(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching hostels:', error);
        setError('Failed to load hostels. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="hostels-container">Loading hostels...</div>;
  if (error) return <div className="hostels-container">{error}</div>;

  return (
    <div className='hostels-container'>
      <h2 className='text-3xl font-bold mb-8'>Hostels</h2>
      <div className="hostels-list">
        {hostels.map((hostel) => (
          <HostelCard key={hostel._id} hostel={hostel} />
        ))}
      </div>
    </div>
  );
};

export default Hostels;
