import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Countdown.css';

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [currentEvent, setCurrentEvent] = useState(0);
  
  // Wedding date - June 05, 2025 at 8:35 PM
  const weddingDate = new Date('June 05, 2025 20:35:00').getTime();
  
  // Event dates
  const events = [
    { name: 'Welcome Drinks', date: new Date('June 04, 2025 19:00:00'), icon: '🥂' },
    { name: 'Haldi', date: new Date('June 05, 2025 11:00:00'), icon: '✨' },
    { name: 'Ceremony', date: new Date('June 05, 2025 20:35:00'), icon: '💍' },
    { name: 'Dinner', date: new Date('June 05, 2025 19:30:00'), icon: '🍽️' }
  ];

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
      
      // Determine current event
      const currentTime = now;
      let currentIdx = -1;
      
      for (let i = 0; i < events.length; i++) {
        if (currentTime < events[i].date.getTime()) {
          currentIdx = i - 1;
          break;
        }
      }
      
      if (currentIdx === -1 && currentTime < events[0].date.getTime()) {
        currentIdx = -1; // Before first event
      } else if (currentIdx === -1 && currentTime > events[events.length - 1].date.getTime()) {
        currentIdx = events.length - 1; // After last event
      }
      
      setCurrentEvent(Math.max(0, currentIdx));
    };
    
    // Add scroll animation
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in-section');
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // Check if element is in viewport
        if(position.top < window.innerHeight && position.bottom >= 0) {
          element.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    // Update countdown every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="countdown-page">
      <div className="countdown-timer">
        <div className="countdown-container">
          <h2>Counting down to our special day</h2>
          <div className="timer-display">
            <div className="time-block days">
              <div className="time-circle">
                <span className="time-value">{timeLeft.days}</span>
              </div>
              <span className="time-label">Days</span>
            </div>
            <div className="time-separator">:</div>
            <div className="time-block hours">
              <div className="time-circle">
                <span className="time-value">{timeLeft.hours}</span>
              </div>
              <span className="time-label">Hours</span>
            </div>
            <div className="time-separator">:</div>
            <div className="time-block minutes">
              <div className="time-circle">
                <span className="time-value">{timeLeft.minutes}</span>
              </div>
              <span className="time-label">Minutes</span>
            </div>
            <div className="time-separator">:</div>
            <div className="time-block seconds">
              <div className="time-circle">
                <span className="time-value">{timeLeft.seconds}</span>
              </div>
              <span className="time-label">Seconds</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="countdown-content">
        <div className="container">
          <section className="timeline-section fade-in-section">
            <h2>Wedding Timeline</h2>
            <div className="timeline-container">
              {events.map((event, index) => (
                <div 
                  key={index} 
                  className={`timeline-step ${index === currentEvent ? 'active' : ''} ${index < currentEvent ? 'completed' : ''}`}
                >
                  <div className="timeline-icon">{event.icon}</div>
                  <div className="timeline-connector"></div>
                  <div className="timeline-content">
                    <h3>{event.name}</h3>
                    <p>{event.date.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                    <p>{event.date.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          <section className="event-details fade-in-section">
            <h2>Event Details</h2>
            <div className="event-cards">
              {events.map((event, index) => (
                <div key={index} className="event-card">
                  <div className="event-icon">{event.icon}</div>
                  <h3>{event.name}</h3>
                  <p className="event-date">
                    {event.date.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="event-time">
                    {event.date.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                  <p className="event-description">
                    {index === 0 && "Join us for welcome drinks and meet the families in a relaxed setting."}
                    {index === 1 && "A traditional pre-wedding ceremony with turmeric paste application."}
                    {index === 2 && "The auspicious wedding ceremony with traditional rituals."}
                    {index === 3 && "Celebrate with us at our reception dinner and dancing."}
                  </p>
                  <Link to={`/${event.name.toLowerCase()}`} className="btn">View Details</Link>
                </div>
              ))}
            </div>
          </section>
          
          <section className="venue-section fade-in-section">
            <h2>Venue Information</h2>
            <div className="venue-container">
              <div className="venue-map">
                <div className="map-placeholder"></div>
              </div>
              <div className="venue-details">
                <h3>The Grand Pavilion</h3>
                <p>123 Wedding Lane, Mumbai, India</p>
                <p>Our beautiful venue is located in the heart of Mumbai, offering stunning views and elegant spaces for all our wedding events.</p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn">Get Directions</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Countdown;
