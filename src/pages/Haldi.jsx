import { useEffect, useRef, useState } from 'react';
import './Haldi.css';

function Haldi() {
  const parallaxRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Handle parallax effect on scroll
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.pageYOffset;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.4}px) scale(1.05)`;
      }
      
      // Add visible class to elements when they enter viewport
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // Check if element is in viewport
        if(position.top < window.innerHeight && position.bottom >= 0) {
          element.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Trigger once on load
    setTimeout(() => {
      setIsLoaded(true);
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach(element => element.classList.add('visible'));
    }, 300);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleFlipCard = (e) => {
    const card = e.currentTarget;
    card.classList.toggle('flipped');
  };

  return (
    <div className="haldi-page">
      <div className="hero-section">
        <div className="hero-background">
          <div className="hero-pattern"></div>
          <div className="hero-glow"></div>
        </div>

        <div className="hero-container">
          <div className="ceremony-emblem">
            <div className="emblem-inner">
              <div className="emblem-icon">✨</div>
            </div>
          </div>

          <div className="hero-title-container">
            <h1 className="hero-title">Haldi</h1>
            <div className="hero-date">June 4, 2025</div>
          </div>

          <div className="couple-container">
            <div className="couple-photo-left"></div>
            <div className="couple-names">
              <span className="name-left">Manasa</span>
              <span className="name-connector">&</span>
              <span className="name-right">Brahma Reddy</span>
            </div>
            <div className="couple-photo-right"></div>
          </div>

          <div className="hero-description">
            <p>An auspicious pre-wedding celebration filled with turmeric, joy, and blessings</p>
          </div>
        </div>
      </div>
      
      <div className="invitation-section">
        <div className="container">
          <div className="invitation-card fade-in">
            <div className="card-header">
              <div className="haldi-icon float-animation">✨</div>
              <h2>You're Invited</h2>
              <p>to the auspicious Haldi ceremony of</p>
              <h3>Manasa & Brahma Reddy</h3>
            </div>
            
            <div className="card-details">
              <div className="detail-item">
                <div className="detail-icon">📅</div>
                <div className="detail-content">
                  <h4>Date</h4>
                  <p>June 4, 2025</p>
                </div>
              </div>
              
              <div className="detail-item">
                <div className="detail-icon">🕒</div>
                <div className="detail-content">
                  <h4>Time</h4>
                  <p>11:00 AM - 3:00 PM</p>
                </div>
              </div>
              
              <div className="detail-item">
                <div className="detail-icon">👗</div>
                <div className="detail-content">
                  <h4>Dress Code</h4>
                  <p>Yellow attire encouraged</p>
                </div>
              </div>
              
              <div className="detail-item">
                <div className="detail-icon">📍</div>
                <div className="detail-content">
                  <h4>Venue</h4>
                  <p>The Garden Pavilion, Madhavaram</p>
                </div>
              </div>
            </div>
            
            <div className="venue-map">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4053.105324624163!2d79.55893381083895!3d15.33882615851521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4b3b001c95a179%3A0xfec91b28f7eb0a2e!2sMEDAM%20SRINIVASA%20REDDY!5e1!3m2!1sen!2sin!4v1748113517689!5m2!1sen!2sin" 
                width="100%" 
                height="300" 
                style={{ border: 0, borderRadius: '15px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Haldi Ceremony Location"
              ></iframe>
              <div className="map-details">
                <h4>Venue: Family Residency</h4>
                <p><i className="venue-icon">📍</i> MEDAM SRINIVASA REDDY, Madhavaram (V), Thallur (M), Prakasam Dt.</p>
                <a href="https://maps.app.goo.gl/5kXxjY4u6CPNGCe98" target="_blank" rel="noopener noreferrer" className="btn">Get Directions</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="info-section">
        <div className="container">
          <h2 className="section-title fade-in">About the Haldi Ceremony</h2>
          <p className="section-description fade-in">
            The Haldi ceremony is a pre-wedding ritual in Indian culture where a paste made from turmeric, 
            oil, and water is applied to the bride and groom. The yellow color is considered auspicious 
            and is believed to bless the couple with prosperity and ward off evil spirits.
          </p>
          
          <div className="flip-cards-container fade-in">
            <h3>What to Expect at the Haldi</h3>
            <div className="flip-cards">
              <div className="flip-card" onClick={handleFlipCard}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="card-icon">✨</div>
                    <h4>Beauty Benefits</h4>
                    <p>Click to learn more</p>
                  </div>
                  <div className="flip-card-back">
                    <h4>Beauty Benefits</h4>
                    <p>Turmeric has natural antiseptic properties and gives a beautiful glow to the skin before the wedding day!</p>
                  </div>
                </div>
              </div>
              
              <div className="flip-card" onClick={handleFlipCard}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="card-icon">👕</div>
                    <h4>Stain Alert</h4>
                    <p>Click to learn more</p>
                  </div>
                  <div className="flip-card-back">
                    <h4>Stain Alert</h4>
                    <p>Turmeric stains are notoriously difficult to remove from clothes - wear something you don't mind getting yellow!</p>
                  </div>
                </div>
              </div>
              
              <div className="flip-card" onClick={handleFlipCard}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="card-icon">🎭</div>
                    <h4>Fun Factor</h4>
                    <p>Click to learn more</p>
                  </div>
                  <div className="flip-card-back">
                    <h4>Fun Factor</h4>
                    <p>Expect lots of laughter, music, dancing, and playful application of haldi on the couple!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rsvp-section">
        <div className="container">
          <div className="rsvp-content fade-in">
            <h2>Will you join us?</h2>
            <p>Please let us know if you'll be attending the Haldi ceremony</p>
            <a href="/rsvp" className="btn">RSVP Now</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Haldi;
