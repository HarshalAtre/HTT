import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
 
  useEffect(() => {
    // Retrieve username from localStorage
    const username = localStorage.getItem('name');

    // Fetch user data based on the username
    axios.get(`http://localhost:3000/${username}/courses`)
      .then(response => {
        // Extract the course array from user data
        const userCourses = response.data.courses;
        setCourses(userCourses);
      })
      .catch(error => {
        console.error('Error fetching user courses:', error);
        setErrorMessage(error.response.data.message || 'Error fetching user courses');
      });
  }, []);
 
  
  return (
    <div style={{marginTop:"90px"}}>
      <h2>Your Courses</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <ul>
        {courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </div>
  );
};

export default Course;
