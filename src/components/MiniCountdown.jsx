import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './MiniCountdown.css';

function MiniCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const location = useLocation();
  
  // Wedding date - June 05, 2025 at 8:35 PM (same as in Countdown.jsx)
  const weddingDate = new Date('June 05, 2025 20:35:00').getTime();
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };
    
    // Update countdown every second
    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial calculation
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  // Hide on the Countdown page
  if (location.pathname === '/countdown') {
    return null;
  }

  return (
    <div className="mini-countdown">
      <Link to="/countdown" className="mini-countdown-link">
        <div className="mini-countdown-content">
          <div className="mini-countdown-title">Wedding Countdown</div>
          <div className="mini-countdown-timer">
            <div className="mini-time-unit">
              <span className="mini-time-value">{timeLeft.days}</span>
              <span className="mini-time-label">d</span>
            </div>
            <span className="mini-time-separator">:</span>
            <div className="mini-time-unit">
              <span className="mini-time-value">{timeLeft.hours}</span>
              <span className="mini-time-label">h</span>
            </div>
            <span className="mini-time-separator">:</span>
            <div className="mini-time-unit">
              <span className="mini-time-value">{timeLeft.minutes}</span>
              <span className="mini-time-label">m</span>
            </div>
            <span className="mini-time-separator">:</span>
            <div className="mini-time-unit">
              <span className="mini-time-value">{timeLeft.seconds}</span>
              <span className="mini-time-label">s</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MiniCountdown;
