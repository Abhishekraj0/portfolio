import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaBriefcase, FaProjectDiagram, FaCogs, FaPalette, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { portfolioAPI } from '../../lib/supabase';
import toast from 'react-hot-toast';
import PersonalInfoEditor from './PersonalInfoEditor';
import ExperienceEditor from './ExperienceEditor';
import ProjectEditor from './ProjectEditor';
import SkillsEditor from './SkillsEditor';
import ThemeEditor from './ThemeEditor';
import './AdminDashboard.css';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [portfolioData, setPortfolioData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: FaUser },
    { id: 'experience', label: 'Experience', icon: FaBriefcase },
    { id: 'projects', label: 'Projects', icon: FaProjectDiagram },
    { id: 'skills', label: 'Skills', icon: FaCogs },
    { id: 'theme', label: 'Theme', icon: FaPalette }
  ];

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      const data = await portfolioAPI.getPortfolioData();
      setPortfolioData(data);
    } catch (error) {
      toast.error('Failed to load portfolio data');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await portfolioAPI.signOut();
      toast.success('Logged out successfully');
      onLogout();
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const openPortfolio = () => {
    window.open('/', '_blank');
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner large"></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar glass-effect">
        <div className="sidebar-header">
          <h2>Portfolio Admin</h2>
          <p>Content Management</p>
        </div>

        <nav className="sidebar-nav">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <motion.button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent />
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <motion.button
            className="nav-item"
            onClick={openPortfolio}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHome />
            <span>View Portfolio</span>
          </motion.button>
          
          <motion.button
            className="nav-item logout"
            onClick={handleLogout}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </motion.button>
        </div>
      </div>

      <div className="admin-content">
        <div className="content-header">
          <h1>{tabs.find(tab => tab.id === activeTab)?.label}</h1>
          <p>Manage your portfolio content and settings</p>
        </div>

        <div className="content-body">
          {activeTab === 'personal' && (
            <PersonalInfoEditor 
              data={portfolioData} 
              onUpdate={loadPortfolioData} 
            />
          )}
          {activeTab === 'experience' && (
            <ExperienceEditor onUpdate={loadPortfolioData} />
          )}
          {activeTab === 'projects' && (
            <ProjectEditor onUpdate={loadPortfolioData} />
          )}
          {activeTab === 'skills' && (
            <SkillsEditor onUpdate={loadPortfolioData} />
          )}
          {activeTab === 'theme' && (
            <ThemeEditor 
              data={portfolioData} 
              onUpdate={loadPortfolioData} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;