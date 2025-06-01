import { useEffect, useRef, useState } from 'react';
import './Wedding.css';

function Wedding() {
  const timelineRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  useEffect(() => {
    // Animate elements when they enter viewport
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-in');
      
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // Check if element is in viewport
        if(position.top < window.innerHeight && position.bottom >= 0) {
          element.classList.add('visible');
        }
      });
    };
    
    // Handle horizontal scroll for timeline with wheel event
    const handleTimelineScroll = (e) => {
      if (timelineRef.current) {
        if (e.deltaY !== 0) {
          e.preventDefault();
          timelineRef.current.scrollLeft += e.deltaY;
        }
      }
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Check on initial load
    
    // Add horizontal scroll event to timeline
    const timeline = timelineRef.current;
    if (timeline) {
      timeline.addEventListener('wheel', handleTimelineScroll, { passive: false });
    }
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
      if (timeline) {
        timeline.removeEventListener('wheel', handleTimelineScroll);
      }
    };
  }, []);
  
  // Mouse down handler for drag scrolling
  const handleMouseDown = (e) => {
    if (!timelineRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
    timelineRef.current.style.cursor = 'grabbing';
  };
  
  // Mouse move handler for drag scrolling
  const handleMouseMove = (e) => {
    if (!isDragging || !timelineRef.current) return;
    e.preventDefault(); // Prevent text selection during drag
    
    const x = e.pageX - timelineRef.current.offsetLeft;
    // Reduce the multiplier for smoother scrolling
    const walk = (x - startX) * 1.2; 
    
    // Use requestAnimationFrame for smoother scrolling
    requestAnimationFrame(() => {
      timelineRef.current.scrollLeft = scrollLeft - walk;
    });
  };
  
  // Mouse up/leave handler to end drag scrolling
  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    if (timelineRef.current) {
      timelineRef.current.style.cursor = 'grab';
    }
  };
  
  // Touch handlers for mobile devices
  const handleTouchStart = (e) => {
    if (!timelineRef.current) return;
    
    setIsDragging(true);
    setStartX(e.touches[0].pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging || !timelineRef.current) return;
    
    const x = e.touches[0].pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };
  
  // Improved scroll to next/previous item function
  const scrollTimeline = (direction) => {
    if (!timelineRef.current) return;
    
    const itemWidth = 300; // Approximate width of a timeline item with gap
    const currentScroll = timelineRef.current.scrollLeft;
    const newScroll = direction === 'left' 
      ? currentScroll - itemWidth 
      : currentScroll + itemWidth;
    
    // Use requestAnimationFrame for smoother scrolling
    const startTime = performance.now();
    const duration = 500; // ms
    const startPosition = currentScroll;
    const distance = newScroll - startPosition;
    
    const scrollAnimation = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      // Use easeInOutCubic easing function for smoother motion
      const easeProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      timelineRef.current.scrollLeft = startPosition + distance * easeProgress;
      
      if (progress < 1) {
        requestAnimationFrame(scrollAnimation);
      }
    };
    
    requestAnimationFrame(scrollAnimation);
  };

  return (
    <div className="wedding-page">
      <div className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-pattern"></div>
        <div className="hero-decoration"></div>
        <div className="hero-content">
          <div className="floating-emblem">
            <div className="emblem-outer">
              <div className="emblem-inner">
                <div className="emblem-icon">💍</div>
              </div>
            </div>
          </div>
          <div className="hero-title-wrapper">
            <div className="hero-ornament"></div>
            <h1>Manasa & Brahma Reddy</h1>
          </div>
          <p>June 05, 2025</p>
        </div>
      </div>
      
      <div className="event-details-section">
        <div className="container">
          <h2 className="section-title">Join Us For</h2>
          
          <div className="event-cards">
            <div className="event-card animate-in slide-right">
              <div className="event-icon">🕍</div>
              <h3>The Ceremony</h3>
              <div className="event-time">
                <p className="date">June 05, 2025</p>
                <p className="time">Evening</p>
                <p className="auspicious">Hastha Nakshtram, Dhanassu Lagnam</p>
              </div>
              <div className="event-location">
                <h4>Family Residency</h4>
                <p>Madhavaram (V), Thallur (M), Prakasam Dt.</p>
              </div>
              <div className="event-description">
                <p>Join us for a traditional Hindu ceremony as we exchange vows and begin our journey together.</p>
              </div>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn">Get Directions</a>
            </div>
            
            <div className="event-card animate-in slide-left">
              <div className="event-icon">🍽️</div>
              <h3>The Dinner</h3>
              <div className="event-time">
                <p className="date">June 05, 2025</p>
                <p className="time">07:30 PM onwards</p>
              </div>
              <div className="event-location">
                <h4>Family Residency</h4>
                <p>Patha Yeruvaripalli(V), Kanigiri(M), Prakasam(D), Andhraparadesh(S)</p>
              </div>
              <div className="event-description">
                <p>Celebrate with us at our dinner reception with music and festivities.</p>
              </div>
              <a href="https://maps.app.goo.gl/Ha7PXji5idJyzU9q7" target="_blank" rel="noopener noreferrer" className="btn">Get Directions</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="timeline-section">
        <div className="container">
          <h2 className="section-title">Our Story</h2>
          <div 
            className="timeline-container" 
            ref={timelineRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUpOrLeave}
            style={{ cursor: 'grab' }}
          >
            <div className="timeline-item">
              <div className="timeline-image">
                <div className="image-placeholder"></div>
              </div>
              <div className="timeline-content">
                <h3>First Meeting</h3>
                <p className="timeline-date">January 2019</p>
                <p>We first met at a mutual friend's birthday party. Raj spilled his drink on Priya's dress, and the rest is history.</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-image">
                <div className="image-placeholder"></div>
              </div>
              <div className="timeline-content">
                <h3>First Date</h3>
                <p className="timeline-date">February 2019</p>
                <p>Our first date was at a cozy café where we talked for hours and discovered our shared love for travel and food.</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-image">
                <div className="image-placeholder"></div>
              </div>
              <div className="timeline-content">
                <h3>Trip to Goa</h3>
                <p className="timeline-date">December 2019</p>
                <p>Our first vacation together was a magical trip to the beaches of Goa where we realized we were perfect travel companions.</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-image">
                <div className="image-placeholder"></div>
              </div>
              <div className="timeline-content">
                <h3>Moving In Together</h3>
                <p className="timeline-date">June 2021</p>
                <p>We took the big step of moving in together and creating our first home filled with love, plants, and our favorite books.</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-image">
                <div className="image-placeholder"></div>
              </div>
              <div className="timeline-content">
                <h3>The Proposal</h3>
                <p className="timeline-date">February 2023</p>
                <p>Raj proposed during a sunset boat ride on the Arabian Sea. Priya said yes before he could even finish asking!</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-image">
                <div className="image-placeholder"></div>
              </div>
              <div className="timeline-content">
                <h3>Wedding Day</h3>
                <p className="timeline-date">June 04, 2025</p>
                <p>We will be celebrating our union with family and friends in a traditional ceremony followed by dinner and festivities.</p>
              </div>
            </div>
          </div>
          <div className="timeline-navigation">
            <button 
              className="timeline-nav-btn left" 
              onClick={() => scrollTimeline('left')}
              aria-label="Previous story"
            >
              ←
            </button>
            <div className="timeline-scroll-hint">
              <span>Scroll horizontally to see more</span>
              <div className="scroll-arrows">
                <span>←</span>
                <span>→</span>
              </div>
            </div>
            <button 
              className="timeline-nav-btn right" 
              onClick={() => scrollTimeline('right')}
              aria-label="Next story"
            >
              →
            </button>
          </div>
        </div>
      </div>
      
      <div className="dress-gifts-section">
        <div className="container">
          <div className="section-header">
            <div className="decorative-line"></div>
            <h2 className="main-section-title">Information for Guests</h2>
            <div className="decorative-line"></div>
          </div>
          
          <div className="section-columns">
            <div className="dress-code-column animate-in fade-in">
              <div className="column-card">
                <div className="card-decoration top-left"></div>
                <div className="card-decoration top-right"></div>
                <div className="card-decoration bottom-left"></div>
                <div className="card-decoration bottom-right"></div>
                
                <div className="card-icon-wrapper">
                  <div className="card-icon">👗</div>
                </div>
                
                <h2 className="section-title">Dress Code</h2>
                <p className="section-description">We request formal Indian attire or formal Western wear in our wedding colors.</p>
                
                <div className="color-palette">
                  <div className="color-swatch" style={{backgroundColor: 'var(--mint-green)'}}>
                    <span className="color-name">Mint Green</span>
                  </div>
                  <div className="color-swatch" style={{backgroundColor: 'var(--blush-pink)'}}>
                    <span className="color-name">Blush Pink</span>
                  </div>
                  <div className="color-swatch" style={{backgroundColor: 'var(--ivory)'}}>
                    <span className="color-name">Ivory</span>
                  </div>
                  <div className="color-swatch" style={{backgroundColor: 'var(--gold)'}}>
                    <span className="color-name">Gold</span>
                  </div>
                </div>
                
                <div className="dress-suggestions">
                  <div className="suggestion-item">
                    <div className="suggestion-icon">👰</div>
                    <div className="suggestion-content">
                      <h4>For Ladies</h4>
                      <p>Sarees, lehengas, anarkalis in pastel shades, or formal evening gowns</p>
                    </div>
                  </div>
                  <div className="suggestion-item">
                    <div className="suggestion-icon">🤵</div>
                    <div className="suggestion-content">
                      <h4>For Gentlemen</h4>
                      <p>Sherwanis, kurta pajamas, or formal suits in complementary colors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="gifts-column animate-in fade-in">
              <div className="column-card">
                <div className="card-decoration top-left"></div>
                <div className="card-decoration top-right"></div>
                <div className="card-decoration bottom-left"></div>
                <div className="card-decoration bottom-right"></div>
                
                <div className="card-icon-wrapper">
                  <div className="card-icon">🎁</div>
                </div>
                
                <h2 className="section-title">Gifts</h2>
                <p className="section-description">Your presence is the greatest gift. However, if you wish to honor us with a gift, we've created registries at the following places:</p>
                
                <div className="registry-links">
                  <a href="#" className="registry-item">
                    <div className="registry-icon">🏠</div>
                    <div className="registry-content">
                      <h4>Home Center</h4>
                      <p>For home decor and essentials</p>
                    </div>
                  </a>
                  
                  <a href="#" className="registry-item">
                    <div className="registry-icon">✈️</div>
                    <div className="registry-content">
                      <h4>Honeymoon Fund</h4>
                      <p>Help us create memories on our dream trip</p>
                    </div>
                  </a>
                  
                  <a href="#" className="registry-item">
                    <div className="registry-icon">💝</div>
                    <div className="registry-content">
                      <h4>Charity Donation</h4>
                      <p>Support causes close to our hearts</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rsvp-banner">
        <div className="container">
          <div className="rsvp-content animate-in fade-in">
            <div className="rsvp-decoration left"></div>
            <div className="rsvp-decoration right"></div>
            <div className="rsvp-inner">
              <h2>We hope you can join us!</h2>
              <p>Please RSVP by October 15, 2023</p>
              <a href="/rsvp" className="btn primary-btn">
                <span className="btn-icon">✉️</span>
                <span>RSVP Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wedding;
