import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {

  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

        <div className="about-content">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>B.Tech CSE (AI & ML) Student at SR University</h3>
            <p>
              <strong>Full Name:</strong> Mallepula Omprakash Goud<br/>
              <strong>Education:</strong> B.Tech in Computer Science & Engineering (AI & ML) at SR University<br/>
              <strong>Background:</strong> Schooling at Vishwa Vikas High School, Intermediate at SR Junior College
            </p>
            <p>
              <strong>Strengths:</strong> Self-motivated and quick learner with a passion for technology and innovation.<br/>
              <strong>Short-term Goal:</strong> Get placed in a good company to start my professional career.<br/>
              <strong>Long-term Goal:</strong> Build my own startup and create innovative solutions.<br/>
              <strong>Inspiration:</strong> Virat Kohli - inspired by his hard work, dedication, and never-give-up attitude.
            </p>
            
            <div className="about-stats">
              {/* Stats removed as requested */}
            </div>
          </motion.div>

          <motion.div 
            className="about-image"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="image-wrapper">
              <img 
                src={`${process.env.PUBLIC_URL}/omprakash-photo.jpg`}
                alt="Omprakash Mallepula - Software Engineer" 
                className="profile-photo"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
