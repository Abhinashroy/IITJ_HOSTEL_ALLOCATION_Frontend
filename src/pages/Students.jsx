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
      setLoading(true);
      setError(null);
      const response = await axios.get('/rooms/occupied', {
        withCredentials: true
      });
      
      if (response.data && Array.isArray(response.data)) {
        console.log('Received students:', response.data);
        setStudents(response.data);
      } else {
        throw new Error('Invalid data received from server');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setError(
        error.response?.data?.error || 
        error.response?.data?.details || 
        error.message || 
        'Failed to load students'
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    const searchTerm = searchRollNo.toLowerCase().trim();
    const studentRollNo = (student.rollNo || '').toLowerCase();
    const studentName = (student.name || '').toLowerCase();
    
    return studentRollNo.includes(searchTerm) || 
           studentName.includes(searchTerm);
  });

  if (loading) {
    return (
      <div className="students-container">
        <div className="loading-spinner">Loading students...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="students-container">
        <div className="error-message">
          <h3>Error Loading Students</h3>
          <p>{error}</p>
          <button 
            onClick={fetchStudents}
            className="retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="students-container">
      <h2 className="page-title">Student Directory</h2>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Roll Number or Name..."
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
