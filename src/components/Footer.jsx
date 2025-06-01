import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>Manasa & Brahma Reddy</h3>
            <p>Forever begins on June 05, 2025</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/countdown">Countdown</a></li>
                <li><a href="/wedding">Wedding</a></li>
                <li><a href="/gallery">Gallery</a></li>
                <li><a href="/rsvp">RSVP</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
                <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Manasa & Brahma Reddy Wedding. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
