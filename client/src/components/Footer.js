
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaDownload } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const socialLinks = [
    {
      icon: <FaGithub />,
      url: "https://github.com/Omprakash2057",
      name: "GitHub",
      followers: "150+",
      description: "Repositories"
    },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/mallepula-omprakash-goud/",
      name: "LinkedIn",
      followers: "500+",
      description: "Connections"
    },
    {
      icon: <FaTwitter />,
      url: "mailto:mallepulaomprakashgoud@gmail.com",
      name: "Email",
      followers: "Contact",
      description: "Me"
    }
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId.replace('#', ''));
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3>Omprakash Mallepula</h3>
            <p>
              A passionate full-stack developer creating amazing web experiences 
              with modern technologies and clean code.
            </p>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  title={social.name}
                >
                  <div className="social-card-icon">
                    {social.icon}
                  </div>
                  <h4 className="social-card-name">{social.name}</h4>
                  <p className="social-card-followers">{social.followers}</p>
                  <div className="social-card-link">
                    <span className="social-card-description">{social.description}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4>Resume</h4>
            <motion.a
              href="/Omprakash_resume.pdf"
              download="Omprakash_Resume.pdf"
              className="resume-download-btn"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload /> Download Resume
            </motion.a>
            <p className="resume-note">
              Get my latest resume with detailed experience and skills
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
