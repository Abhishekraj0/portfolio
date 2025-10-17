import { useState, useEffect } from 'react';
import { portfolioAPI } from '../lib/supabase';

export const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Load all data in parallel
      const [portfolioResult, experiencesResult, projectsResult, skillsResult] = await Promise.allSettled([
        portfolioAPI.getPortfolioData(),
        portfolioAPI.getExperiences(),
        portfolioAPI.getProjects(),
        portfolioAPI.getSkills()
      ]);

      // Handle portfolio data
      if (portfolioResult.status === 'fulfilled') {
        setPortfolioData(portfolioResult.value);
      } else {
        console.warn('Failed to load portfolio data:', portfolioResult.reason);
        // Set default data if database fails
        setPortfolioData({
          name: 'Abhishek Raj',
          title: 'Java Backend Developer',
          subtitle: '2+ years of enterprise software development experience specializing in Spring Boot, microservices architecture, and cloud deployment',
          email: 'abhishekraj88731@gmail.com',
          phone: '+919507565009',
          location: 'Karnataka, India',
          linkedin_url: 'https://www.linkedin.com/in/abhishekraj0/',
          github_url: 'https://github.com/abhishekraj0',
          primary_color: '#667eea',
          secondary_color: '#764ba2',
          accent_color: '#f093fb',
          background_color: '#0f0f23'
        });
      }

      // Handle experiences
      if (experiencesResult.status === 'fulfilled') {
        setExperiences(experiencesResult.value || []);
      } else {
        console.warn('Failed to load experiences:', experiencesResult.reason);
        setExperiences([]);
      }

      // Handle projects
      if (projectsResult.status === 'fulfilled') {
        setProjects(projectsResult.value || []);
      } else {
        console.warn('Failed to load projects:', projectsResult.reason);
        setProjects([]);
      }

      // Handle skills
      if (skillsResult.status === 'fulfilled') {
        setSkills(skillsResult.value || []);
      } else {
        console.warn('Failed to load skills:', skillsResult.reason);
        setSkills([]);
      }

    } catch (err) {
      console.error('Error loading portfolio data:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    console.log('Refreshing portfolio data...');
    loadAllData();
  };

  return {
    portfolioData,
    experiences,
    projects,
    skills,
    isLoading,
    error,
    refreshData
  };
};