
import { useState, useEffect, useRef } from 'react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: 'Apex', level: 90, icon: '⚡', description: 'Advanced server-side logic & triggers', category: 'development' },
    { name: 'Lightning Components', level: 85, icon: '🌩️', description: 'Modern UI framework expertise', category: 'development' },
    { name: 'Visualforce', level: 80, icon: '👁️', description: 'Custom page development', category: 'development' },
    { name: 'SOQL/SOSL', level: 95, icon: '🔍', description: 'Database query optimization', category: 'development' },
    { name: 'Integration APIs', level: 75, icon: '🔗', description: 'REST/SOAP web services', category: 'integration' },
    { name: 'Process Builder', level: 88, icon: '⚙️', description: 'Workflow automation', category: 'automation' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skills progressively
          skills.forEach((skill, index) => {
            setTimeout(() => {
              setAnimatedSkills(prev => new Set([...prev, skill.name]));
            }, index * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 text-foreground transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            Technical Skills
          </h2>
          <div className="section-divider"></div>
          <p className={`text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            Core competencies in Salesforce ecosystem with proven track record of delivering enterprise solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`professional-card hover-lift transform transition-all duration-700 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
              } hover:scale-105 hover:shadow-2xl`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                transitionDelay: `${index * 0.1}s`
              }}
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4 animate-pulse">{skill.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {skill.description}
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Proficiency</span>
                  <span className="font-mono text-sm text-primary font-semibold">
                    {animatedSkills.has(skill.name) ? skill.level : 0}%
                  </span>
                </div>
                
                <div className="progress-bar">
                  <div
                    className="progress-fill transition-all duration-1000 ease-out"
                    style={{
                      width: animatedSkills.has(skill.name) ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 0.2}s`
                    }}
                  />
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
            </div>
          ))}
        </div>

        <div className={`mt-16 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
          <div className="professional-card max-w-4xl mx-auto hover-lift">
            <h3 className="text-2xl font-semibold text-foreground mb-6">Experience Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { value: '3+', label: 'Years Experience' },
                { value: '50+', label: 'Projects Delivered' },
                { value: '99%', label: 'Client Satisfaction' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center transform hover:scale-110 transition-transform duration-300">
                  <div className={`text-4xl font-bold text-primary mb-2 transition-all duration-1000 ${
                    animatedSkills.size > 0 ? 'animate-pulse' : ''
                  }`} style={{ animationDelay: `${index * 0.3}s` }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
