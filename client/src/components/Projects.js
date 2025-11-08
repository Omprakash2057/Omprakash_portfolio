import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const [projects] = useState([
    {
      id: 1,
      title: "Ensemble ANN Models for Air Pollution Prediction (ML Project)",
      description: "A comprehensive machine learning project using ensemble artificial neural network models to predict air pollution levels. The project includes data preprocessing, feature engineering, multiple ANN model training, ensemble methods implementation, and prediction accuracy analysis with visualization of results.",
      image: "/api/placeholder/400/250",
      technologies: ["Python", "TensorFlow", "Keras", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
      github: "https://github.com/Omprakash2057/Ensemble-ANN-Models-for-Air-Pollution-Prediction",
      live: null,
      views: 156,
      likes: 24,
      status: "completed"
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.status === filter));
    }
  }, [filter, projects]);

  const handleProjectView = (projectId) => {
    // Project view tracking for static deployment
    console.log('Project viewed:', projectId);
  };

  // handleProjectLike function removed as requested

  const filterOptions = [
    { value: 'all', label: 'All Projects' },
    { value: 'completed', label: 'Completed' },
    { value: 'in-progress', label: 'In Progress' }
  ];

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          My Projects
        </motion.h2>

        <motion.div 
          className="project-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {filterOptions.map((option) => (
            <button
              key={option.value}
              className={`filter-btn ${filter === option.value ? 'active' : ''}`}
              onClick={() => setFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
        </motion.div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
            >
              <div className="project-image">
                <div className="image-placeholder">
                  <FaCode />
                  <span>Project Image</span>
                </div>
                <div className="project-overlay">
                  <div className="project-actions">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="action-btn"
                        onClick={() => handleProjectView(project.id)}
                      >
                        <FaGithub />
                      </a>
                    )}
                    {project.live && (
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="action-btn"
                        onClick={() => handleProjectView(project.id)}
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                </div>
                <div className={`project-status ${project.status}`}>
                  {project.status === 'completed' ? 'Completed' : 'In Progress'}
                </div>
              </div>

              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                {/* Project stats removed as requested */}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="projects-footer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>Want to see more projects? Check out my GitHub!</p>
          <a 
            href="https://github.com/Omprakash2057" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn"
          >
            <FaGithub /> View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
