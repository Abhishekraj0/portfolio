import React, { useEffect } from 'react';
import Header from './Header';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';
import Navbar from './Navbar';
import ParticleBackground from './ParticleBackground';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Portfolio = () => {
  const { portfolioData, experiences, projects, skills, isLoading, refreshData } = usePortfolioData();

  // Apply theme colors when data loads
  useEffect(() => {
    if (portfolioData) {
      const root = document.documentElement;
      root.style.setProperty('--primary-color', portfolioData.primary_color || '#667eea');
      root.style.setProperty('--secondary-color', portfolioData.secondary_color || '#764ba2');
      root.style.setProperty('--accent-color', portfolioData.accent_color || '#f093fb');
      root.style.setProperty('--background-color', portfolioData.background_color || '#0f0f23');
    }
  }, [portfolioData]);

  // Auto-refresh data every 30 seconds to catch updates
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshData]);

  // Listen for focus events to refresh data when user returns to tab
  useEffect(() => {
    const handleFocus = () => {
      refreshData();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refreshData]);

  if (isLoading) {
    return (
      <div className="portfolio-loading">
        <div className="loading-spinner large"></div>
        <p>Loading portfolio...</p>
      </div>
    );
  }

  return (
    <>
      <ParticleBackground />
      <Navbar />
      <Header data={portfolioData} key={portfolioData?.updated_at} />
      <About data={portfolioData} key={`about-${portfolioData?.updated_at}`} />
      <Experience data={experiences} key={`exp-${experiences?.length}`} />
      <Projects data={projects} key={`proj-${projects?.length}`} />
      <Skills data={skills} key={`skills-${skills?.length}`} />
      <Contact data={portfolioData} key={`contact-${portfolioData?.updated_at}`} />
    </>
  );
};

export default Portfolio;