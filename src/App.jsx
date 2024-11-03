import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Hostels from './pages/Hostels';
import RoomGrid from './pages/RoomGrid';
import AllocateRoom from './pages/AllocateRoom';
import Students from './pages/Students';
import LoginPage from './pages/LoginPage';
import Layout from './pages/Layout';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import {UserContextProvider} from "./UserContext.jsx";
import ProfilePage from './pages/ProfilePage.jsx';
import RoomData from './pages/RoomData.jsx';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials=true;

function App() {
  return (
    
    <Router>
      <UserContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/hostels" element={<Hostels />} />
        <Route path="/hostels/:id" element={<RoomGrid />} />
        {/* Add this new route for RoomData */}
        <Route path="/hostels/:hostelId/room/:roomId" element={<RoomData />} />
        <Route path="/allocate-room" element={<AllocateRoom />} />
        <Route path="/students" element={<Students />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/account" element={<ProfilePage />} />
      </Routes>
      </UserContextProvider>
    </Router>
  );
}

export default App;
