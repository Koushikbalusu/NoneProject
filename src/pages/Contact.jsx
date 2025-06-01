import { useState, useEffect } from 'react';
import './Contact.css';

function Contact() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  
  // WhatsApp state
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Contact Form Submitted:', formData);
    setShowModal(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };
  
  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };
  
  // Toggle WhatsApp chat
  const toggleWhatsApp = () => {
    setShowWhatsApp(!showWhatsApp);
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
    <div className="contact-page">
      <div className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <div className="floating-emblem">
            <div className="emblem-outer">
              <div className="emblem-inner">
                <div className="emblem-icon">📞</div>
              </div>
            </div>
          </div>
          <h1>Contact & Venue</h1>
          <p>Find your way to our celebration</p>
        </div>
      </div>
      
      <div className="venue-section">
        <div className="container">
          <h2 className="section-title fade-in">Our Wedding Venue</h2>
          <p className="section-description fade-in">
            Join us at The Grand Pavilion, a beautiful venue located in the heart of Mumbai, 
            offering stunning views and elegant spaces for all our wedding events.
          </p>
          
          <div className="map-container fade-in">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4053.105324624163!2d79.55893381083895!3d15.33882615851521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4b3b001c95a179%3A0xfec91b28f7eb0a2e!2sMEDAM%20SRINIVASA%20REDDY!5e1!3m2!1sen!2sin!4v1748113517689!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{ border: 0, borderRadius: '15px' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding Venue Map"
            ></iframe>
          </div>
          
          <div className="venue-details fade-in">
            <div className="venue-info">
              <h3>Family Residency</h3>
              <p><i className="venue-icon">📍</i> MEDAM SRINIVASA REDDY, Madhavaram (V), Thallur (M), Prakasam Dt.</p>
              <a href="https://maps.app.goo.gl/5kXxjY4u6CPNGCe98" target="_blank" rel="noopener noreferrer" className="btn">Get Directions</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hotels-section">
        <div className="container">
          <h2 className="section-title fade-in">Stay with Our Family</h2>
          <p className="section-description fade-in">
            Experience true Indian hospitality by staying with our family members who have 
            graciously opened their homes to our wedding guests. Feel at home away from home.
          </p>
          
          <div className="hotel-cards">
            <div className="hotel-card fade-in">
              <div className="hotel-image" style={{ backgroundImage: 'url("/images/uncle-home.jpg")' }}></div>
              <div className="hotel-content">
                <h3>Medam Venkata Reddy's Home</h3>
                <p className="hotel-relation"><i className="hotel-icon">👨‍👩‍👧‍👦</i> Bride's Uncle & Family</p>
                <p className="hotel-distance"><i className="hotel-icon">🚗</i> 0.5 km from venue (2 min drive)</p>
                <p className="hotel-amenities">Free WiFi, 3 Spare Rooms, Home-cooked Meals</p>
                <div className="hotel-quote">
                  <i>"We're excited to welcome you to our home and share stories about our niece!"</i>
                </div>
                <a href="tel:+919876543210" className="btn hotel-btn">Contact Family</a>
              </div>
            </div>
            
            <div className="hotel-card fade-in">
              <div className="hotel-image" style={{ backgroundImage: 'url("/images/aunt-home.jpg")' }}></div>
              <div className="hotel-content">
                <h3>Lokireddy Suresh & Padma's Home</h3>
                <p className="hotel-relation"><i className="hotel-icon">👨‍👩‍👦</i> Groom's Aunt & Uncle</p>
                <p className="hotel-distance"><i className="hotel-icon">🚗</i> 1.2 km from venue (5 min drive)</p>
                <p className="hotel-amenities">Free WiFi, 2 Spare Rooms, Garden View</p>
                <div className="hotel-quote">
                  <i>"Our home is your home! We have a beautiful garden where you can relax."</i>
                </div>
                <a href="tel:+919876543211" className="btn hotel-btn">Contact Family</a>
              </div>
            </div>
            
            <div className="hotel-card fade-in">
              <div className="hotel-image" style={{ backgroundImage: 'url("/images/cousin-home.jpg")' }}></div>
              <div className="hotel-content">
                <h3>Medam Srinivas & Lakshmi's Home</h3>
                <p className="hotel-relation"><i className="hotel-icon">👨‍👩‍👧</i> Bride's Cousin & Family</p>
                <p className="hotel-distance"><i className="hotel-icon">🚗</i> 0.8 km from venue (3 min drive)</p>
                <p className="hotel-amenities">Free WiFi, 4 Spare Rooms, Homemade Breakfast</p>
                <div className="hotel-quote">
                  <i>"We have plenty of room and would love to host you during this special occasion!"</i>
                </div>
                <a href="tel:+919876543212" className="btn hotel-btn">Contact Family</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="contact-section">
        <div className="container">
          <div className="contact-container">
            <div className="contact-info fade-in">
              <h2 className="section-title">Get in Touch</h2>
              <p className="section-description">
                Have questions about our wedding? Feel free to reach out to us directly.
              </p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div className="contact-text">
                    <h4>Phone</h4>
                    <p>+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div className="contact-text">
                    <h4>Email</h4>
                    <p>priyaandraj@wedding.com</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">👨‍👩‍👧</div>
                  <div className="contact-text">
                    <h4>Bride's Family</h4>
                    <p>Sri Medam Anki Reddy & Smt. Adilakshmi</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">👨‍👩‍👦</div>
                  <div className="contact-text">
                    <h4>Groom's Family</h4>
                    <p>Sri Lokireddy Nagireddy & Smt. Vijaya Bharathi</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-form-container fade-in">
              <h3>Send us a Message</h3>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Enter your name"
                  />
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
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Type your message here..."
                    rows="5"
                  ></textarea>
                </div>
                
                <button type="submit" className="btn primary-btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* WhatsApp Chat Button */}
      <div className="whatsapp-container">
        <button className="whatsapp-button" onClick={toggleWhatsApp}>
          <span className="whatsapp-icon">💬</span>
        </button>
        
        {showWhatsApp && (
          <div className="whatsapp-popup">
            <div className="whatsapp-header">
              <h4>Chat with Us</h4>
              <button className="close-whatsapp" onClick={toggleWhatsApp}>×</button>
            </div>
            <div className="whatsapp-body">
              <p>Hi there! Have questions about our wedding?</p>
              <p>Chat with us on WhatsApp for quick responses.</p>
              <a 
                href="https://wa.me/917095989792" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="whatsapp-link"
              >
                Open WhatsApp
              </a>
            </div>
          </div>
        )}
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
            </div>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out. We'll get back to you soon.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;
