import React from 'react';
import './Skills.css';

const Skills = ({ data }) => {
  const skillCategories = data && data.length > 0 ? data.map(skill => ({
    title: skill.category,
    skills: skill.skills
  })) : [];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          {skillCategories.length === 0 ? (
            <div className="no-data">
              <p>No skills data available. Please add your technical skills in the admin panel.</p>
            </div>
          ) : (
            skillCategories.map((category, index) => (
              <div key={index} className="skill-category">
                <h3>{category.title}</h3>
                <div className="skills-list">
                  {category.skills.map((skill, i) => (
                    <span key={i} className="skill-item">{skill}</span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;