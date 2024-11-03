import React from 'react';
import '../styles/home.css'; // Import the custom CSS

const Home = () => {
  return (
    <div className="home-container">
      {/* Optional overlay div if you want a dark overlay over the background image */}
      <div className="overlay"></div>
      <h1>Welcome to the Hostel Management System</h1>
      <p>Manage your college hostel rooms efficiently.</p>
    </div>
  );
};

export default Home;
