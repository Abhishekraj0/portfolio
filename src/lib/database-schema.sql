-- Portfolio Configuration Table
CREATE TABLE portfolio_config (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL DEFAULT 'Abhishek Raj',
  title VARCHAR(200) NOT NULL DEFAULT 'Java Backend Developer',
  subtitle TEXT DEFAULT '2+ years of enterprise software development experience specializing in Spring Boot, microservices architecture, and cloud deployment',
  email VARCHAR(100) DEFAULT 'abhishekraj88731@gmail.com',
  phone VARCHAR(20) DEFAULT '+919507565009',
  location VARCHAR(100) DEFAULT 'Karnataka, India',
  linkedin_url VARCHAR(200) DEFAULT 'https://www.linkedin.com/in/abhishekraj0/',
  github_url VARCHAR(200) DEFAULT 'https://github.com/abhishekraj0',
  resume_url VARCHAR(500),
  profile_image_url VARCHAR(500),
  about_text TEXT,
  primary_color VARCHAR(7) DEFAULT '#667eea',
  secondary_color VARCHAR(7) DEFAULT '#764ba2',
  accent_color VARCHAR(7) DEFAULT '#f093fb',
  background_color VARCHAR(7) DEFAULT '#0f0f23',
  education_degree VARCHAR(200) DEFAULT 'Bachelor of Technology',
  education_university VARCHAR(200) DEFAULT 'I.K Gujral Punjab Technical University',
  education_duration VARCHAR(100) DEFAULT 'September 2020 - July 2023',
  education_gpa VARCHAR(10) DEFAULT '8.3',
  stats_transactions VARCHAR(20) DEFAULT '1M+',
  stats_uptime VARCHAR(20) DEFAULT '99.9%',
  stats_reduction VARCHAR(20) DEFAULT '40%',
  stats_experience VARCHAR(20) DEFAULT '2+',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Experiences Table
CREATE TABLE experiences (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  company VARCHAR(200) NOT NULL,
  location VARCHAR(200),
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  description TEXT,
  achievements TEXT[], -- Array of achievements
  technologies TEXT[], -- Array of technologies used
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects Table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  features TEXT[], -- Array of key features
  technologies TEXT[], -- Array of technologies used
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  image_url VARCHAR(500),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Skills Table
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  skills TEXT[] NOT NULL, -- Array of skills in this category
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default data
INSERT INTO portfolio_config (id) VALUES (1);

INSERT INTO experiences (title, company, location, start_date, end_date, is_current, description, achievements, technologies) VALUES
('Software Engineer', 'iVoyant', 'Bengaluru, India', '2023-07-01', NULL, TRUE, 
 'Architected and developed backend systems for PlatformNX, an enterprise Integration Platform as a Service (iPaaS) application',
 ARRAY[
   'Architected and developed backend systems for PlatformNX, an enterprise Integration Platform as a Service (iPaaS) application enabling complex data flow integration across organizations',
   'Built and maintained microservices architecture supporting no-code/low-code workflow builder, reducing development time-to-market from weeks to days',
   'Implemented scalable backend engine components using Spring Boot, Docker, PostgreSQL, and Redis for structured data flows and process automation',
   'Collaborated with DevOps team to deploy and maintain cloud infrastructure on Azure, ensuring optimal performance and 99.9% uptime',
   'Developed reusable component libraries that enhanced team collaboration and reduced development cycle time by 40%',
   'Utilized OpenTelemetry for comprehensive application tracing and monitoring, improving system observability and debugging efficiency',
   'Successfully delivered backend systems supporting enterprise-wide data integration workflows',
   'Implemented efficient coding practices resulting in 30% improvement in system stability and reduced error rates',
   'Led code reviews and mentored junior developers, enhancing overall code quality across the team',
   'Met 100% of project deadlines while maintaining high-quality deliverables'
 ],
 ARRAY['Spring Boot', 'Docker', 'PostgreSQL', 'Redis', 'Azure', 'OpenTelemetry', 'Microservices']
),
('Software Engineer Intern', 'iVoyant', 'Bengaluru, India', '2022-12-01', '2023-06-30', FALSE,
 'Contributed to product development as Backend Intern, focusing on Spring Boot application optimization',
 ARRAY[
   'Contributed to product development as Backend Intern, focusing on Spring Boot application optimization',
   'Integrated CompletableFuture for asynchronous processing, improving application response times by 25%',
   'Implemented OpenTelemetry monitoring features for enhanced application observability',
   'Configured Spring Security for robust authentication and authorization mechanisms',
   'Deployed serverless functions on Azure Functions and AWS Lambda, gaining hands-on cloud deployment experience',
   'Assisted in troubleshooting and resolving technical issues, ensuring uninterrupted system operations'
 ],
 ARRAY['Spring Boot', 'Spring Security', 'Azure Functions', 'AWS Lambda', 'OpenTelemetry']
);

INSERT INTO projects (title, description, features, technologies, is_featured) VALUES
('ErrorNex - Error Management & Monitoring Platform', 
 'Designed and developed a comprehensive error management tool for streamlined error handling processes with real-time monitoring capabilities.',
 ARRAY[
   'Built real-time monitoring dashboard improving debugging efficiency by 50%',
   'Comprehensive error tracking and management system',
   'Real-time alerts and notifications',
   'Advanced analytics and reporting'
 ],
 ARRAY['Java', 'Spring Boot', 'PostgreSQL', 'React', 'WebSocket', 'Docker'],
 TRUE
),
('PlatformNX - Enterprise iPaaS',
 'Enterprise Integration Platform as a Service enabling complex data flow integration across organizations with no-code/low-code workflow builder.',
 ARRAY[
   'Microservices architecture supporting workflow automation',
   'No-code/low-code workflow builder interface',
   'Enterprise-wide data integration capabilities',
   'Scalable backend engine for process automation'
 ],
 ARRAY['Spring Boot', 'Docker', 'PostgreSQL', 'Redis', 'Azure', 'OpenTelemetry'],
 TRUE
);

INSERT INTO skills (category, skills) VALUES
('Programming Languages', ARRAY['Java', 'Python', 'JavaScript']),
('Frameworks & Libraries', ARRAY['Spring Boot', 'Spring MVC', 'Spring Security', 'React.js', 'Next.js']),
('Databases', ARRAY['PostgreSQL', 'Redis', 'Cassandra']),
('Tools & Platforms', ARRAY['Docker', 'Kubernetes', 'Azure', 'AWS Lambda', 'Postman', 'OpenTelemetry', 'ElasticSearch']),
('APIs & Integration', ARRAY['REST APIs', 'GraphQL APIs', 'WebSocket', 'Kafka']),
('Architecture & Concepts', ARRAY['Microservices', 'Enterprise Integration', 'Cloud Deployment', 'DevOps', 'System Design']);

-- Enable Row Level Security
ALTER TABLE portfolio_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Create policies (allow public read, authenticated write)
CREATE POLICY "Public can read portfolio_config" ON portfolio_config FOR SELECT USING (true);
CREATE POLICY "Authenticated can update portfolio_config" ON portfolio_config FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Public can read experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage experiences" ON experiences FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage projects" ON projects FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public can read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage skills" ON skills FOR ALL USING (auth.role() = 'authenticated');

-- Create storage bucket for portfolio assets
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-assets', 'portfolio-assets', true);

-- Create storage policy
CREATE POLICY "Public can view portfolio assets" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-assets');
CREATE POLICY "Authenticated can upload portfolio assets" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-assets' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update portfolio assets" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio-assets' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete portfolio assets" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio-assets' AND auth.role() = 'authenticated');