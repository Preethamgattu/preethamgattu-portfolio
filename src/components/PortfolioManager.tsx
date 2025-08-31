
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  User, 
  Code, 
  Award, 
  Briefcase, 
  BarChart3, 
  Download,
  Save,
  Eye,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

// Types for Salesforce data
interface PersonalInfo {
  fullName: string;
  title: string;
  bio: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  yearsOfExperience: number;
}

interface SkillInfo {
  name: string;
  proficiency: string;
  description: string;
  iconName: string;
}

interface SkillCategory {
  category: string;
  skillList: SkillInfo[];
}

interface ProjectInfo {
  title: string;
  description: string;
  technologies: string[];
  businessImpact: string;
  demoUrl: string;
  codeUrl: string;
  status: string;
}

interface CertificationInfo {
  title: string;
  issuer: string;
  dateObtained: string;
  credentialId: string;
  verificationUrl: string;
  status: string;
  expirationDate: string;
}

interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: SkillCategory[];
  projects: ProjectInfo[];
  certifications: CertificationInfo[];
}

const PortfolioManager: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [editingPersonalInfo, setEditingPersonalInfo] = useState(false);
  const { toast } = useToast();

  // Simulate Salesforce data loading
  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      setLoading(true);
      // Simulate API call to Salesforce Apex controller
      const mockData: PortfolioData = {
        personalInfo: {
          fullName: "Preetham Gattu",
          title: "Senior Salesforce Developer",
          bio: "Experienced Salesforce Developer with 5+ years of expertise in building scalable solutions on the Salesforce platform. Specialized in Lightning Web Components, Apex, and integrations.",
          email: "preetham.gattu@example.com",
          linkedinUrl: "https://linkedin.com/in/preethamgattu",
          githubUrl: "https://github.com/preethamgattu",
          yearsOfExperience: 5.5
        },
        skills: [
          {
            category: "Salesforce",
            skillList: [
              { name: "Apex", proficiency: "Expert", description: "Advanced server-side development", iconName: "fas fa-code" },
              { name: "Lightning Web Components", proficiency: "Expert", description: "Modern UI framework", iconName: "fas fa-bolt" },
              { name: "Visualforce", proficiency: "Advanced", description: "Legacy UI development", iconName: "fas fa-eye" }
            ]
          },
          {
            category: "Programming Languages",
            skillList: [
              { name: "JavaScript", proficiency: "Expert", description: "ES6+ and modern frameworks", iconName: "fab fa-js" },
              { name: "Java", proficiency: "Advanced", description: "Enterprise applications", iconName: "fab fa-java" },
              { name: "Python", proficiency: "Intermediate", description: "Data processing and automation", iconName: "fab fa-python" }
            ]
          }
        ],
        projects: [
          {
            title: "Salesforce CPQ Enhancement",
            description: "Enhanced CPQ system with custom pricing rules and approval processes",
            technologies: ["Apex", "Lightning Web Components", "REST API"],
            businessImpact: "Reduced quote generation time by 40%",
            demoUrl: "",
            codeUrl: "",
            status: "Completed"
          },
          {
            title: "Integration Platform",
            description: "Built integration platform connecting Salesforce with external systems",
            technologies: ["Apex", "REST API", "Node.js"],
            businessImpact: "Automated 80% of data synchronization processes",
            demoUrl: "",
            codeUrl: "",
            status: "Completed"
          }
        ],
        certifications: [
          {
            title: "Salesforce Certified Platform Developer I",
            issuer: "Salesforce",
            dateObtained: "2022-03-15",
            credentialId: "22-123456",
            verificationUrl: "https://trailhead.salesforce.com/credentials/verification",
            status: "Active",
            expirationDate: ""
          },
          {
            title: "Salesforce Certified Administrator",
            issuer: "Salesforce",
            dateObtained: "2021-08-20",
            credentialId: "21-789012",
            verificationUrl: "https://trailhead.salesforce.com/credentials/verification",
            status: "Active",
            expirationDate: ""
          }
        ]
      };

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPortfolioData(mockData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load portfolio data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const savePersonalInfo = async (updatedInfo: PersonalInfo) => {
    try {
      setSaving(true);
      // Simulate API call to Salesforce Apex controller
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPortfolioData(prev => prev ? { ...prev, personalInfo: updatedInfo } : null);
      setEditingPersonalInfo(false);
      
      toast({
        title: "Success",
        description: "Personal information updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save personal information",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const generatePortfolio = async () => {
    try {
      setGenerating(true);
      // Simulate API call to Salesforce Apex controller
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Success",
        description: "Portfolio HTML generated and deployed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate portfolio",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading portfolio data from Salesforce...</p>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-muted-foreground">No portfolio data found</p>
          <Button onClick={loadPortfolioData} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Portfolio Management System</h1>
        <p className="text-muted-foreground">Manage your portfolio content stored in Salesforce</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <Button onClick={generatePortfolio} disabled={generating} className="flex items-center gap-2">
          {generating ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Download className="h-4 w-4" />
          )}
          {generating ? 'Generating...' : 'Generate Portfolio'}
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          Preview Portfolio
        </Button>
        
        <Button variant="outline" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          View Analytics
        </Button>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Skills
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Projects
          </TabsTrigger>
          <TabsTrigger value="certifications" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Certifications
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your basic profile information</CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setEditingPersonalInfo(!editingPersonalInfo)}
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  {editingPersonalInfo ? 'Cancel' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <PersonalInfoForm
                personalInfo={portfolioData.personalInfo}
                editing={editingPersonalInfo}
                saving={saving}
                onSave={savePersonalInfo}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Technical Skills</CardTitle>
                  <CardDescription>Manage your skills organized by category</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Skill
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <SkillsSection skills={portfolioData.skills} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>Showcase your development projects</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Project
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ProjectsSection projects={portfolioData.projects} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certifications Tab */}
        <TabsContent value="certifications">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Certifications</CardTitle>
                  <CardDescription>Track your professional certifications</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Certification
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <CertificationsSection certifications={portfolioData.certifications} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Personal Info Form Component
const PersonalInfoForm: React.FC<{
  personalInfo: PersonalInfo;
  editing: boolean;
  saving: boolean;
  onSave: (info: PersonalInfo) => void;
}> = ({ personalInfo, editing, saving, onSave }) => {
  const [formData, setFormData] = useState(personalInfo);

  useEffect(() => {
    setFormData(personalInfo);
  }, [personalInfo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!editing) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Full Name</label>
            <p className="text-foreground">{personalInfo.fullName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Title</label>
            <p className="text-foreground">{personalInfo.title}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <p className="text-foreground">{personalInfo.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Years of Experience</label>
            <p className="text-foreground">{personalInfo.yearsOfExperience} years</p>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Bio</label>
          <p className="text-foreground mt-1">{personalInfo.bio}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">LinkedIn URL</label>
            <p className="text-foreground">{personalInfo.linkedinUrl || 'Not provided'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">GitHub URL</label>
            <p className="text-foreground">{personalInfo.githubUrl || 'Not provided'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground">Full Name</label>
          <Input
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Years of Experience</label>
          <Input
            type="number"
            step="0.1"
            value={formData.yearsOfExperience}
            onChange={(e) => setFormData({ ...formData, yearsOfExperience: parseFloat(e.target.value) })}
            required
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-foreground">Bio</label>
        <Textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={4}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground">LinkedIn URL</label>
          <Input
            type="url"
            value={formData.linkedinUrl}
            onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">GitHub URL</label>
          <Input
            type="url"
            value={formData.githubUrl}
            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={saving} className="flex items-center gap-2">
          {saving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
};

// Skills Section Component
const SkillsSection: React.FC<{ skills: SkillCategory[] }> = ({ skills }) => {
  return (
    <div className="space-y-6">
      {skills.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">{category.category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.skillList.map((skill, skillIndex) => (
              <Card key={skillIndex} className="relative">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-foreground">{skill.name}</h4>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Badge variant="secondary" className="mb-2">
                    {skill.proficiency}
                  </Badge>
                  {skill.description && (
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Projects Section Component
const ProjectsSection: React.FC<{ projects: ProjectInfo[] }> = ({ projects }) => {
  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <Card key={index} className="relative">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>
                <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}>
                  {project.status}
                </Badge>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm">
                  <Edit className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{project.description}</p>
            {project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <Badge key={techIndex} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
            {project.businessImpact && (
              <div className="mb-4">
                <p className="text-sm font-medium text-foreground">Business Impact:</p>
                <p className="text-sm text-muted-foreground">{project.businessImpact}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Certifications Section Component
const CertificationsSection: React.FC<{ certifications: CertificationInfo[] }> = ({ certifications }) => {
  return (
    <div className="space-y-4">
      {certifications.map((cert, index) => (
        <Card key={index} className="relative">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{cert.title}</h3>
                <p className="text-blue-600 font-medium mb-2">{cert.issuer}</p>
                <Badge variant={cert.status === 'Active' ? 'default' : 'secondary'}>
                  {cert.status}
                </Badge>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm">
                  <Edit className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-foreground">Date Obtained</p>
                <p className="text-muted-foreground">{cert.dateObtained}</p>
              </div>
              {cert.credentialId && (
                <div>
                  <p className="font-medium text-foreground">Credential ID</p>
                  <p className="text-muted-foreground">{cert.credentialId}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PortfolioManager;
