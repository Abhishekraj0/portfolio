import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaCode, FaServer, FaDatabase, FaCloud, FaChartLine, FaUsers, FaCogs } from 'react-icons/fa';
import './About.css';

const About = () => {
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

  const stats = [
    { icon: FaChartLine, value: '1M+', label: 'Daily Transactions' },
    { icon: FaServer, value: '99.9%', label: 'System Uptime' },
    { icon: FaCogs, value: '40%', label: 'Cycle Reduction' },
    { icon: FaUsers, value: '2+', label: 'Years Experience' }
  ];

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        
        <motion.div 
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="about-main">
            <motion.div className="about-text glass-effect" variants={itemVariants}>
              <div className="text-content">
                <p>
                  <FaCode className="inline-icon" />
                  Java Backend Developer with 2+ years of enterprise software development experience. 
                  I specialize in building scalable backend systems using Spring Boot, microservices 
                  architecture, PostgreSQL, Redis, and cloud deployment on Azure and Docker.
                </p>
                <p>
                  <FaServer className="inline-icon" />
                  I have successfully architected and maintained systems processing over 1M daily 
                  transactions while achieving 99.9% uptime. My experience includes reducing development 
                  cycles by 40% through efficient system design and team leadership.
                </p>
                <p>
                  <FaDatabase className="inline-icon" />
                  I'm passionate about API development, database optimization, and DevOps collaboration, 
                  with a strong background in building enterprise Integration Platform as a Service (iPaaS) 
                  applications.
                </p>
              </div>
            </motion.div>

            <motion.div className="stats-grid" variants={itemVariants}>
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="stat-card glass-effect"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <stat.icon className="stat-icon" />
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div className="education-section" variants={itemVariants}>
            <div className="education glass-effect neon-glow">
              <div className="education-header">
                <FaGraduationCap className="education-icon" />
                <h3>Education</h3>
              </div>
              <div className="education-item">
                <div className="degree-info">
                  <h4>Bachelor of Technology</h4>
                  <p className="university">I.K Gujral Punjab Technical University</p>
                  <div className="education-details">
                    <span className="duration">September 2020 - July 2023</span>
                    <span className="gpa">GPA: 8.3</span>
                  </div>
                </div>
                <div className="education-visual">
                  <div className="gpa-circle">
                    <span>8.3</span>
                    <small>GPA</small>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;