import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaLinkedin, FaGithub, FaDownload, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>

        <motion.div
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="contact-info glass-effect" variants={itemVariants}>
            <div className="contact-header">
              <FaPaperPlane className="contact-main-icon" />
              <h3>Let's Connect</h3>
            </div>
            <p>
              I'm always interested in discussing new opportunities, innovative projects,
              and collaborations in backend development and enterprise software solutions.
            </p>
            <div className="contact-details">
              <motion.div
                className="contact-item"
                whileHover={{ scale: 1.05, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <FaEnvelope className="contact-icon" />
                <div>
                  <h4>Email</h4>
                  <a href="mailto:abhishekraj88731@gmail.com">abhishekraj88731@gmail.com</a>
                </div>
              </motion.div>
              <motion.div
                className="contact-item"
                whileHover={{ scale: 1.05, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <FaPhone className="contact-icon" />
                <div>
                  <h4>Phone</h4>
                  <a href="tel:+919507565009">+91 9507565009</a>
                </div>
              </motion.div>
              <motion.div
                className="contact-item"
                whileHover={{ scale: 1.05, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <h4>Location</h4>
                  <span>Karnataka, India</span>
                </div>
              </motion.div>
            </div>
            <div className="social-links">
              <motion.a
                href="https://www.linkedin.com/in/abhishekraj0/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link linkedin"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.2 }}
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </motion.a>
              <motion.a
                href="https://github.com/abhishekraj0"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link github"
                whileHover={{ scale: 0.5, y: -1 }}
                whileTap={{ scale: 0.1 }}
              >
                <FaGithub />
                <span>GitHub</span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div className="resume-download glass-effect neon-glow" variants={itemVariants}>
            <div className="resume-header">
              <FaDownload className="resume-icon" />
              <h3>Download Resume</h3>
            </div>
            <p>Get a detailed overview of my experience, skills, and achievements.</p>
            <motion.a
              href="/AbhishekRaj_Resume.pdf"
              className="resume-btn"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload />
              <span>Download PDF Resume</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;