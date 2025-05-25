import { useState, useEffect, useRef } from 'react';
import './WelcomeModal.css';

function WelcomeModal({ isOpen, onClose }) {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef = useRef(null);
  
  const videos = [
    {
      url: "https://res.cloudinary.com/da98b7kad/video/upload/v1748114592/WhatsApp_Video_2025-05-18_at_15.34.19_mc1x8j.mp4",
      title: "Welcome Message"
    },
    {
      url: "https://res.cloudinary.com/da98b7kad/video/upload/v1748114589/WhatsApp_Video_2025-05-18_at_15.34.43_hwccex.mp4",
      title: "Our Story"
    }
  ];

  useEffect(() => {
    // When modal opens, play the video
    if (isOpen && videoRef.current) {
      videoRef.current.load();
      // Small delay to ensure video loads properly
      setTimeout(() => {
        videoRef.current.play().catch(err => {
          console.log("Autoplay prevented:", err);
        });
      }, 300);
    }
  }, [isOpen, currentVideo]);

  const handleVideoChange = (index) => {
    setCurrentVideo(index);
  };

  // Prevent click inside modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div className="welcome-modal-overlay" onClick={onClose}>
      <div className="welcome-modal-content" onClick={handleModalClick}>
        <button className="welcome-modal-close" onClick={onClose}>×</button>
        
        <div className="welcome-modal-header">
          <div className="welcome-modal-decoration left"></div>
          <h2>Welcome to Our Wedding Website</h2>
          <div className="welcome-modal-decoration right"></div>
        </div>
        
        <div className="welcome-modal-body">
          <div className="welcome-video-container">
            <video 
              ref={videoRef}
              src={videos[currentVideo].url} 
              controls
              playsInline
              className="welcome-video"
            ></video>
          </div>
          
          <div className="welcome-video-navigation">
            <h3>{videos[currentVideo].title}</h3>
            <div className="welcome-video-buttons">
              <button 
                className={`video-nav-btn ${currentVideo === 0 ? 'active' : ''}`}
                onClick={() => handleVideoChange(0)}
              >
                Welcome Message
              </button>
              <button 
                className={`video-nav-btn ${currentVideo === 1 ? 'active' : ''}`}
                onClick={() => handleVideoChange(1)}
              >
                Our Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeModal;