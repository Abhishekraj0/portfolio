import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaCogs, FaPlus, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { portfolioAPI } from '../../lib/supabase';
import toast from 'react-hot-toast';

const SkillsEditor = ({ onUpdate }) => {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const data = await portfolioAPI.getSkills();
      setSkills(data || []);
    } catch (error) {
      toast.error('Failed to load skills');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (formData) => {
    try {
      // Convert form data to skills array
      const skillsArray = [];
      
      Object.keys(formData).forEach(key => {
        if (key.startsWith('category_') && formData[key]) {
          const index = key.split('_')[1];
          const skillsKey = `skills_${index}`;
          const skillsValue = formData[skillsKey];
          
          if (skillsValue) {
            skillsArray.push({
              category: formData[key],
              skills: skillsValue.split(',').map(skill => skill.trim()).filter(skill => skill)
            });
          }
        }
      });

      await portfolioAPI.updateSkills(skillsArray);
      toast.success('Skills updated successfully!');
      
      reset();
      setShowForm(false);
      loadSkills();
      onUpdate();
    } catch (error) {
      toast.error('Failed to update skills');
      console.error(error);
    }
  };

  const handleEdit = () => {
    setShowForm(true);
    const formData = {};
    
    skills.forEach((skill, index) => {
      formData[`category_${index}`] = skill.category;
      formData[`skills_${index}`] = skill.skills.join(', ');
    });
    
    reset(formData);
  };

  const addSkillCategory = () => {
    setSkills([...skills, { category: '', skills: [] }]);
  };

  const removeSkillCategory = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner large"></div>
        <p>Loading skills...</p>
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
        <h3><FaCogs /> Technical Skills</h3>
        <motion.button
          className="btn btn-primary"
          onClick={handleEdit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Edit Skills
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
              <h4>Edit Skills</h4>
              <button type="button" onClick={() => setShowForm(false)} className="close-btn">
                <FaTimes />
              </button>
            </div>

            <div className="skills-form">
              {skills.map((skill, index) => (
                <div key={index} className="skill-category-form">
                  <div className="form-group">
                    <label>Category Name</label>
                    <div className="input-with-action">
                      <input
                        type="text"
                        {...register(`category_${index}`, { required: 'Category name is required' })}
                        placeholder="e.g., Programming Languages"
                      />
                      <button
                        type="button"
                        onClick={() => removeSkillCategory(index)}
                        className="btn-icon danger"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    {errors[`category_${index}`] && (
                      <span className="error-message">{errors[`category_${index}`].message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Skills (comma-separated)</label>
                    <textarea
                      {...register(`skills_${index}`, { required: 'Skills are required' })}
                      placeholder="Java, Python, JavaScript, TypeScript"
                      rows={2}
                    />
                    {errors[`skills_${index}`] && (
                      <span className="error-message">{errors[`skills_${index}`].message}</span>
                    )}
                  </div>
                </div>
              ))}

              <motion.button
                type="button"
                onClick={addSkillCategory}
                className="btn btn-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaPlus /> Add Category
              </motion.button>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">
                <FaTimes /> Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <FaSave /> Save Skills
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="skills-preview">
        {skills.length === 0 ? (
          <div className="empty-state">
            <FaCogs />
            <p>No skills added yet</p>
            <button onClick={handleEdit} className="btn btn-primary">
              <FaPlus /> Add Your Skills
            </button>
          </div>
        ) : (
          <div className="skills-grid">
            {skills.map((skillCategory, index) => (
              <motion.div
                key={index}
                className="skill-category-card glass-effect"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h4>{skillCategory.category}</h4>
                <div className="skills-list">
                  {skillCategory.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SkillsEditor;