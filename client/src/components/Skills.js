import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaJava, FaDatabase, FaCode, FaUser, FaBrain, FaPuzzlePiece, FaUsers
} from 'react-icons/fa';
import { 
  SiTensorflow
} from 'react-icons/si';
import './Skills.css';

const Skills = () => {
  const technicalSkills = [
  { name: "SQL", icon: <FaDatabase /> },
  { name: "Java", icon: <FaJava /> },
  { name: "Java with DSA", icon: <FaJava /> },
  { name: "Web Development", icon: <FaCode /> },
  { name: "AIML", icon: <SiTensorflow /> }
  ];

  const personalSkills = [
    { name: "Self-motivated", icon: <FaUser /> },
    { name: "Quick learner", icon: <FaBrain /> },
    { name: "Problem-solving mindset", icon: <FaPuzzlePiece /> },
    { name: "Team collaboration", icon: <FaUsers /> }
  ];

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          My Skills
        </motion.h2>

        <div className="skills-container">
          {/* Technical Skills Column */}
          <div className="skills-column">
            <motion.h3 
              className="skills-column-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Technical Skills
            </motion.h3>
            <div className="skills-grid">
              {technicalSkills.map((skill, skillIndex) => (
                <motion.div 
                  key={skillIndex}
                  className="skill-item"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: skillIndex * 0.1 
                  }}
                  whileHover={{ scale: 1.05 }}
                  viewport={{ once: true }}
                >
                  <div className="skill-header">
                    <div className="skill-icon">
                      {skill.icon}
                    </div>
                    <div className="skill-info">
                      <span className="skill-name">{skill.name === "Omprakash" ? "Omprakash Mallepula" : skill.name}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Personal Skills Column */}
          <div className="skills-column">
            <motion.h3 
              className="skills-column-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Personal Skills
            </motion.h3>
            <div className="skills-grid">
              {personalSkills.map((skill, skillIndex) => (
                <motion.div 
                  key={skillIndex}
                  className="skill-item"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: skillIndex * 0.1 + 0.3 
                  }}
                  whileHover={{ scale: 1.05 }}
                  viewport={{ once: true }}
                >
                  <div className="skill-header">
                    <div className="skill-icon">
                      {skill.icon}
                    </div>
                    <div className="skill-info">
                      <span className="skill-name">{skill.name === "Omprakash" ? "Omprakash Mallepula" : skill.name}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
