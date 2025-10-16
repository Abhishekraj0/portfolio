import React from 'react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Java", "Python", "JavaScript"]
    },
    {
      title: "Frameworks & Libraries",
      skills: ["Spring Boot", "Spring MVC", "Spring Security", "React.js", "Next.js"]
    },
    {
      title: "Databases",
      skills: ["PostgreSQL", "Redis", "Cassandra"]
    },
    {
      title: "Tools & Platforms",
      skills: ["Docker", "Kubernetes", "Azure", "AWS Lambda", "Postman", "OpenTelemetry", "ElasticSearch"]
    },
    {
      title: "APIs & Integration",
      skills: ["REST APIs", "GraphQL APIs", "WebSocket", "Kafka"]
    },
    {
      title: "Architecture & Concepts",
      skills: ["Microservices", "Enterprise Integration", "Cloud Deployment", "DevOps", "System Design"]
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3>{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, i) => (
                  <span key={i} className="skill-item">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;