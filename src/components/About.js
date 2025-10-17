import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaCode, FaServer, FaCloud, FaChartLine, FaUsers, FaCogs } from 'react-icons/fa';
import './About.css';

const About = ({ data }) => {
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
    { icon: FaChartLine, value: data?.stats_transactions || '1M+', label: 'Daily Transactions' },
    { icon: FaServer, value: data?.stats_uptime || '99.9%', label: 'System Uptime' },
    { icon: FaCogs, value: data?.stats_reduction || '40%', label: 'Cycle Reduction' },
    { icon: FaUsers, value: data?.stats_experience || '2+', label: 'Years Experience' }
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
                  {data?.about_text || `Java Backend Developer with 2+ years of enterprise software development experience. 
                  I specialize in building scalable backend systems using Spring Boot, microservices 
                  architecture, PostgreSQL, Redis, and cloud deployment on Azure and Docker.`}
                </p>
                <p>
                  <FaServer className="inline-icon" />
                  I have successfully architected and maintained systems processing over {data?.stats_transactions || '1M+'} daily 
                  transactions while achieving {data?.stats_uptime || '99.9%'} uptime. My experience includes reducing development 
                  cycles by {data?.stats_reduction || '40%'} through efficient system design and team leadership.
                </p>
                <p>
                  <FaCloud className="inline-icon" />
                  I'm passionate about API development, database optimization, and DevOps collaboration, 
                  with a strong background in building enterprise Integration Platform as a Service (iPaaS) 
                  applications and cloud deployment.
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
                  <h4>{data?.education_degree || 'Bachelor of Technology'}</h4>
                  <p className="university">{data?.education_university || 'I.K Gujral Punjab Technical University'}</p>
                  <div className="education-details">
                    <span className="duration">{data?.education_duration || 'September 2020 - July 2023'}</span>
                    <span className="gpa">GPA: {data?.education_gpa || '8.3'}</span>
                  </div>
                </div>
                <div className="education-visual">
                  <div className="gpa-circle">
                    <span>{data?.education_gpa || '8.3'}</span>
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