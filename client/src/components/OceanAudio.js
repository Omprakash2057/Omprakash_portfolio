import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useOceanTheme } from '../contexts/OceanThemeContext';

const OceanAudio = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const { isUnderwater } = useOceanTheme();

  // Create ocean sounds using Web Audio API
  useEffect(() => {
    let audioContext;
    let gainNode;
    let filter;

    const createOceanSound = () => {
      try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create white noise for water sound
        const bufferSize = 4096;
        const buffer = audioContext.createBuffer(2, bufferSize, audioContext.sampleRate);
        
        for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
          const channelData = buffer.getChannelData(channel);
          for (let i = 0; i < bufferSize; i++) {
            channelData[i] = Math.random() * 2 - 1;
          }
        }
        
        const whiteNoise = audioContext.createBufferSource();
        whiteNoise.buffer = buffer;
        whiteNoise.loop = true;
        
        // Create filter for ocean-like sound
        filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = isUnderwater ? 300 : 800;
        filter.Q.value = 10;
        
        // Create gain node for volume control
        gainNode = audioContext.createGain();
        gainNode.gain.value = isMuted ? 0 : volume;
        
        // Connect nodes
        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (!isMuted) {
          whiteNoise.start();
        }
        
        return () => {
          if (audioContext) {
            audioContext.close();
          }
        };
      } catch (error) {
        console.log('Web Audio API not supported');
      }
    };

    if (!isMuted) {
      const cleanup = createOceanSound();
      return cleanup;
    }
  }, [isMuted, volume, isUnderwater]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <motion.div
      className="ocean-audio-controls"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
    >
      <div className="glass-surface ocean-audio-panel">
        <div className="ocean-audio-content">
          <motion.button
            onClick={toggleMute}
            className="ocean-button ocean-audio-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMuted ? (
              <FaVolumeMute className="audio-icon" />
            ) : (
              <FaVolumeUp className="audio-icon" />
            )}
          </motion.button>
          
          {!isMuted && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              className="volume-control"
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="ocean-slider"
              />
              <span className="volume-text">Ocean</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OceanAudio;