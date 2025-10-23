export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  gradient?: string;
  impact?: string[];
}

export const projects: Project[] = [
  {
    id: 'job-portal',
    title: 'Job Portal App',
    description: 'A comprehensive job portal built with Lightning Web Components, Apex backend, and automated flows for seamless job application processes.',
    technologies: ['LWC', 'Apex', 'Flow', 'Salesforce'],
    githubUrl: 'https://github.com/preethamgattu/job-portal',
    featured: true,
    gradient: 'from-blue-500 to-purple-600',
    impact: ['Streamlined job applications', 'Reduced processing time by 50%', 'Improved candidate experience'],
  },
  {
    id: 'donation-tracker',
    title: 'Donation Tracker',
    description: 'Non-profit donation management system using NPSP framework with advanced reporting and donor engagement features.',
    technologies: ['NPSP', 'Reports', 'Dashboards', 'Salesforce'],
    githubUrl: 'https://github.com/preethamgattu/donation-tracker',
    featured: true,
    gradient: 'from-green-500 to-teal-600',
    impact: ['Enhanced donor tracking', 'Improved reporting accuracy', 'Increased donor retention by 30%'],
  },
  {
    id: 'agentforce-crm',
    title: 'Agentforce Automation CRM',
    description: 'AI-powered CRM solution with intelligent automation, predictive analytics, and seamless customer interaction flows.',
    technologies: ['Agentforce', 'AI', 'Automation', 'Salesforce'],
    githubUrl: 'https://github.com/preethamgattu/agentforce-crm',
    featured: true,
    gradient: 'from-orange-500 to-red-600',
    impact: ['AI-driven insights', 'Automated customer interactions', '40% improvement in response time'],
  },
  {
    id: 'salesforce-integration-hub',
    title: 'Salesforce Integration Hub',
    description: 'Enterprise integration platform connecting Salesforce with multiple external systems using REST APIs and middleware.',
    technologies: ['Apex', 'REST APIs', 'Integration', 'Middleware'],
    githubUrl: 'https://github.com/preethamgattu/integration-hub',
    featured: false,
    gradient: 'from-purple-500 to-indigo-600',
    impact: ['Unified data platform', 'Real-time synchronization', 'Reduced integration complexity'],
  },
  {
    id: 'lightning-community-portal',
    title: 'Lightning Community Portal',
    description: 'Customer and partner portal built with Lightning Communities, featuring self-service capabilities and knowledge base.',
    technologies: ['Lightning Communities', 'LWC', 'Experience Cloud'],
    githubUrl: 'https://github.com/preethamgattu/community-portal',
    featured: false,
    gradient: 'from-pink-500 to-rose-600',
    impact: ['Self-service capabilities', 'Enhanced user engagement', 'Reduced support tickets by 35%'],
  },
];
