import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentList from '../components/StudentList';
import '../styles/Students.css';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchRollNo, setSearchRollNo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      // Fetch all rooms that are occupied
      const response = await axios.get('/rooms/occupied');
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      // Log detailed error information
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        setError('Failed to load students: ' + (error.response.data.message || 'Unknown error'));
      } else if (error.request) {
        console.error('Request data:', error.request);
        setError('Failed to load students: No response from server');
      } else {
        console.error('Error message:', error.message);
        setError('Failed to load students: ' + error.message);
      }
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student => 
    student.rollNo.toLowerCase().includes(searchRollNo.toLowerCase())
  );

  if (loading) return <div className="students-container">Loading...</div>;
  if (error) return <div className="students-container error">{error}</div>;

  return (
    <div className="students-container">
      <h2 className="page-title">Student Directory</h2>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Roll Number..."
          value={searchRollNo}
          onChange={(e) => setSearchRollNo(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredStudents.length === 0 ? (
        <div className="no-results">No students found</div>
      ) : (
        <StudentList students={filteredStudents} />
      )}
    </div>
  );
};

export default Students;
