import { useState, useEffect, useRef } from 'react';
import './Gallery.css';

function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const videoRef = useRef(null);
  
  // Gallery items with Cloudinary image links
  const galleryItems = [
    { id: 1, type: 'photo', category: 'engagement', src: 'https://res.cloudinary.com/da98b7kad/image/upload/v1748114074/PHOTO-2025-05-20-22-02-54_2_u8x5bk.jpg', caption: 'The proposal at sunset' },
    { id: 2, type: 'photo', category: 'engagement', src: 'https://res.cloudinary.com/da98b7kad/image/upload/v1748114074/PHOTO-2025-05-20-22-02-53_wcmq6o.jpg', caption: 'Ring close-up' },
    { id: 3, type: 'photo', category: 'pre-wedding', src: 'https://res.cloudinary.com/da98b7kad/image/upload/v1748114073/PHOTO-2025-05-20-22-02-51_f2xivv.jpg', caption: 'Beach photoshoot' },
    { id: 4, type: 'photo', category: 'pre-wedding', src: 'https://res.cloudinary.com/da98b7kad/image/upload/v1748114074/PHOTO-2025-05-20-22-02-52_xpszhb.jpg', caption: 'Garden walk' },
    { id: 5, type: 'photo', category: 'ceremony', src: 'https://res.cloudinary.com/da98b7kad/image/upload/v1748114073/PHOTO-2025-05-20-22-02-50_z0j493.jpg', caption: 'First look' },
    { id: 6, type: 'photo', category: 'ceremony', src: 'https://res.cloudinary.com/da98b7kad/image/upload/v1748114073/PHOTO-2025-05-20-22-02-53_2_usvrvt.jpg', caption: 'Exchanging vows' },
    { id: 7, type: 'photo', category: 'ceremony', src: 'https://res.cloudinary.com/da98b7kad/image/upload/v1748114073/PHOTO-2025-05-20-22-02-52_3_qzsufy.jpg', caption: 'First kiss as newlyweds' },
    { id: 8, type: 'photo', category: 'pre-wedding', src: 'https://res.cloudinary.com/da98b7kad/image/upload/v1748114073/PHOTO-2025-05-20-22-02-52_2_dxu4rs.jpg', caption: 'Candid moment' },
    { id: 9, type: 'photo', category: 'engagement', src: 'https://res.cloudinary.com/da98b7kad/image/upload/v1748114073/PHOTO-2025-05-20-22-02-50_2_yl9ed6.jpg', caption: 'Celebration dinner' },
  ];
  
  // Video items with added welcome videos from Cloudinary
  const videoItems = [
    { 
      id: 101, 
      category: 'engagement', 
      thumbnail: '/images/gallery/video-thumb-1.jpg', 
      src: '/videos/engagement.mp4', 
      caption: 'Engagement highlights',
      duration: '2:15'
    },
    { 
      id: 102, 
      category: 'pre-wedding', 
      thumbnail: '/images/gallery/video-thumb-2.jpg', 
      src: '/videos/pre-wedding.mp4', 
      caption: 'Pre-wedding shoot behind the scenes',
      duration: '3:42'
    },
    { 
      id: 103, 
      category: 'ceremony', 
      thumbnail: '/images/gallery/video-thumb-3.jpg', 
      src: '/videos/ceremony.mp4', 
      caption: 'Wedding ceremony highlights',
      duration: '5:30'
    },
    { 
      id: 104, 
      category: 'ceremony', 
      thumbnail: '/images/gallery/video-thumb-4.jpg', 
      src: '/videos/reception.mp4', 
      caption: 'Reception party',
      duration: '4:15'
    },
    // Added welcome videos
    { 
      id: 105, 
      category: 'ceremony', 
      thumbnail: 'https://res.cloudinary.com/da98b7kad/image/upload/c_thumb,w_400,g_face/v1748114592/WhatsApp_Video_2025-05-18_at_15.34.19_mc1x8j.jpg', 
      src: 'https://res.cloudinary.com/da98b7kad/video/upload/v1748114592/WhatsApp_Video_2025-05-18_at_15.34.19_mc1x8j.mp4', 
      caption: 'Welcome Message from the Groom',
      duration: '1:20'
    },
    { 
      id: 106, 
      category: 'pre-wedding', 
      thumbnail: 'https://res.cloudinary.com/da98b7kad/image/upload/c_thumb,w_400,g_face/v1748114589/WhatsApp_Video_2025-05-18_at_15.34.43_hwccex.jpg', 
      src: 'https://res.cloudinary.com/da98b7kad/video/upload/v1748114589/WhatsApp_Video_2025-05-18_at_15.34.43_hwccex.mp4', 
      caption: 'Our Story - Personal Message',
      duration: '1:45'
    }
  ];
  
  // Filter gallery items based on active filter
  const filteredPhotos = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);
    
  const filteredVideos = activeFilter === 'all'
    ? videoItems
    : videoItems.filter(item => item.category === activeFilter);
  
  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };
  
  // Open video lightbox
  const openVideoLightbox = (video) => {
    setCurrentVideo(video);
    setLightboxOpen(true);
    
    // Pause any currently playing videos when lightbox opens
    document.querySelectorAll('video').forEach(vid => {
      if (vid !== videoRef.current) {
        vid.pause();
      }
    });
  };
  
  // Close video lightbox
  const closeLightbox = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setLightboxOpen(false);
    setCurrentVideo(null);
  };
  
  // Close lightbox on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);
  
  // Animate items when they enter viewport
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
  }, [activeFilter]); // Re-run when filter changes
  
  return (
    <div className="gallery-page">
      <div className="hero-section">
        <div className="hero-pattern"></div>
        <div className="hero-decoration"></div>
        <div className="hero-content">
          <h1>Our Moments</h1>
          <p>A collection of memories from our journey together</p>
        </div>
      </div>
      
      <div className="gallery-container">
        <div className="filter-buttons fade-in">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All Memories
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'engagement' ? 'active' : ''}`}
            onClick={() => handleFilterChange('engagement')}
          >
            Engagement
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'pre-wedding' ? 'active' : ''}`}
            onClick={() => handleFilterChange('pre-wedding')}
          >
            Pre-wedding
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'ceremony' ? 'active' : ''}`}
            onClick={() => handleFilterChange('ceremony')}
          >
            Ceremony
          </button>
        </div>
        
        <h2 className="section-title fade-in">Photos</h2>
        <div className="masonry-grid">
          {filteredPhotos.map((item, index) => (
            <div 
              key={item.id} 
              className="masonry-item fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="image-container">
                <img src={item.src} alt={item.caption} />
                <div className="image-caption">
                  <p>{item.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="video-section fade-in">
          <h2 className="section-title">Captured Moments in Motion</h2>
          <div className="video-section-intro">
            <p>Relive our special moments through these videos. Click on any thumbnail to watch the full video.</p>
          </div>
          
          <div className="video-grid">
            {filteredVideos.map((video, index) => (
              <div 
                key={video.id} 
                className="video-item fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openVideoLightbox(video)}
              >
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.caption} />
                  <div className="play-button">
                    <span>▶</span>
                  </div>
                  <div className="video-badge">
                    <span>Video</span>
                  </div>
                </div>
                <p className="video-caption">{video.caption}</p>
                <p className="video-duration">{video.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Video Lightbox */}
      {lightboxOpen && currentVideo && (
        <div className="video-lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeLightbox}>×</button>
            <video 
              ref={videoRef}
              src={currentVideo.src} 
              controls 
              autoPlay
              className="lightbox-video"
            ></video>
            <p className="lightbox-caption">{currentVideo.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
