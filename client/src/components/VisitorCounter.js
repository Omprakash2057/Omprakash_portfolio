import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaWifi, FaExclamationTriangle } from 'react-icons/fa';
import './VisitorCounter.css';

const VisitorCounter = ({ socket, isConnected }) => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    if (socket) {
      // Listen for visitor count updates
      socket.on('visitorCount', (count) => {
        setVisitorCount(count);
      });

      // Listen for online users count
      socket.on('onlineUsers', (count) => {
        setOnlineUsers(count);
      });

      // Request initial counts
      socket.emit('getVisitorCount');
      socket.emit('getOnlineUsers');
    }

    return () => {
      if (socket) {
        socket.off('visitorCount');
        socket.off('onlineUsers');
      }
    };
  }, [socket]);

  return (
    <motion.div 
      className="visitor-counter"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      <div className="counter-content">
        <div className="counter-item">
          <div className="counter-icon">
            <FaEye />
          </div>
          <div className="counter-info">
            <span className="counter-number">{visitorCount.toLocaleString()}</span>
            <span className="counter-label">Total Visitors</span>
          </div>
        </div>

        <div className="counter-divider"></div>

        <div className="counter-item">
          <div className="counter-icon online">
            {isConnected ? <FaWifi /> : <FaExclamationTriangle />}
          </div>
          <div className="counter-info">
            <span className="counter-number">{onlineUsers}</span>
            <span className="counter-label">Online Now</span>
          </div>
        </div>
      </div>

      <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
        <div className="status-dot"></div>
        <span>{isConnected ? 'Live Updates' : 'Offline'}</span>
      </div>
    </motion.div>
  );
};

export default VisitorCounter;
