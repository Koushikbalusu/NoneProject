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

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  const [isFirstVisit, setIsFirstVisit] = useState(true)

  useEffect(() => {
    // Check if this is the first visit
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore')
    if (hasVisitedBefore) {
      setIsFirstVisit(false)
    } else {
      localStorage.setItem('hasVisitedBefore', 'true')
    }

    // Simulate loading assets
    setTimeout(() => setIsLoading(false), 2000)
    
    // Show welcome modal after 10 seconds for first visit, 1 minute for subsequent visits
    const modalTimer = setTimeout(() => {
      // Check if user has already seen the modal in this session
      const hasSeenModal = sessionStorage.getItem('hasSeenWelcomeModal')
      
      if (!hasSeenModal) {
        setShowWelcomeModal(true)
        // Mark that user has seen the modal in this session
        sessionStorage.setItem('hasSeenWelcomeModal', 'true')
      }
    }, isFirstVisit ? 10000 : 10000) // 10 seconds for first visit, 1 minute for subsequent visits
    
    return () => {
      clearTimeout(modalTimer)
    }
  }, [isFirstVisit])

  const handleCloseModal = () => {
    setShowWelcomeModal(false)
  }

  if (isLoading) {
    return <div className="loader">Loading...</div>
  }

  return (
    <Router>
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
