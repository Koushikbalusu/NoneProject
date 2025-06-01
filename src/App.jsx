import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'

// Pages
import Landing from './pages/Landing'
import Countdown from './pages/Countdown'
import Haldi from './pages/Haldi'
import Wedding from './pages/Wedding'
import Gallery from './pages/Gallery'
import RSVP from './pages/RSVP'
import Contact from './pages/Contact'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WelcomeModal from './components/WelcomeModal'
import MiniCountdown from './components/MiniCountdown'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  const [isFirstVisit, setIsFirstVisit] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Check if this is the first visit
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore')
    if (hasVisitedBefore) {
      setIsFirstVisit(false)
    } else {
      localStorage.setItem('hasVisitedBefore', 'true')
    }

    // Simulate loading progress with slower, more elegant pacing
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        // More controlled progression with the slower interval
        const newProgress = prev + (Math.random() * 8) + 2; // More consistent increments
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 600);

    // Complete loading after animation finishes
    setTimeout(() => {
      clearInterval(interval);
      setLoadingProgress(100);

      // Add fade-out class before removing loader
      const loaderContainer = document.querySelector('.loader-container');
      if (loaderContainer) {
        loaderContainer.classList.add('fade-out');
      }

      setTimeout(() => setIsLoading(false), 1200); // Longer, more graceful exit
    }, 3000); // Extended slightly for more complete animation experience

    // Show welcome modal after loading - ALWAYS show on home page reload
    const modalTimer = setTimeout(() => {
      // Only show modal if we're on the home page
      if (window.location.pathname === '/' || window.location.pathname === '') {
        setShowWelcomeModal(true)
      }
    }, 4500) // Show after loading completes


    return () => {
      clearTimeout(modalTimer)
      clearInterval(interval)
    }
  }, []) // Remove isFirstVisit dependency to trigger on every reload

  const handleCloseModal = () => {
    setShowWelcomeModal(false)
  }

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader-background-effect"></div>
        <div className="loader-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle star"></div>
          <div className="particle star"></div>
          <div className="particle star"></div>
        </div>
        <div className="loader-content">
          <div className="loader-monogram">
            <span>M</span>
            <span>&</span>
            <span>B</span>
          </div>
          <div className="loader-progress">
            <div className="loader-bar" style={{ width: `${loadingProgress}%` }}></div>
          </div>
          <div className="loader-text">Our love story is loading...</div>
        </div>
        <div className="loader-decoration top-left" style={{ '--rotation': '0deg' }}></div>
        <div className="loader-decoration top-right" style={{ '--rotation': '90deg' }}></div>
        <div className="loader-decoration bottom-left" style={{ '--rotation': '270deg' }}></div>
        <div className="loader-decoration bottom-right" style={{ '--rotation': '180deg' }}></div>
      </div>
    )
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/countdown" element={<Countdown />} />
            <Route path="/haldi" element={<Haldi />} />
            <Route path="/wedding" element={<Wedding />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/rsvp" element={<RSVP />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Welcome Modal */}
        <WelcomeModal 
          isOpen={showWelcomeModal} 
          onClose={handleCloseModal} 
        />
        
        {/* Mini Countdown Timer */}
        <MiniCountdown />
      </div>
    </Router>
  )
}

export default App
