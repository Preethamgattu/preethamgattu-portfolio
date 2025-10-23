export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'tools';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description: string;
  icon?: string;
}

export const skills: Skill[] = [
  // Technical Skills
  {
    id: 'lwc',
    name: 'Lightning Web Components',
    category: 'technical',
    level: 'expert',
    description: 'Building dynamic, responsive Lightning Web Components with modern JavaScript and Lightning Design System',
    icon: '⚡',
  },
  {
    id: 'apex',
    name: 'Apex Development',
    category: 'technical',
    level: 'expert',
    description: 'Crafting robust server-side logic, triggers, and batch processes that scale with enterprise needs',
    icon: '🧙‍♂️',
  },
  {
    id: 'flows',
    name: 'Salesforce Flows',
    category: 'technical',
    level: 'advanced',
    description: 'Creating automated business processes and user interactions with declarative flow builder',
    icon: '🌊',
  },
  {
    id: 'admin',
    name: 'Salesforce Administration',
    category: 'technical',
    level: 'advanced',
    description: 'Configuring orgs, managing users, creating custom objects, and optimizing business processes',
    icon: '🧩',
  },
  {
    id: 'agentforce',
    name: 'Agentforce',
    category: 'technical',
    level: 'intermediate',
    description: 'Implementing AI-powered automation and intelligent agent solutions for enhanced productivity',
    icon: '🤖',
  },
  {
    id: 'integration',
    name: 'System Integration',
    category: 'technical',
    level: 'advanced',
    description: 'Building robust integrations between Salesforce and external systems using APIs and middleware',
    icon: '🔗',
  },
  {
    id: 'data-modeling',
    name: 'Data Modeling',
    category: 'technical',
    level: 'advanced',
    description: 'Designing efficient data architectures and relationships in Salesforce',
    icon: '📊',
  },

  // Tools & Platforms
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'tools',
    level: 'expert',
    description: 'Mastering VS Code with Salesforce extensions, debugging, and development best practices',
    icon: '💻',
  },
  {
    id: 'git',
    name: 'Git Version Control',
    category: 'tools',
    level: 'advanced',
    description: 'Git workflows, branching strategies, and collaborative development with proper version control',
    icon: '⏳',
  },
  {
    id: 'salesforce-cli',
    name: 'Salesforce CLI',
    category: 'tools',
    level: 'advanced',
    description: 'Command-line development, deployment, and org management using Salesforce CLI',
    icon: '⚙️',
  },
  {
    id: 'postman',
    name: 'API Testing',
    category: 'tools',
    level: 'intermediate',
    description: 'Testing and debugging REST APIs and integrations',
    icon: '📮',
  },

  // Soft Skills
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    category: 'soft',
    level: 'expert',
    description: 'Analyzing complex business requirements and designing elegant technical solutions',
    icon: '🧠',
  },
  {
    id: 'communication',
    name: 'Technical Communication',
    category: 'soft',
    level: 'advanced',
    description: 'Translating technical concepts to business stakeholders and collaborating with cross-functional teams',
    icon: '💬',
  },
  {
    id: 'agile',
    name: 'Agile Methodology',
    category: 'soft',
    level: 'advanced',
    description: 'Working in agile environments with sprints, user stories, and continuous improvement',
    icon: '🔄',
  },
];

export const skillCategories = {
  technical: skills.filter(skill => skill.category === 'technical'),
  tools: skills.filter(skill => skill.category === 'tools'),
  soft: skills.filter(skill => skill.category === 'soft'),
};
