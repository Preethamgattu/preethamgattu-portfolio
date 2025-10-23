export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description: string;
  badgeUrl?: string;
  featured: boolean;
}

export const certifications: Certification[] = [
  {
    id: 'salesforce-administrator',
    name: 'Salesforce Certified Administrator',
    issuer: 'Salesforce',
    issueDate: '2022-06-15',
    credentialId: '12345678',
    credentialUrl: 'https://trailhead.salesforce.com/credentials/certification-detail-print?searchString=12345678',
    description: 'Demonstrates knowledge and skills in Salesforce administration, including user management, security, data management, and business process automation.',
    featured: true,
  },
  {
    id: 'platform-app-builder',
    name: 'Salesforce Certified Platform App Builder',
    issuer: 'Salesforce',
    issueDate: '2022-09-20',
    credentialId: '87654321',
    credentialUrl: 'https://trailhead.salesforce.com/credentials/certification-detail-print?searchString=87654321',
    description: 'Validates skills in designing, building, and implementing custom applications using the Salesforce platform.',
    featured: true,
  },
  {
    id: 'platform-developer-i',
    name: 'Salesforce Certified Platform Developer I',
    issuer: 'Salesforce',
    issueDate: '2023-01-10',
    credentialId: '11223344',
    credentialUrl: 'https://trailhead.salesforce.com/credentials/certification-detail-print?searchString=11223344',
    description: 'Proves foundational programming skills on the Salesforce Platform, including Apex, Visualforce, and Lightning Components.',
    featured: true,
  },
  {
    id: 'agentforce-specialist',
    name: 'Salesforce Certified Agentforce Specialist',
    issuer: 'Salesforce',
    issueDate: '2023-11-05',
    credentialId: '44332211',
    credentialUrl: 'https://trailhead.salesforce.com/credentials/certification-detail-print?searchString=44332211',
    description: 'Certifies expertise in implementing and managing AI-powered automation solutions using Salesforce Agentforce.',
    featured: true,
  },
  {
    id: 'javascript-developer-i',
    name: 'Salesforce Certified JavaScript Developer I',
    issuer: 'Salesforce',
    issueDate: '2023-03-15',
    credentialId: '55667788',
    credentialUrl: 'https://trailhead.salesforce.com/credentials/certification-detail-print?searchString=55667788',
    description: 'Validates JavaScript programming skills for developing Lightning Web Components and client-side solutions.',
    featured: false,
  },
  {
    id: 'pardot-specialist',
    name: 'Salesforce Certified Pardot Specialist',
    issuer: 'Salesforce',
    issueDate: '2022-12-01',
    credentialId: '88776655',
    credentialUrl: 'https://trailhead.salesforce.com/credentials/certification-detail-print?searchString=88776655',
    description: 'Demonstrates ability to implement and manage marketing automation campaigns using Pardot.',
    featured: false,
  },
];

export const featuredCertifications = certifications.filter(cert => cert.featured);
