import React from 'react';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      title: "Software Engineer",
      company: "iVoyant",
      location: "Bengaluru, India",
      period: "July 2023 - Present",
      achievements: [
        "Architected and developed backend systems for PlatformNX, an enterprise Integration Platform as a Service (iPaaS) application enabling complex data flow integration across organizations",
        "Built and maintained microservices architecture supporting no-code/low-code workflow builder, reducing development time-to-market from weeks to days",
        "Implemented scalable backend engine components using Spring Boot, Docker, PostgreSQL, and Redis for structured data flows and process automation",
        "Collaborated with DevOps team to deploy and maintain cloud infrastructure on Azure, ensuring optimal performance and 99.9% uptime",
        "Developed reusable component libraries that enhanced team collaboration and reduced development cycle time by 40%",
        "Utilized OpenTelemetry for comprehensive application tracing and monitoring, improving system observability and debugging efficiency",
        "Successfully delivered backend systems supporting enterprise-wide data integration workflows",
        "Implemented efficient coding practices resulting in 30% improvement in system stability and reduced error rates",
        "Led code reviews and mentored junior developers, enhancing overall code quality across the team",
        "Met 100% of project deadlines while maintaining high-quality deliverables"
      ]
    },
    {
      title: "Software Engineer Intern",
      company: "iVoyant",
      location: "Bengaluru, India", 
      period: "December 2022 - June 2023",
      achievements: [
        "Contributed to product development as Backend Intern, focusing on Spring Boot application optimization",
        "Integrated CompletableFuture for asynchronous processing, improving application response times by 25%",
        "Implemented OpenTelemetry monitoring features for enhanced application observability",
        "Configured Spring Security for robust authentication and authorization mechanisms",
        "Deployed serverless functions on Azure Functions and AWS Lambda, gaining hands-on cloud deployment experience",
        "Assisted in troubleshooting and resolving technical issues, ensuring uninterrupted system operations"
      ]
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2 className="section-title">Professional Experience</h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>{exp.title}</h3>
                <h4>{exp.company}</h4>
                <div className="job-details">
                  <span className="location">{exp.location}</span>
                  <span className="period">{exp.period}</span>
                </div>
                <ul className="achievements">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;