import {useContext, useState} from "react";
import {UserContext} from "../UserContext";
import {Link, Navigate, useParams} from "react-router-dom";
import axios from "axios";
import UploadCSV from "../components/UploadCSV";

export default function ProfilePage() {
  const [redirect,setRedirect] = useState(null);
  const [error, setError] = useState(null);
  const {ready,user, setUser} = useContext(UserContext);
  const [hostelId, setHostelId] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  async function logout() {
    try {
      await axios.post('/logout', {}, {
        withCredentials: true
      });
      setUser(null);
      setRedirect('/');
    } catch (err) {
      setError('Failed to logout');
    }
  }

  const handleDeleteRooms = async () => {
    if (!hostelId) {
      setDeleteMessage('Please enter a hostel ID.');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:4000/delete-rooms/${hostelId}`, {
        withCredentials: true,
      });
      setDeleteMessage(response.data.message);
    } catch (error) {
      console.error('Error deleting rooms:', error);
      setDeleteMessage('Error deleting rooms');
    }
  };

  if (!ready) {
    return <div className="text-center pt-28">Loading...</div>;
  }

  if (error) {
    return <div className="text-center pt-28 text-red-500">{error}</div>;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className="text-center max-w-lg mx-auto pt-6">
      <div className="inline-flex justify-center primary text-xl bg-[#718fce] rounded-full pl-4 pr-4 mb-5 py-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
        <span className="pl-2">My Profile</span>
      </div>
      <div className="text-xl">
        Logged in as <div className="font-bold">{user.name} ({user.email})</div><br />
      </div>
      <button onClick={logout} className="primary max-w-sm mt-1">Logout</button>

      <div className="pt-4">
        <UploadCSV />
      </div>

      <div className="text-center max-w-lg mx-auto pt-4">
        <input
          type="text"
          placeholder="Enter Hostel ID"
          value={hostelId}
          onChange={(e) => setHostelId(e.target.value)}
          className="border rounded p-2"
        />
        <button onClick={handleDeleteRooms} className="primary max-w-sm mt-2">Delete All Rooms</button>
        {deleteMessage && <p>{deleteMessage}</p>}
      </div>
    </div>
  );
}