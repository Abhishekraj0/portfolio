import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: "ErrorNex - Error Management & Monitoring Platform",
      description: "Designed and developed a comprehensive error management tool for streamlined error handling processes with real-time monitoring capabilities.",
      features: [
        "Built real-time monitoring dashboard improving debugging efficiency by 50%",
        "Comprehensive error tracking and management system",
        "Real-time alerts and notifications",
        "Advanced analytics and reporting"
      ],
      technologies: ["Java", "Spring Boot", "PostgreSQL", "React", "WebSocket", "Docker"]
    },
    {
      title: "PlatformNX - Enterprise iPaaS",
      description: "Enterprise Integration Platform as a Service enabling complex data flow integration across organizations with no-code/low-code workflow builder.",
      features: [
        "Microservices architecture supporting workflow automation",
        "No-code/low-code workflow builder interface",
        "Enterprise-wide data integration capabilities",
        "Scalable backend engine for process automation"
      ],
      technologies: ["Spring Boot", "Docker", "PostgreSQL", "Redis", "Azure", "OpenTelemetry"]
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-features">
                <h4>Key Features:</h4>
                <ul>
                  {project.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="project-tech">
                <h4>Technologies:</h4>
                <div className="tech-tags">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;