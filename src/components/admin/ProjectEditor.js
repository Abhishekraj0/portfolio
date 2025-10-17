import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaProjectDiagram, FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaUpload, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { portfolioAPI } from '../../lib/supabase';
import toast from 'react-hot-toast';

const ProjectEditor = ({ onUpdate }) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await portfolioAPI.getProjects();
      setProjects(data || []);
    } catch (error) {
      toast.error('Failed to load projects');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const processedData = {
        ...formData,
        features: formData.features ? formData.features.split('\n').filter(item => item.trim()) : [],
        technologies: formData.technologies ? formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech) : [],
        is_featured: formData.is_featured || false
      };

      if (editingId) {
        processedData.id = editingId;
      }

      await portfolioAPI.upsertProject(processedData);
      toast.success(editingId ? 'Project updated!' : 'Project added!');
      
      reset();
      setEditingId(null);
      setShowForm(false);
      loadProjects();
      onUpdate();
    } catch (error) {
      toast.error('Failed to save project');
      console.error(error);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setShowForm(true);
    reset({
      ...project,
      features: project.features?.join('\n') || '',
      technologies: project.technologies?.join(', ') || '',
      is_featured: project.is_featured || false
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await portfolioAPI.deleteProject(id);
      toast.success('Project deleted!');
      loadProjects();
      onUpdate();
    } catch (error) {
      toast.error('Failed to delete project');
      console.error(error);
    }
  };

  const handleCancel = () => {
    reset();
    setEditingId(null);
    setShowForm(false);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setUploadingImage(true);
    try {
      const imageUrl = await portfolioAPI.uploadFile(file);
      setValue('image_url', imageUrl);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
    } finally {
      setUploadingImage(false);
    }
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner large"></div>
        <p>Loading projects...</p>
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
        <h3><FaProjectDiagram /> Projects Portfolio</h3>
        <motion.button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaPlus /> Add Project
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
              <h4>{editingId ? 'Edit Project' : 'Add New Project'}</h4>
              <button type="button" onClick={handleCancel} className="close-btn">
                <FaTimes />
              </button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Project Title *</label>
                <input
                  type="text"
                  {...register('title', { required: 'Title is required' })}
                  placeholder="Project Name"
                />
                {errors.title && <span className="error-message">{errors.title.message}</span>}
              </div>

              <div className="form-group">
                <label>GitHub URL</label>
                <input
                  type="url"
                  {...register('github_url')}
                  placeholder="https://github.com/username/project"
                />
              </div>

              <div className="form-group">
                <label>Live Demo URL</label>
                <input
                  type="url"
                  {...register('live_url')}
                  placeholder="https://project-demo.com"
                />
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    {...register('is_featured')}
                  />
                  Featured Project
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                {...register('description')}
                placeholder="Brief description of your project"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Key Features (one per line)</label>
              <textarea
                {...register('features')}
                placeholder="• Feature 1&#10;• Feature 2&#10;• Feature 3"
                rows={5}
              />
            </div>

            <div className="form-group">
              <label>Technologies (comma-separated)</label>
              <input
                type="text"
                {...register('technologies')}
                placeholder="React, Node.js, MongoDB, Docker"
              />
            </div>

            <div className="form-group">
              <label>Project Image</label>
              <div className="file-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  id="project-image-upload"
                />
                <label htmlFor="project-image-upload" className="file-upload-label">
                  <FaUpload />
                  {uploadingImage ? 'Uploading...' : 'Upload Image'}
                </label>
                <input
                  type="url"
                  {...register('image_url')}
                  placeholder="Or paste image URL"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={handleCancel} className="btn btn-secondary">
                <FaTimes /> Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <FaSave /> {editingId ? 'Update' : 'Add'} Project
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="projects-grid">
        {projects.length === 0 ? (
          <div className="empty-state">
            <FaProjectDiagram />
            <p>No projects added yet</p>
            <button onClick={() => setShowForm(true)} className="btn btn-primary">
              <FaPlus /> Add Your First Project
            </button>
          </div>
        ) : (
          projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card glass-effect"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {project.image_url && (
                <div className="project-image">
                  <img src={project.image_url} alt={project.title} />
                  {project.is_featured && <span className="featured-badge">Featured</span>}
                </div>
              )}
              
              <div className="project-content">
                <div className="project-header">
                  <h4>{project.title}</h4>
                  <div className="project-actions">
                    <button onClick={() => handleEdit(project)} className="btn-icon">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="btn-icon danger">
                      <FaTrash />
                    </button>
                  </div>
                </div>
                
                {project.description && (
                  <p className="description">{project.description}</p>
                )}
                
                {project.features && project.features.length > 0 && (
                  <div className="features">
                    <strong>Key Features:</strong>
                    <ul>
                      {project.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {project.technologies && project.technologies.length > 0 && (
                  <div className="technologies">
                    <div className="tech-tags">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="project-links">
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-link">
                      <FaGithub /> GitHub
                    </a>
                  )}
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="project-link">
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default ProjectEditor;