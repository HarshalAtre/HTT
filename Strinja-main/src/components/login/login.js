import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        name: username,
        password: password,
        courses: [],
        ratings: {}
      });

      // Check if login was successful
      if (response.data.redirectTo === "/") {
        // Save user name in localStorage upon successful login
        localStorage.setItem('name', username);

        // Redirect to "/" on successful login
        window.location.href = "/courses";
        console.log("hello")
        const dataToSend = {
            key: 'value'
          };
          
          // Make a POST request to the Flask server
          axios.post('http://127.0.0.1:5000/post-data', dataToSend)
            .then(response => {
              console.log('Response from Python Flask server:', response.data);
            })
            .catch(error => {
              console.error('Error:', error);
            });

      }
    } catch (error) {
      // Display error message if login is unsuccessful
      setErrorMessage(error.response.data.message);
    }
  };
 
  return (
    <div style={{marginTop:"90px"}}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {/* Link to the registration page */}
      <p>Not signed up? <Link to="/register">Sign up here</Link></p>
    </div>
  );
};

export default Login;
