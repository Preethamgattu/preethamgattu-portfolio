export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  linkedin: string;
  github: string;
  website?: string;
  bio: string;
  experience: number;
  avatar?: string;
}

export const personalInfo: PersonalInfo = {
  name: 'Preetham Gattu',
  title: 'Salesforce Developer',
  email: 'preethamgattu0@gmail.com',
  phone: '+1 (555) 123-4567', // Replace with actual phone if desired
  location: 'San Francisco, CA',
  linkedin: 'https://linkedin.com/in/preethamgattu',
  github: 'https://github.com/preethamgattu',
  website: 'https://preethamgattu.dev',
  bio: 'Experienced Salesforce Developer with 3+ years of expertise in crafting scalable enterprise solutions. Specialized in Apex, Lightning Components, and integrations that drive measurable business impact.',
  experience: 3,
};

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export const socialLinks: SocialLink[] = [
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/preethamgattu',
    icon: 'linkedin',
    label: 'Connect on LinkedIn',
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/preethamgattu',
    icon: 'github',
    label: 'View GitHub Profile',
  },
  {
    platform: 'Trailhead',
    url: 'https://trailhead.salesforce.com/en/me/preethamgattu',
    icon: 'graduation-cap',
    label: 'View Trailhead Profile',
  },
  {
    platform: 'Email',
    url: 'mailto:preethamgattu0@gmail.com',
    icon: 'envelope',
    label: 'Send Email',
  },
];
