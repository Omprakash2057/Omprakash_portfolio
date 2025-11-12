import React, { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaDownload } from 'react-icons/fa';
import './Hero.css';

const Hero = memo(() => {
  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="geometric-3d-container">
          {/* Floating geometric elements */}
          <motion.div 
            className="cube-3d geometric-shape"
            animate={{ 
              rotateX: [0, 360],
              rotateY: [0, 360],
              y: [0, -30, 0]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="pyramid-3d geometric-shape"
            animate={{ 
              rotateY: [0, 360],
              y: [0, -25, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="hexagon-3d geometric-shape"
            animate={{ 
              rotateZ: [0, 180, 360],
              scale: [1, 1.2, 1],
              x: [0, 20, -15, 0],
              y: [0, -15, 10, 0]
            }}
            transition={{ 
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="diamond-3d geometric-shape"
            animate={{ 
              rotate: [45, 225, 405],
              scale: [1, 1.3, 1],
              x: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      <div className="container">
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p 
              className="hero-greeting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Hello, I'm
            </motion.p>
            
            <motion.h1 
              className="hero-name"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Mallepula Omprakash Goud
            </motion.h1>
            
            <motion.h2 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Computer Science & AIML Student
            </motion.h2>
            
            <motion.p 
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Self-motivated B.Tech CSE (AI & ML) student at SR University with a passion for learning. 
              Quick learner aiming for good placement and aspiring to build my own startup in the future.
            </motion.p>

            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <a 
                href={`${process.env.PUBLIC_URL}/Omprakash_resume.pdf`}
                download="Omprakash_Resume.pdf"
                className="btn primary"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <FaDownload /> Download Resume
              </a>
            </motion.div>

            <motion.div 
              className="hero-social"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <a href="https://github.com/Omprakash2057" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/mallepula-omprakash-goud/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="mailto:mallepulaomprakashgoud@gmail.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="image-container">
              <div className="profile-image">
                <img 
                  src={`${process.env.PUBLIC_URL}/omprakash-photo.jpg`}
                  alt="Omprakash Mallepula - Software Engineer" 
                  className="hero-profile-photo"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="scroll-arrow" onClick={() => scrollToSection('about')}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </motion.div>
    </section>
  );
});

export default Hero;
