
import { useState, useEffect, useRef } from 'react';
import { projects } from '../data/projects';
import { Project } from '../data/projects';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Filter to show only featured projects
  const featuredProjects = projects.filter(project => project.featured);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 text-foreground transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            Featured Projects
          </h2>
          <div className="section-divider"></div>
          <p className={`text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            Showcase of enterprise-grade Salesforce solutions with measurable business impact
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`professional-card hover-lift bg-white transform transition-all duration-700 hover:scale-105 hover:shadow-2xl ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
              }`}
              style={{
                animationDelay: `${index * 0.2}s`,
                transitionDelay: `${index * 0.1}s`
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className={`relative h-48 bg-gradient-to-br ${project.gradient || 'from-blue-500 to-purple-600'} rounded-lg overflow-hidden mb-6 transform transition-all duration-500 ${
                hoveredProject === project.id ? 'scale-105' : ''
              }`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-6xl font-bold opacity-80 animate-pulse">
                    {project.id}
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 font-mono font-semibold text-sm animate-bounce">
                    {project.id}
                  </div>
                </div>
                
                {/* Animated overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
                  hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm font-semibold animate-slide-in-left">View Details</div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3 transform transition-all duration-300 hover:text-primary">
                {project.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="mb-4">
                <h4 className="font-semibold text-foreground mb-2 text-sm">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium transform transition-all duration-300 hover:scale-110 hover:bg-primary/20 animate-fade-in-up"
                      style={{ animationDelay: `${techIndex * 0.1}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.impact && (
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-2 text-sm">Business Impact:</h4>
                  <ul className="space-y-1">
                    {project.impact.map((impact, impactIndex) => (
                      <li key={impactIndex} className="text-sm text-muted-foreground flex items-center animate-slide-in-left" style={{ animationDelay: `${impactIndex * 0.1}s` }}>
                        <span className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></span>
                        {impact}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  View Demo
                </button>
                <button className="px-4 py-2 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105">
                  View Code
                </button>
              </div>

              {/* Animated border */}
              <div className={`absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r ${project.gradient || 'from-blue-500 to-purple-600'} opacity-0 transition-opacity duration-300 ${
                hoveredProject === project.id ? 'opacity-20' : ''
              }`} style={{ padding: '2px', zIndex: -1 }}>
                <div className="bg-white rounded-lg h-full w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
