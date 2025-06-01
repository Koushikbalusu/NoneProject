import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

function Landing() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Carousel images
  const carouselImages = [
    {
      src: "https://res.cloudinary.com/da98b7kad/image/upload/v1748114073/PHOTO-2025-05-20-22-02-52_3_qzsufy.jpg",
      alt: "Manasa & Brahma Reddy engagement photo 1"
    },
    {
      src: "https://res.cloudinary.com/da98b7kad/image/upload/v1748114074/PHOTO-2025-05-20-22-02-53_wcmq6o.jpg",
      alt: "Manasa & Brahma Reddy engagement photo 2"
    },
    {
      src: "https://res.cloudinary.com/da98b7kad/image/upload/v1748114073/PHOTO-2025-05-20-22-02-52_2_dxu4rs.jpg",
      alt: "Manasa & Brahma Reddy engagement photo 3"
    }
  ]
  
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
      const indicator = document.querySelector('.scroll-indicator');
      if (indicator) {
        if (window.scrollY > window.innerHeight / 2) {
          indicator.classList.add('hidden');
        } else {
          indicator.classList.remove('hidden');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Carousel auto-rotation
    const carouselInterval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % carouselImages.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(animationTimeout);
      clearInterval(carouselInterval);
    };
  }, [carouselImages.length]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  
  const nextSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide + 1) % carouselImages.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide(prevSlide => 
      prevSlide === 0 ? carouselImages.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="floating-emblem">
            <div className="emblem-outer">
              <div className="emblem-inner">
                <div className="emblem-icon">💕</div>
              </div>
            </div>
          </div>
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
        
        <div className="scroll-indicator" onClick={scrollToContent}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 13L12 18L17 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div className="intro-section">
        <div className="container">
          <div className="intro-content">
            <div className="intro-image">
              <div className="carousel-container">
                <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {carouselImages.map((image, index) => (
                    <div className="carousel-slide" key={index}>
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="couple-story-image"
                      />
                    </div>
                  ))}
                </div>
                
                <button className="carousel-arrow prev" onClick={prevSlide} aria-label="Previous image">
                  &#10094;
                </button>
                <button className="carousel-arrow next" onClick={nextSlide} aria-label="Next image">
                  &#10095;
                </button>
                
                <div className="carousel-dots">
                  {carouselImages.map((_, index) => (
                    <button 
                      key={index} 
                      className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="intro-text">
              <h2>Our Story</h2>
              <p>
                Our journey began with a chance meeting that blossomed into deep friendship and love. 
                Through years of shared dreams, laughter, and growth, we discovered in each other a 
                perfect companion for life's adventures. Now, we invite you to witness the next 
                beautiful chapter as we unite our lives in marriage.
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
              <p className="event-date">June 4, 2025</p>
              <p>A traditional pre-wedding ceremony filled with turmeric, laughter and blessings</p>
              <Link to="/haldi" className="btn">Learn More</Link>
            </div>
            
            <div className="event-card">
              <h3>Wedding Ceremony</h3>
              <p className="event-date">June 4, 2025</p>
              <p>The auspicious union of two souls in a traditional Indian ceremony</p>
              <Link to="/wedding" className="btn">Learn More</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing

