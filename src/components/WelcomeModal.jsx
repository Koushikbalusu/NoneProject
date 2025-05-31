import { useState, useEffect, useRef } from 'react';
import './WelcomeModal.css';

function WelcomeModal({ isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);

  // Using just the first video
  const videoUrl = "https://res.cloudinary.com/da98b7kad/video/upload/v1748114592/WhatsApp_Video_2025-05-18_at_15.34.19_mc1x8j.mp4";

  useEffect(() => {
    // When modal opens, setup and play the video
    if (isOpen && videoRef.current) {
      const video = videoRef.current;

      // Reset video state
      setCurrentTime(0);
      setIsPlaying(false);

      // Load the video
      video.load();

      // Add event listeners
      const handleLoadedMetadata = () => {
        setDuration(video.duration);
        // Only set initial volume and mute state, don't change during playback
        if (video.currentTime === 0) {
          video.volume = volume;
          video.muted = isMuted;
        }
      };

      const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime);
      };

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);

      // Attempt autoplay with multiple strategies
      const attemptAutoplay = async () => {
        try {
          // First try with sound
          await video.play();
        } catch (err) {
          console.log("Autoplay with sound failed, trying muted:", err);
          try {
            // If that fails, try muted
            video.muted = true;
            setIsMuted(true);
            await video.play();
          } catch (mutedErr) {
            console.log("Autoplay completely prevented:", mutedErr);
          }
        }
      };

      // Small delay to ensure video loads properly
      setTimeout(attemptAutoplay, 500);

      // Cleanup
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, [isOpen]); // Only depend on isOpen

  // Fullscreen event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);



  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * duration;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      // Don't reload the video, just change volume
      videoRef.current.volume = newVolume;
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Prevent click inside modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div className="welcome-modal-overlay" onClick={onClose}>
      <div className="welcome-modal-content" onClick={handleModalClick}>
        <button className="welcome-modal-close" onClick={onClose}>×</button>

        <div className="welcome-modal-header">
          <div className="welcome-modal-decoration left"></div>
          <h2>Welcome to Our Wedding Website</h2>
          <div className="welcome-modal-decoration right"></div>
        </div>

        <div className="welcome-modal-body">
          <div className="welcome-video-container">
            <video
              ref={videoRef}
              src={videoUrl}
              playsInline
              className="welcome-video"
              muted={isMuted}
            ></video>

            {/* Custom Video Controls */}
            <div className="custom-video-controls">
              <div className="video-progress-container">
                <div className="video-progress-bar" onClick={handleSeek}>
                  <div
                    className="video-progress-filled"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>

              <div className="video-controls-bottom">
                <div className="video-controls-left">
                  <button className="control-btn play-pause" onClick={togglePlayPause} title={isPlaying ? 'Pause' : 'Play'}>
                    {isPlaying ? '⏸️' : '▶️'}
                  </button>

                  <div className="volume-controls">
                    <button className="control-btn volume-btn" onClick={toggleMute} title={isMuted ? 'Unmute' : 'Mute'}>
                      {isMuted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="volume-slider"
                      title="Volume"
                    />
                  </div>

                  <div className="time-display">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                <div className="video-controls-right">
                  <button
                    className="control-btn fullscreen-btn"
                    onClick={() => {
                      if (videoRef.current) {
                        if (isFullscreen) {
                          document.exitFullscreen();
                        } else {
                          videoRef.current.requestFullscreen().catch(err => {
                            console.log("Fullscreen failed:", err);
                          });
                        }
                      }
                    }}
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? '⛶' : '⛶'}
                  </button>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

export default WelcomeModal;