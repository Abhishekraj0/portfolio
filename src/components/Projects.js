import React from 'react';
import './Projects.css';

const Projects = ({ data }) => {
  const projects = data || [];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.length === 0 ? (
            <div className="no-data">
              <p>No projects available. Please add your projects in the admin panel.</p>
            </div>
          ) : (
            projects.map((project, index) => (
              <div key={project.id || index} className="project-card">
                {project.image_url && (
                  <div className="project-image">
                    <img src={project.image_url} alt={project.title} />
                    {project.is_featured && <span className="featured-badge">Featured</span>}
                  </div>
                )}
                <div className="project-content">
                  <h3>{project.title}</h3>
                  {project.description && (
                    <p className="project-description">{project.description}</p>
                  )}
                  {project.features && project.features.length > 0 && (
                    <div className="project-features">
                      <h4>Key Features:</h4>
                      <ul>
                        {project.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="project-tech">
                      <h4>Technologies:</h4>
                      <div className="tech-tags">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {(project.github_url || project.live_url) && (
                    <div className="project-links">
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-link">
                          GitHub
                        </a>
                      )}
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="project-link">
                          Live Demo
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;