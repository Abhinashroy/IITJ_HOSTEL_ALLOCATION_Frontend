// src/components/StudentList.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../UserContext";
import '../styles/StudentList.css';
import axios from 'axios';

const StudentList = ({ students }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDeallocate = async (hostelId, roomId) => {
    if (!user) {
      alert('Please log in to deallocate rooms');
      navigate('/login');
      return;
    }

    try {
      await axios.post(`/hostels/${hostelId}/room/${roomId}/deallocate`, {}, {
        withCredentials: true
      });
      // Refresh the page or update the list
      window.location.reload();
    } catch (error) {
      console.error('Failed to deallocate room:', error);
      if (error.response?.status === 403) {
        alert('Please log in to deallocate rooms');
        navigate('/login');
      } else {
        alert('Failed to deallocate room. Please try again.');
      }
    }
  };

  return (
    <div className="student-list">
      <table>
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Name</th>
            <th>Room Number</th>
            <th>Hostel</th>
            {students.some(student => student.hostel === '4') && (
              <>
                <th>Check-in Date</th>
                <th>Check-out Date</th>
              </>
            )}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.rollNo}</td>
              <td>{student.name}</td>
              <td>{student.roomNo}</td>
              <td>{student.hostelName}</td>
              {students.some(s => s.hostel === '4') && (
                <>
                  <td>
                    {student.hostel === '4' && student.checkInDate 
                      ? new Date(student.checkInDate).toLocaleDateString() 
                      : '-'}
                  </td>
                  <td>
                    {student.hostel === '4' && student.checkOutDate 
                      ? new Date(student.checkOutDate).toLocaleDateString() 
                      : '-'}
                  </td>
                </>
              )}
              <td>
                <div className="flex gap-2">
                  <Link 
                    to={`/hostels/${student.hostel}/room/${student._id}`}
                    className="view-button"
                  >
                    View Room
                  </Link>
                  <button
                    onClick={() => handleDeallocate(student.hostel, student._id)}
                    className="deallocate-button"
                    disabled={!user}
                  >
                    {!user ? 'Login to Deallocate' : 'Deallocate'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
