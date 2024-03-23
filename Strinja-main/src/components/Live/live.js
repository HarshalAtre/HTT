import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RoomForm() {
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate(); // Using useNavigate hook

  const handleInputChange = (event) => {
    setRoomCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    navigate(`/room/${roomCode}`); // Using navigate function to navigate to the specified route
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '250px', marginBottom: '250px' }}>
      <h2 style={{ marginBottom: '20px' }}>Enter Room Code</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label style={{ marginBottom: '10px' }}>
          Room Code:
          <input
            type="text"
            value={roomCode}
            onChange={handleInputChange}
            placeholder="Enter room code"
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
        <button type="submit" style={{ padding: '8px 16px', marginTop: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
}

export default RoomForm;
