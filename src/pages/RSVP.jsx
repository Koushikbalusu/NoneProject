import { useState, useEffect } from 'react';
import './RSVP.css';

function RSVP() {
  // Form state with validation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: 'yes',
    guestCount: 1,
    dietaryNotes: '',
    guestbookMessage: ''
  });
  
  // Form validation state
  const [errors, setErrors] = useState({});
  
  // Loading states for buttons
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [guestbookLoading, setGuestbookLoading] = useState(false);
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState('rsvp'); // 'rsvp' or 'guestbook'

  // Particles for success modal
  const [particles, setParticles] = useState([]);
  
  // Generate random particles for success animation
  useEffect(() => {
    if (showModal) {
      const colors = ['#D1E7DD', '#FFD700', '#F8D7DA'];
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2
      }));
      setParticles(newParticles);
    }
  }, [showModal]);
  
  // Validate form fields
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Email is invalid';
        }
        break;
      case 'guestbookMessage':
        if (!value.trim()) error = 'Please enter a message';
        break;
      default:
        break;
    }
    
    return error;
  };
  
  // Handle input changes with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Add pulse animation to input
    if (e.target.classList) {
      e.target.classList.add('pulse');
      setTimeout(() => e.target.classList.remove('pulse'), 500);
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Validate field and update errors
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error
    });
  };
  
  // Handle radio button changes
  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      attending: e.target.value
    });
  };
  
  // Validate form before submission
  const validateForm = (type) => {
    const newErrors = {};
    let isValid = true;
    
    if (type === 'rsvp') {
      // Validate RSVP form fields
      const nameError = validateField('name', formData.name);
      const emailError = validateField('email', formData.email);
      
      if (nameError) {
        newErrors.name = nameError;
        isValid = false;
      }
      
      if (emailError) {
        newErrors.email = emailError;
        isValid = false;
      }
    } else {
      // Validate Guestbook form fields
      const messageError = validateField('guestbookMessage', formData.guestbookMessage);
      
      if (messageError) {
        newErrors.guestbookMessage = messageError;
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle RSVP form submission
  const handleRSVPSubmit = (e) => {
    e.preventDefault();
    console.log('RSVP form submitted');
    console.log('Current form data:', formData);

    // Simple validation check
    if (!formData.name.trim()) {
      setErrors({ name: 'Name is required' });
      console.log('Name validation failed');
      return;
    }

    if (!formData.email.trim()) {
      setErrors({ email: 'Email is required' });
      console.log('Email validation failed');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ email: 'Email is invalid' });
      console.log('Email format validation failed');
      return;
    }

    // Clear any previous errors
    setErrors({});
    console.log('Form validation passed');

    setRsvpLoading(true);
    console.log('Setting loading state to true');

    // Simulate API call with setTimeout
    setTimeout(() => {
      console.log('RSVP Submitted:', formData);
      setFormType('rsvp');
      console.log('Setting form type to rsvp');
      setShowModal(true);
      console.log('Setting showModal to true');

      // Reset form (except guestbook message)
      setFormData({
        ...formData,
        name: '',
        email: '',
        attending: 'yes',
        guestCount: 1,
        dietaryNotes: ''
      });

      setRsvpLoading(false);
      console.log('Setting loading state to false');
    }, 1000);
  };
  
  // Handle Guestbook submission
  const handleGuestbookSubmit = (e) => {
    e.preventDefault();
    console.log('Guestbook form submitted');
    console.log('Guestbook message:', formData.guestbookMessage);

    // Simple validation check
    if (!formData.guestbookMessage.trim()) {
      setErrors({ guestbookMessage: 'Please enter a message' });
      console.log('Guestbook message validation failed');
      return;
    }

    // Clear any previous errors
    setErrors({});
    console.log('Guestbook validation passed');

    setGuestbookLoading(true);
    console.log('Setting guestbook loading state to true');

    // Simulate API call with setTimeout
    setTimeout(() => {
      console.log('Guestbook Submitted:', formData.guestbookMessage);
      setFormType('guestbook');
      console.log('Setting form type to guestbook');
      setShowModal(true);
      console.log('Setting showModal to true');

      // Reset guestbook message
      setFormData({
        ...formData,
        guestbookMessage: ''
      });

      setGuestbookLoading(false);
      console.log('Setting guestbook loading state to false');
    }, 1000);
  };
  
  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Animate elements when they enter viewport
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // Check if element is in viewport
        if(position.top < window.innerHeight && position.bottom >= 0) {
          element.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);
  
  return (
    <div className="rsvp-page">
      <div className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <div className="floating-emblem">
            <div className="emblem-outer">
              <div className="emblem-inner">
                <div className="emblem-icon">✉️</div>
              </div>
            </div>
          </div>
          <h1>RSVP & Guestbook</h1>
          <p>We look forward to celebrating with you</p>
        </div>
      </div>
      
      <div className="rsvp-container">
        <div className="rsvp-form-section fade-in">
          <h2 className="section-title">RSVP</h2>
          <p className="section-description">Please let us know if you'll be joining us on our special day. We kindly request your response by October 15, 2023.</p>
          
          <form className="rsvp-form" onSubmit={handleRSVPSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your full name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Your email address"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label>Will you be attending?</label>
              <div className="toggle-buttons">
                <div className="toggle-option">
                  <input 
                    type="radio" 
                    id="attending-yes" 
                    name="attending" 
                    value="yes" 
                    checked={formData.attending === 'yes'} 
                    onChange={handleRadioChange} 
                  />
                  <label htmlFor="attending-yes">Joyfully Accept</label>
                </div>
                
                <div className="toggle-option">
                  <input 
                    type="radio" 
                    id="attending-no" 
                    name="attending" 
                    value="no" 
                    checked={formData.attending === 'no'} 
                    onChange={handleRadioChange} 
                  />
                  <label htmlFor="attending-no">Regretfully Decline</label>
                </div>
              </div>
            </div>
            
            {formData.attending === 'yes' && (
              <>
                <div className="form-group">
                  <label htmlFor="guestCount">Number of Guests (including yourself)</label>
                  <input 
                    type="number" 
                    id="guestCount" 
                    name="guestCount" 
                    min="1" 
                    max="5" 
                    value={formData.guestCount} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="dietaryNotes">Dietary Restrictions or Special Notes</label>
                  <textarea 
                    id="dietaryNotes" 
                    name="dietaryNotes" 
                    value={formData.dietaryNotes} 
                    onChange={handleInputChange} 
                    placeholder="Please let us know of any dietary restrictions or special requirements"
                  ></textarea>
                </div>
              </>
            )}
            
            <button type="submit" className="btn primary-btn" disabled={rsvpLoading}>
              {rsvpLoading ? "Submitting..." : "Submit RSVP"}
            </button>
          </form>
        </div>
        
        <div className="guestbook-section fade-in">
          <h2 className="section-title">Guestbook</h2>
          <p className="section-description">Leave a message for the couple. Your wishes and blessings will be cherished forever.</p>
          
          <form className="guestbook-form" onSubmit={handleGuestbookSubmit}>
            <div className="form-group">
              <textarea
                id="guestbookMessage"
                name="guestbookMessage"
                value={formData.guestbookMessage}
                onChange={handleInputChange}
                required
                placeholder="Share your wishes, advice, or memories with us..."
                rows="5"
                className={errors.guestbookMessage ? 'error' : ''}
              ></textarea>
              {errors.guestbookMessage && <span className="error-message">{errors.guestbookMessage}</span>}
            </div>
            
            <button type="submit" className="btn heart-btn" disabled={guestbookLoading}>
              {guestbookLoading ? "Sending..." : (
                <>
                  <span className="heart-icon">❤</span> Send Wishes
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      
      {/* Success Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>×</button>
            <div className="success-animation">
              <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
              <div className="particles">
                {particles.map(particle => (
                  <div 
                    key={particle.id} 
                    className="particle" 
                    style={{
                      left: `${particle.x}%`,
                      top: `${particle.y}%`,
                      width: `${particle.size}px`,
                      height: `${particle.size}px`,
                      background: particle.color,
                      animationDelay: `${particle.delay}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
            <h3>Thank you!</h3>
            <p>
              {formType === 'rsvp' 
                ? 'Your RSVP has been submitted successfully.' 
                : 'Your message has been added to our guestbook.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RSVP;
