import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaSave, FaUpload, FaUser } from 'react-icons/fa';
import { portfolioAPI } from '../../lib/supabase';
import toast from 'react-hot-toast';

const PersonalInfoEditor = ({ data, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: data || {}
  });

  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      await portfolioAPI.updatePortfolioData(formData);
      toast.success('Personal information updated successfully!');
      onUpdate();
    } catch (error) {
      toast.error('Failed to update personal information');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    setUploadingResume(true);
    try {
      const resumeUrl = await portfolioAPI.uploadFile(file);
      await portfolioAPI.updatePortfolioData({ resume_url: resumeUrl });
      toast.success('Resume uploaded successfully!');
      onUpdate();
    } catch (error) {
      toast.error('Failed to upload resume');
      console.error(error);
    } finally {
      setUploadingResume(false);
    }
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
      await portfolioAPI.updatePortfolioData({ profile_image_url: imageUrl });
      toast.success('Profile image uploaded successfully!');
      onUpdate();
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-section">
          <h3><FaUser /> Basic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                placeholder="Your full name"
              />
              {errors.name && <span className="error-message">{errors.name.message}</span>}
            </div>

            <div className="form-group">
              <label>Professional Title</label>
              <input
                type="text"
                {...register('title', { required: 'Title is required' })}
                placeholder="e.g., Java Backend Developer"
              />
              {errors.title && <span className="error-message">{errors.title.message}</span>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
                placeholder="your.email@example.com"
              />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                {...register('phone')}
                placeholder="+91 9507565009"
              />
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
              <label>LinkedIn URL</label>
              <input
                type="url"
                {...register('linkedin_url')}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div className="form-group">
              <label>GitHub URL</label>
              <input
                type="url"
                {...register('github_url')}
                placeholder="https://github.com/yourusername"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Professional Summary</h3>
          <div className="form-group">
            <label>Subtitle/Summary</label>
            <textarea
              {...register('subtitle')}
              placeholder="Brief professional summary that appears under your name"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>About Me</label>
            <textarea
              {...register('about_text')}
              placeholder="Detailed about section content"
              rows={6}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Education</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Degree</label>
              <input
                type="text"
                {...register('education_degree')}
                placeholder="Bachelor of Technology"
              />
            </div>

            <div className="form-group">
              <label>University</label>
              <input
                type="text"
                {...register('education_university')}
                placeholder="University Name"
              />
            </div>

            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                {...register('education_duration')}
                placeholder="September 2020 - July 2023"
              />
            </div>

            <div className="form-group">
              <label>GPA/Grade</label>
              <input
                type="text"
                {...register('education_gpa')}
                placeholder="8.3"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Statistics</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Daily Transactions</label>
              <input
                type="text"
                {...register('stats_transactions')}
                placeholder="1M+"
              />
            </div>

            <div className="form-group">
              <label>System Uptime</label>
              <input
                type="text"
                {...register('stats_uptime')}
                placeholder="99.9%"
              />
            </div>

            <div className="form-group">
              <label>Cycle Reduction</label>
              <input
                type="text"
                {...register('stats_reduction')}
                placeholder="40%"
              />
            </div>

            <div className="form-group">
              <label>Years Experience</label>
              <input
                type="text"
                {...register('stats_experience')}
                placeholder="2+"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>File Uploads</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Resume (PDF)</label>
              <div className="file-upload">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                  disabled={uploadingResume}
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="file-upload-label">
                  <FaUpload />
                  {uploadingResume ? 'Uploading...' : 'Upload Resume'}
                </label>
                {data?.resume_url && (
                  <a href={data.resume_url} target="_blank" rel="noopener noreferrer" className="file-link">
                    View Current Resume
                  </a>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Profile Image</label>
              <div className="file-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="file-upload-label">
                  <FaUpload />
                  {uploadingImage ? 'Uploading...' : 'Upload Image'}
                </label>
                {data?.profile_image_url && (
                  <img src={data.profile_image_url} alt="Profile" className="profile-preview" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <motion.button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaSave />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default PersonalInfoEditor;