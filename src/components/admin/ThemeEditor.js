import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaPalette, FaSave, FaUndo } from 'react-icons/fa';
import { SketchPicker } from 'react-color';
import { portfolioAPI } from '../../lib/supabase';
import toast from 'react-hot-toast';

const ThemeEditor = ({ data, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeColorPicker, setActiveColorPicker] = useState(null);
  const [colors, setColors] = useState({
    primary_color: data?.primary_color || '#667eea',
    secondary_color: data?.secondary_color || '#764ba2',
    accent_color: data?.accent_color || '#f093fb',
    background_color: data?.background_color || '#0f0f23'
  });

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: colors
  });

  const watchedColors = watch();

  const colorPresets = [
    {
      name: 'Default Blue',
      colors: {
        primary_color: '#667eea',
        secondary_color: '#764ba2',
        accent_color: '#f093fb',
        background_color: '#0f0f23'
      }
    },
    {
      name: 'Ocean Breeze',
      colors: {
        primary_color: '#00c6ff',
        secondary_color: '#0072ff',
        accent_color: '#40e0d0',
        background_color: '#0a1628'
      }
    },
    {
      name: 'Sunset Glow',
      colors: {
        primary_color: '#ff6b6b',
        secondary_color: '#ee5a24',
        accent_color: '#feca57',
        background_color: '#2d1b69'
      }
    },
    {
      name: 'Forest Green',
      colors: {
        primary_color: '#00d2d3',
        secondary_color: '#54a0ff',
        accent_color: '#5f27cd',
        background_color: '#1e3799'
      }
    },
    {
      name: 'Purple Dream',
      colors: {
        primary_color: '#a55eea',
        secondary_color: '#8854d0',
        accent_color: '#fd79a8',
        background_color: '#2d3436'
      }
    }
  ];

  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      await portfolioAPI.updatePortfolioData(formData);
      toast.success('Theme updated successfully!');
      onUpdate();
      
      // Apply theme to current page
      applyThemeToPage(formData);
    } catch (error) {
      toast.error('Failed to update theme');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyThemeToPage = (themeColors) => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', themeColors.primary_color);
    root.style.setProperty('--secondary-color', themeColors.secondary_color);
    root.style.setProperty('--accent-color', themeColors.accent_color);
    root.style.setProperty('--background-color', themeColors.background_color);
  };

  const handleColorChange = (colorKey, color) => {
    const newColors = { ...colors, [colorKey]: color.hex };
    setColors(newColors);
    setValue(colorKey, color.hex);
  };

  const applyPreset = (preset) => {
    setColors(preset.colors);
    Object.keys(preset.colors).forEach(key => {
      setValue(key, preset.colors[key]);
    });
    toast.success(`Applied ${preset.name} theme`);
  };

  const resetToDefault = () => {
    const defaultColors = {
      primary_color: '#667eea',
      secondary_color: '#764ba2',
      accent_color: '#f093fb',
      background_color: '#0f0f23'
    };
    setColors(defaultColors);
    Object.keys(defaultColors).forEach(key => {
      setValue(key, defaultColors[key]);
    });
    toast.success('Reset to default theme');
  };

  const colorFields = [
    { key: 'primary_color', label: 'Primary Color', description: 'Main brand color used for buttons and highlights' },
    { key: 'secondary_color', label: 'Secondary Color', description: 'Secondary brand color for gradients' },
    { key: 'accent_color', label: 'Accent Color', description: 'Accent color for special elements' },
    { key: 'background_color', label: 'Background Color', description: 'Main background color' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-header">
        <h3><FaPalette /> Theme Customization</h3>
        <div className="theme-actions">
          <motion.button
            type="button"
            onClick={resetToDefault}
            className="btn btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaUndo /> Reset to Default
          </motion.button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="theme-editor">
          <div className="color-presets">
            <h4>Quick Presets</h4>
            <div className="presets-grid">
              {colorPresets.map((preset, index) => (
                <motion.div
                  key={index}
                  className="preset-card"
                  onClick={() => applyPreset(preset)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="preset-colors">
                    <div 
                      className="color-dot" 
                      style={{ backgroundColor: preset.colors.primary_color }}
                    ></div>
                    <div 
                      className="color-dot" 
                      style={{ backgroundColor: preset.colors.secondary_color }}
                    ></div>
                    <div 
                      className="color-dot" 
                      style={{ backgroundColor: preset.colors.accent_color }}
                    ></div>
                  </div>
                  <span>{preset.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="color-customization">
            <h4>Custom Colors</h4>
            <div className="color-fields">
              {colorFields.map((field) => (
                <div key={field.key} className="color-field">
                  <div className="color-field-header">
                    <label>{field.label}</label>
                    <div 
                      className="color-preview"
                      style={{ backgroundColor: watchedColors[field.key] }}
                      onClick={() => setActiveColorPicker(
                        activeColorPicker === field.key ? null : field.key
                      )}
                    >
                      <span>{watchedColors[field.key]}</span>
                    </div>
                  </div>
                  <p className="color-description">{field.description}</p>
                  
                  <input
                    type="hidden"
                    {...register(field.key)}
                  />

                  {activeColorPicker === field.key && (
                    <div className="color-picker-popup">
                      <div 
                        className="color-picker-overlay"
                        onClick={() => setActiveColorPicker(null)}
                      ></div>
                      <div className="color-picker-container">
                        <SketchPicker
                          color={watchedColors[field.key]}
                          onChange={(color) => handleColorChange(field.key, color)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="theme-preview">
            <h4>Live Preview</h4>
            <div className="preview-container">
              <div 
                className="preview-card"
                style={{
                  background: `linear-gradient(135deg, ${watchedColors.primary_color} 0%, ${watchedColors.secondary_color} 100%)`,
                  color: 'white'
                }}
              >
                <h5>Sample Card</h5>
                <p>This is how your theme colors will look</p>
                <div 
                  className="preview-button"
                  style={{
                    backgroundColor: watchedColors.accent_color,
                    color: 'white'
                  }}
                >
                  Button
                </div>
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
            {isLoading ? 'Saving...' : 'Save Theme'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ThemeEditor;