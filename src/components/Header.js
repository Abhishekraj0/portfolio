import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaDownload, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCode, FaServer, FaCloud } from 'react-icons/fa';
import './Header.css';

const Header = ({ data }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <header id="home" className="header">
      <div className="header-content">
        <motion.div 
          className="hero-text"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="profile-image" variants={itemVariants}>
            <div className="image-placeholder">
              {data?.profile_image_url ? (
                <img 
                  src={data.profile_image_url} 
                  alt={data.name || 'Profile'} 
                  className="profile-photo"
                />
              ) : (
                <FaCode className="profile-icon" />
              )}
            </div>
            <div className="floating-icons">
              <div className="floating-icon"><FaServer /></div>
              <div className="floating-icon"><FaCloud /></div>
              <div className="floating-icon"><FaCode /></div>
            </div>
          </motion.div>

          <motion.h1 className="name" variants={itemVariants}>
            {data?.name || 'Abhishek Raj'}
          </motion.h1>
          
          <motion.h2 className="title" variants={itemVariants}>
            {data?.title || 'Java Backend Developer'}
          </motion.h2>
          
          <motion.p className="subtitle" variants={itemVariants}>
            {data?.subtitle || '2+ years of enterprise software development experience specializing in Spring Boot, microservices architecture, and cloud deployment'}
          </motion.p>
          
          <motion.div className="contact-info" variants={itemVariants}>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>{data?.email || 'abhishekraj88731@gmail.com'}</span>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <span>{data?.phone || '+919507565009'}</span>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <span>{data?.location || 'Karnataka, India'}</span>
            </div>
          </motion.div>
          
          <motion.div className="social-links" variants={itemVariants}>
            <motion.a 
              href={data?.linkedin_url || 'https://www.linkedin.com/in/abhishekraj0/'} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="social-link linkedin"
            >
              <FaLinkedin />
              <span>LinkedIn</span>
            </motion.a>
            <motion.a 
              href={data?.github_url || 'https://github.com/abhishekraj0'} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="social-link github"
            >
              <FaGithub />
              <span>GitHub</span>
            </motion.a>
            <motion.a 
              href={data?.resume_url ? `${data.resume_url}?t=${Date.now()}` : '/AbhishekRaj_Resume.pdf'} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="social-link resume"
            >
              <FaDownload />
              <span>Resume</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="scroll-indicator">
        <motion.div 
          className="scroll-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ↓
        </motion.div>
      </div>
    </header>
  );
};

export default Header;