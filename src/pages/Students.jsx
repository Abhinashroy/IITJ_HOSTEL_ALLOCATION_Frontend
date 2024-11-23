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
      setError('Failed to load students');
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
