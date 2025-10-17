import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaBriefcase, FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { portfolioAPI } from '../../lib/supabase';
import toast from 'react-hot-toast';

const ExperienceEditor = ({ onUpdate }) => {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const data = await portfolioAPI.getExperiences();
      setExperiences(data || []);
    } catch (error) {
      toast.error('Failed to load experiences');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (formData) => {
    try {
      // Convert comma-separated strings to arrays
      const processedData = {
        ...formData,
        achievements: formData.achievements ? formData.achievements.split('\n').filter(item => item.trim()) : [],
        technologies: formData.technologies ? formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech) : [],
        start_date: formData.start_date,
        end_date: formData.is_current ? null : formData.end_date,
        is_current: formData.is_current || false
      };

      if (editingId) {
        processedData.id = editingId;
      }

      await portfolioAPI.upsertExperience(processedData);
      toast.success(editingId ? 'Experience updated!' : 'Experience added!');
      
      reset();
      setEditingId(null);
      setShowForm(false);
      loadExperiences();
      onUpdate();
    } catch (error) {
      toast.error('Failed to save experience');
      console.error(error);
    }
  };

  const handleEdit = (experience) => {
    setEditingId(experience.id);
    setShowForm(true);
    reset({
      ...experience,
      achievements: experience.achievements?.join('\n') || '',
      technologies: experience.technologies?.join(', ') || '',
      start_date: experience.start_date,
      end_date: experience.end_date || '',
      is_current: experience.is_current || false
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return;
    
    try {
      await portfolioAPI.deleteExperience(id);
      toast.success('Experience deleted!');
      loadExperiences();
      onUpdate();
    } catch (error) {
      toast.error('Failed to delete experience');
      console.error(error);
    }
  };

  const handleCancel = () => {
    reset();
    setEditingId(null);
    setShowForm(false);
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner large"></div>
        <p>Loading experiences...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-header">
        <h3><FaBriefcase /> Work Experience</h3>
        <motion.button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaPlus /> Add Experience
        </motion.button>
      </div>

      {showForm && (
        <motion.div
          className="form-modal glass-effect"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-header">
              <h4>{editingId ? 'Edit Experience' : 'Add New Experience'}</h4>
              <button type="button" onClick={handleCancel} className="close-btn">
                <FaTimes />
              </button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Job Title *</label>
                <input
                  type="text"
                  {...register('title', { required: 'Title is required' })}
                  placeholder="Software Engineer"
                />
                {errors.title && <span className="error-message">{errors.title.message}</span>}
              </div>

              <div className="form-group">
                <label>Company *</label>
                <input
                  type="text"
                  {...register('company', { required: 'Company is required' })}
                  placeholder="Company Name"
                />
                {errors.company && <span className="error-message">{errors.company.message}</span>}
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  {...register('location')}
                  placeholder="City, Country"
                />
              </div>

              <div className="form-group">
                <label>Start Date *</label>
                <input
                  type="date"
                  {...register('start_date', { required: 'Start date is required' })}
                />
                {errors.start_date && <span className="error-message">{errors.start_date.message}</span>}
              </div>

              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  {...register('end_date')}
                  disabled={register('is_current').value}
                />
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    {...register('is_current')}
                  />
                  Currently working here
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                {...register('description')}
                placeholder="Brief description of your role"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Key Achievements (one per line)</label>
              <textarea
                {...register('achievements')}
                placeholder="• Achievement 1&#10;• Achievement 2&#10;• Achievement 3"
                rows={6}
              />
            </div>

            <div className="form-group">
              <label>Technologies (comma-separated)</label>
              <input
                type="text"
                {...register('technologies')}
                placeholder="Java, Spring Boot, PostgreSQL, Docker"
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={handleCancel} className="btn btn-secondary">
                <FaTimes /> Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <FaSave /> {editingId ? 'Update' : 'Add'} Experience
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="experiences-list">
        {experiences.length === 0 ? (
          <div className="empty-state">
            <FaBriefcase />
            <p>No experiences added yet</p>
            <button onClick={() => setShowForm(true)} className="btn btn-primary">
              <FaPlus /> Add Your First Experience
            </button>
          </div>
        ) : (
          experiences.map((experience) => (
            <motion.div
              key={experience.id}
              className="experience-card glass-effect"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="experience-header">
                <div>
                  <h4>{experience.title}</h4>
                  <p className="company">{experience.company}</p>
                  <p className="duration">
                    {new Date(experience.start_date).toLocaleDateString()} - 
                    {experience.is_current ? ' Present' : new Date(experience.end_date).toLocaleDateString()}
                  </p>
                  {experience.location && <p className="location">{experience.location}</p>}
                </div>
                <div className="experience-actions">
                  <button onClick={() => handleEdit(experience)} className="btn-icon">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(experience.id)} className="btn-icon danger">
                    <FaTrash />
                  </button>
                </div>
              </div>
              
              {experience.description && (
                <p className="description">{experience.description}</p>
              )}
              
              {experience.achievements && experience.achievements.length > 0 && (
                <div className="achievements">
                  <strong>Key Achievements:</strong>
                  <ul>
                    {experience.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {experience.technologies && experience.technologies.length > 0 && (
                <div className="technologies">
                  <strong>Technologies:</strong>
                  <div className="tech-tags">
                    {experience.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default ExperienceEditor;