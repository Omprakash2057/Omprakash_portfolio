import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    // Simulate async submit
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mallepula-omprakash-goud/",
      color: "#0077b5"
    },
    {
      icon: <FaGithub />,
      name: "GitHub",
      url: "https://github.com/Omprakash2057",
      color: "#333"
    },
    {
      icon: <FaTwitter />,
      name: "Twitter",
      url: "https://twitter.com/omprakash_goud",
      color: "#1da1f2"
    }
  ];

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.h2>
                        <div className="contact-content">
                          <motion.div 
                            className="contact-info"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                          >
                            <h3>Let's work together!</h3>
                            <p>
                              I'm a passionate B.Tech CSE (AI & ML) student from SR University, always excited to work on innovative projects 
                              and collaborate with amazing people. Whether you have a machine learning project in mind, want to discuss 
                              internship opportunities, or just want to connect, I'd love to hear from you! 
                              Feel free to reach out via email at mallepulaomprakashgoud@gmail.com or call me at +91 9441373329.
                            </p>
                            <div className="contact-details">
                              {/* Contact info block removed as requested */}
                            </div>
                            <div className="social-links">
                              <h4>Follow me on:</h4>
                              <div className="social-icons">
                                {socialLinks.map((social, index) => (
                                  <motion.a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    style={{ '--social-color': social.color }}
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                    viewport={{ once: true }}
                                  >
                                    {social.icon}
                                    <span>{social.name}</span>
                                  </motion.a>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                          <motion.div 
                            className="contact-form"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                          >
                            <form onSubmit={handleSubmit}>
                              <div className="form-row">
                                <div className="form-group">
                                  <label htmlFor="name">Name</label>
                                  <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Name"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="email">Email</label>
                                  <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your.email@example.com"
                                  />
                                </div>
                              </div>
                              <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                  type="text"
                                  id="subject"
                                  name="subject"
                                  value={formData.subject}
                                  onChange={handleChange}
                                  required
                                  placeholder="What's this about?"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                  id="message"
                                  name="message"
                                  value={formData.message}
                                  onChange={handleChange}
                                  required
                                  rows="6"
                                  placeholder="Tell me about your project or just say hello!"
                                />
                              </div>
                              <motion.button 
                                type="submit" 
                                className={`btn submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                disabled={isSubmitting}
                                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                              >
                                {isSubmitting ? (
                                  <>
                                    <div className="spinner"></div>
                                    Sending...
                                  </>
                                ) : (
                                  'Send Message'
                                )}
                              </motion.button>
                              {submitStatus === 'success' && (
                                <motion.div 
                                  className="submit-message success"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                >
                                  Thank you! Your message has been sent successfully.
                                </motion.div>
                              )}
                              {submitStatus === 'error' && (
                                <motion.div 
                                  className="submit-message error"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                >
                                  Sorry, there was an error sending your message. Please try again.
                                </motion.div>
                              )}
                            </form>
                          </motion.div>
                        </div>
                      </div>
                    </section>
                  );
};

export default Contact;
