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
  
  // Event dates - Reordered: Haldi → Welcome Drinks → Dinner → Ceremony
  const events = [
    { name: 'Haldi', date: new Date('June 04, 2025 11:00:00'), icon: '✨' },
    { name: 'Welcome Drinks', date: new Date('June 04, 2025 19:00:00'), icon: '🥂' },
    { name: 'Dinner', date: new Date('June 05, 2025 19:30:00'), icon: '🍽️' },
    { name: 'Ceremony', date: new Date('June 05, 2025 20:35:00'), icon: '💍' }
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
      {/* Hero Section with Countdown */}
      <section className="countdown-hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="countdown-header">
            <div className="floating-emblem">
              <div className="emblem-outer">
                <div className="emblem-inner">
                  <div className="emblem-icon">⏰</div>
                </div>
              </div>
            </div>
            <h1>Our Wedding Countdown</h1>
            <p className="countdown-subtitle">Every moment brings us closer to forever</p>
            <div className="wedding-date-info">
              <span className="wedding-date">June 5th, 2025</span>
              <span className="wedding-time">8:35 PM</span>
            </div>
          </div>

          <div className="countdown-timer-main">
            <div className="timer-grid">
              <div className="time-unit">
                <div className="time-number">{timeLeft.days}</div>
                <div className="time-label">Days</div>
              </div>
              <div className="time-unit">
                <div className="time-number">{timeLeft.hours}</div>
                <div className="time-label">Hours</div>
              </div>
              <div className="time-unit">
                <div className="time-number">{timeLeft.minutes}</div>
                <div className="time-label">Minutes</div>
              </div>
              <div className="time-unit">
                <div className="time-number">{timeLeft.seconds}</div>
                <div className="time-label">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="countdown-main">
        <div className="container">

          {/* Journey Timeline */}
          <section className="journey-section fade-in-section">
            <div className="section-header">
              <h2>Our Wedding Journey</h2>
              <p>Follow along as we celebrate each special moment</p>
            </div>

            <div className="journey-timeline">
              {events.map((event, index) => (
                <div
                  key={index}
                  className={`journey-milestone ${index === currentEvent ? 'current' : ''} ${index < currentEvent ? 'completed' : ''}`}
                >
                  <div className="milestone-marker">
                    <div className="milestone-icon">{event.icon}</div>
                    <div className="milestone-line"></div>
                  </div>
                  <div className="milestone-content">
                    <div className="milestone-badge">
                      {index < currentEvent ? 'Completed' : index === currentEvent ? 'Current' : 'Upcoming'}
                    </div>
                    <h3>{event.name}</h3>
                    <div className="milestone-datetime">
                      <span className="milestone-date">
                        {event.date.toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="milestone-time">
                        {event.date.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Event Highlights */}
          <section className="highlights-section fade-in-section">
            <div className="section-header">
              <h2>Event Highlights</h2>
              <p>Discover what makes each celebration special</p>
            </div>

            <div className="highlights-grid">
              {events.map((event, index) => (
                <div key={index} className="highlight-card">
                  <div className="highlight-header">
                    <div className="highlight-icon">{event.icon}</div>
                    <div className="highlight-info">
                      <h3>{event.name}</h3>
                      <p className="highlight-date">
                        {event.date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })} at {event.date.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="highlight-description">
                    {index === 0 && "A traditional pre-wedding ceremony with turmeric paste application, bringing good luck and blessings."}
                    {index === 1 && "Join us for welcome drinks and meet the families in a relaxed setting before the celebrations begin."}
                    {index === 2 && "Celebrate with us at our reception dinner with delicious food, music, and dancing."}
                    {index === 3 && "The auspicious wedding ceremony with traditional rituals, where two hearts become one."}
                  </div>
                  <div className="highlight-actions">
                    <Link to={`/${event.name.toLowerCase()}`} className="highlight-btn">
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Venue Showcase */}
          <section className="venue-showcase fade-in-section">
            <div className="section-header">
              <h2>Our Venue</h2>
              <p>Where our love story unfolds</p>
            </div>

            <div className="venue-content">
              <div className="venue-visual">
                <div className="venue-image-placeholder">
                  <div className="venue-image-overlay">
                    <span>📍</span>
                  </div>
                </div>
              </div>
              <div className="venue-info">
                <h3>The Grand Pavilion</h3>
                <div className="venue-address">
                  <span>📍 123 Wedding Lane, Mumbai, India</span>
                </div>
                <p className="venue-description">
                  Our beautiful venue is located in the heart of Mumbai, offering stunning views and elegant spaces for all our wedding events. The Grand Pavilion combines traditional architecture with modern amenities, creating the perfect backdrop for our special day.
                </p>
                <div className="venue-features">
                  <div className="feature">
                    <span className="feature-icon">🏛️</span>
                    <span>Grand Architecture</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">🌸</span>
                    <span>Beautiful Gardens</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">🅿️</span>
                    <span>Ample Parking</span>
                  </div>
                </div>
                <div className="venue-actions">
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="venue-btn primary">
                    Get Directions
                  </a>
                  <button className="venue-btn secondary">
                    View Gallery
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

export default Countdown;
