import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

function Landing() {
  const [scrolled, setScrolled] = useState(false)
  const buttonContainerRef = useRef(null)
  
  useEffect(() => {
    // Normal animation for other elements
    const animationTimeout = setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-load');
      
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('visible');
        }, 300 * index); // Stagger the animations
      });
    }, 100);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      const arrow = document.querySelector('.scroll-arrow');
      if (arrow) {
        if (window.scrollY > window.innerHeight / 2) {
          arrow.classList.add('hidden');
        } else {
          arrow.classList.remove('hidden');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(animationTimeout);
    };
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h2 className="invitation-intro animate-on-load">Together with their families</h2>
          <h1 className="couple-names animate-on-load">Manasa & Brahma Reddy</h1>
          <p className="invitation-text animate-on-load">invite you to celebrate their marriage</p>
          <p className="wedding-date animate-on-load">June 05, 2025</p>
          <p className="wedding-venue animate-on-load">Madhavaram, Prakasam Dt.</p>
          
          <div className="button-container" style={{ opacity: 1, transform: 'translateY(0)' }}>
            <Link to="/wedding" className="ceremony-button">
              View Ceremony Details
            </Link>
          </div>
        </div>
        
        {/* Add decorative elements */}
        <div className="corner-decoration top-left"></div>
        <div className="corner-decoration top-right"></div>
        <div className="corner-decoration bottom-left"></div>
        <div className="corner-decoration bottom-right"></div>
        
        <div className="scroll-arrow" onClick={scrollToContent}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      <div className="intro-section">
        <div className="container">
          <div className="intro-content">
            <div className="intro-image">
              <div className="image-placeholder"></div>
            </div>
            <div className="intro-text">
              <h2>Our Story</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
                Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
                rhoncus ut eleifend nibh porttitor.
              </p>
              <Link to="/wedding" className="read-more">Read Our Full Story →</Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="event-preview">
        <div className="container">
          <h2>Join Us For</h2>
          <div className="event-cards">
            <div className="event-card">
              <h3>Haldi Ceremony</h3>
              <p className="event-date">November 13, 2023</p>
              <p>A traditional pre-wedding ceremony filled with turmeric, laughter and blessings</p>
              <Link to="/haldi" className="btn">Learn More</Link>
            </div>
            
            <div className="event-card">
              <h3>Wedding Ceremony</h3>
              <p className="event-date">November 15, 2023</p>
              <p>The auspicious union of two souls in a traditional Indian ceremony</p>
              <Link to="/wedding" className="btn">Learn More</Link>
            </div>
            
            <div className="event-card">
              <h3>Reception</h3>
              <p className="event-date">November 15, 2023</p>
              <p>An evening of celebration, dining and dancing to honor the newlyweds</p>
              <Link to="/wedding" className="btn">Learn More</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing

