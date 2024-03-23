import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function VideoComponent() {
  const [completion, setCompletion] = useState(0);
  const { course } = useParams();
  useEffect(() => {
    // Fetch completion from localStorage when component mounts
    try {
      const storedCompletion = localStorage.getItem('videoCompletion');
      if (storedCompletion) {
        setCompletion(parseInt(storedCompletion, 10));
      }
    } catch (error) {
      console.error('Error fetching completion:', error);
    }
  }, []);

  const handleVideoClick = () => {
    if (completion < 100) {
      // Increment completion by 25% on each video click
      const updatedCompletion = completion + 25;
      setCompletion(updatedCompletion);
      // Store completion in localStorage
      localStorage.setItem('videoCompletion', updatedCompletion.toString());
    }
    // Redirect to YouTube
    window.location.href = "https://www.youtube.com/watch?v=Q2UC0je0P9w";
  };

  const handleGenerateCertificate = () => {
    // Logic to generate certificate
    alert('Certificate generated!');
  };

  return (
    <div style={{ marginTop: "200px", marginBottom: "200px" }}>
      <h2 style={{ color: "#333", textAlign: "center", marginBottom: "20px" }}>You are {completion}% on {course}</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        {/* Replace the src attribute with your actual YouTube video URLs */}
        {Array(4).fill().map((_, i) => (
          <div key={i} style={{ position: 'relative', width: '300px', height: '200px', marginRight: '20px' }}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/Q2UC0je0P9w"
              title={`Video ${i + 1}`}
              style={{ position: 'absolute', zIndex: 1 }}
            />
            <div onClick={handleVideoClick} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, cursor: 'pointer' }} />
          </div>
        ))}
      </div>
      {completion === 100 && (
        <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'block', margin: '0 auto' }} onClick={handleGenerateCertificate}>Generate Certificate</button>
      )}
    </div>
  );
}

export default VideoComponent;
