
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            INITIATE CONTACT
          </h2>
          <p className="font-rajdhani text-xl text-foreground/70 max-w-2xl mx-auto">
            Ready to transform your Salesforce ecosystem? Let's discuss your next innovative project.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="neon-border holographic p-6 rounded-lg">
                <h3 className="font-orbitron text-2xl font-bold text-primary mb-6">
                  CONNECTION PROTOCOLS
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
                      <span className="text-primary text-xl">📧</span>
                    </div>
                    <div>
                      <p className="font-rajdhani text-sm text-foreground/60">Email Protocol</p>
                      <p className="font-rajdhani text-lg text-primary">alex.chen@sfdev.pro</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center border border-secondary/30">
                      <span className="text-secondary text-xl">💼</span>
                    </div>
                    <div>
                      <p className="font-rajdhani text-sm text-foreground/60">Professional Network</p>
                      <p className="font-rajdhani text-lg text-secondary">linkedin.com/in/alexchen-sf</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center border border-accent/30">
                      <span className="text-accent text-xl">🌐</span>
                    </div>
                    <div>
                      <p className="font-rajdhani text-sm text-foreground/60">Code Repository</p>
                      <p className="font-rajdhani text-lg text-accent">github.com/alexchen-sf</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="neon-border holographic p-6 rounded-lg">
                <h3 className="font-orbitron text-xl font-bold text-primary mb-4">
                  CURRENT STATUS
                </h3>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                  <span className="font-rajdhani text-accent">Available for new projects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                  <span className="font-rajdhani text-secondary">Response time: &lt; 24 hours</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="neon-border holographic p-6 rounded-lg">
              <h3 className="font-orbitron text-2xl font-bold text-primary mb-6">
                TRANSMISSION FORM
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-rajdhani text-sm text-foreground/80 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background/50 border border-primary/30 rounded-lg font-rajdhani text-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label className="block font-rajdhani text-sm text-foreground/80 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background/50 border border-primary/30 rounded-lg font-rajdhani text-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                    placeholder="your.email@company.com"
                  />
                </div>
                
                <div>
                  <label className="block font-rajdhani text-sm text-foreground/80 mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background/50 border border-primary/30 rounded-lg font-rajdhani text-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                    placeholder="Your company name"
                  />
                </div>
                
                <div>
                  <label className="block font-rajdhani text-sm text-foreground/80 mb-2">
                    Project Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-background/50 border border-primary/30 rounded-lg font-rajdhani text-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 resize-none"
                    placeholder="Describe your Salesforce project requirements..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-4 font-rajdhani font-semibold text-lg tracking-wider rounded-lg transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-foreground/20 text-foreground/50 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary to-secondary text-background hover:scale-105 animate-glow'
                  }`}
                >
                  {isSubmitting ? 'TRANSMITTING...' : 'SEND MESSAGE'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-primary/20 text-center">
          <p className="font-rajdhani text-foreground/60">
            © 2024 Alex Chen - Salesforce Developer Portfolio. All rights reserved.
          </p>
          <p className="font-orbitron text-xs text-primary/60 mt-2">
            FUTURE_TECH_SPECIALIST.v2024
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
