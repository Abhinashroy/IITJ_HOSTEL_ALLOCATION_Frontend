// src/components/StudentList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/StudentList.css';

const StudentList = ({ students }) => {
  return (
    <div className="student-list">
      <table>
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Name</th>
            <th>Room Number</th>
            <th>Hostel</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.rollNo}</td>
              <td>{student.name}</td>
              <td>{student.roomNo}</td>
              <td>{student.hostelName}</td>
              <td>
                <Link 
                  to={`/hostels/${student.hostel}/room/${student._id}`}
                  className="view-button"
                >
                  View Room
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
