
public with sharing class PortfolioController {
    
    // Data Transfer Objects
    public class PortfolioData {
        @AuraEnabled public PersonalInfo personalInfo;
        @AuraEnabled public List<SkillCategory> skills;
        @AuraEnabled public List<ProjectInfo> projects;
        @AuraEnabled public List<CertificationInfo> certifications;
        
        public PortfolioData(PersonalInfo pi, List<SkillCategory> sk, List<ProjectInfo> pr, List<CertificationInfo> ce) {
            this.personalInfo = pi;
            this.skills = sk;
            this.projects = pr;
            this.certifications = ce;
        }
    }
    
    public class PersonalInfo {
        @AuraEnabled public String fullName;
        @AuraEnabled public String title;
        @AuraEnabled public String bio;
        @AuraEnabled public String email;
        @AuraEnabled public String linkedinUrl;
        @AuraEnabled public String githubUrl;
        @AuraEnabled public Decimal yearsOfExperience;
    }
    
    public class SkillCategory {
        @AuraEnabled public String category;
        @AuraEnabled public List<SkillInfo> skillList;
        
        public SkillCategory(String cat) {
            this.category = cat;
            this.skillList = new List<SkillInfo>();
        }
    }
    
    public class SkillInfo {
        @AuraEnabled public String name;
        @AuraEnabled public String proficiency;
        @AuraEnabled public String description;
        @AuraEnabled public String iconName;
    }
    
    public class ProjectInfo {
        @AuraEnabled public String title;
        @AuraEnabled public String description;
        @AuraEnabled public List<String> technologies;
        @AuraEnabled public String businessImpact;
        @AuraEnabled public String demoUrl;
        @AuraEnabled public String codeUrl;
        @AuraEnabled public String status;
    }
    
    public class CertificationInfo {
        @AuraEnabled public String title;
        @AuraEnabled public String issuer;
        @AuraEnabled public Date dateObtained;
        @AuraEnabled public String credentialId;
        @AuraEnabled public String verificationUrl;
        @AuraEnabled public String status;
        @AuraEnabled public Date expirationDate;
    }
    
    // Main method to get all portfolio data
    @AuraEnabled(cacheable=true)
    public static PortfolioData getPortfolioData() {
        try {
            return new PortfolioData(
                getPersonalInfo(),
                getSkillsByCategory(),
                getProjects(),
                getCertifications()
            );
        } catch (Exception e) {
            System.debug('Error getting portfolio data: ' + e.getMessage());
            throw new AuraHandledException('Unable to retrieve portfolio data: ' + e.getMessage());
        }
    }
    
    // Get personal information
    @AuraEnabled(cacheable=true)
    public static PersonalInfo getPersonalInfo() {
        try {
            Portfolio_Content__c content = [
                SELECT Full_Name__c, Title__c, Bio__c, Email__c, 
                       LinkedIn_URL__c, GitHub_URL__c, Years_of_Experience__c
                FROM Portfolio_Content__c 
                WHERE Is_Active__c = true 
                LIMIT 1
            ];
            
            PersonalInfo info = new PersonalInfo();
            info.fullName = content.Full_Name__c;
            info.title = content.Title__c;
            info.bio = content.Bio__c;
            info.email = content.Email__c;
            info.linkedinUrl = content.LinkedIn_URL__c;
            info.githubUrl = content.GitHub_URL__c;
            info.yearsOfExperience = content.Years_of_Experience__c;
            
            return info;
        } catch (Exception e) {
            System.debug('Error getting personal info: ' + e.getMessage());
            throw new AuraHandledException('Unable to retrieve personal information: ' + e.getMessage());
        }
    }
    
    // Get skills organized by category
    @AuraEnabled(cacheable=true)
    public static List<SkillCategory> getSkillsByCategory() {
        try {
            List<Skill__c> skills = [
                SELECT Skill_Name__c, Proficiency_Level__c, Category__c, 
                       Description__c, Icon_Name__c, Sort_Order__c
                FROM Skill__c 
                ORDER BY Category__c, Sort_Order__c ASC, Skill_Name__c ASC
            ];
            
            Map<String, SkillCategory> categoryMap = new Map<String, SkillCategory>();
            
            for (Skill__c skill : skills) {
                if (!categoryMap.containsKey(skill.Category__c)) {
                    categoryMap.put(skill.Category__c, new SkillCategory(skill.Category__c));
                }
                
                SkillInfo skillInfo = new SkillInfo();
                skillInfo.name = skill.Skill_Name__c;
                skillInfo.proficiency = skill.Proficiency_Level__c;
                skillInfo.description = skill.Description__c;
                skillInfo.iconName = skill.Icon_Name__c;
                
                categoryMap.get(skill.Category__c).skillList.add(skillInfo);
            }
            
            return categoryMap.values();
        } catch (Exception e) {
            System.debug('Error getting skills: ' + e.getMessage());
            throw new AuraHandledException('Unable to retrieve skills: ' + e.getMessage());
        }
    }
    
    // Get all projects
    @AuraEnabled(cacheable=true)
    public static List<ProjectInfo> getProjects() {
        try {
            List<Project__c> projects = [
                SELECT Project_Title__c, Description__c, Technologies__c, 
                       Business_Impact__c, Demo_URL__c, Code_URL__c, 
                       Project_Status__c, Sort_Order__c
                FROM Project__c 
                ORDER BY Sort_Order__c ASC, Project_Title__c ASC
            ];
            
            List<ProjectInfo> projectList = new List<ProjectInfo>();
            
            for (Project__c project : projects) {
                ProjectInfo info = new ProjectInfo();
                info.title = project.Project_Title__c;
                info.description = project.Description__c;
                info.technologies = project.Technologies__c != null ? 
                    project.Technologies__c.split(';') : new List<String>();
                info.businessImpact = project.Business_Impact__c;
                info.demoUrl = project.Demo_URL__c;
                info.codeUrl = project.Code_URL__c;
                info.status = project.Project_Status__c;
                
                projectList.add(info);
            }
            
            return projectList;
        } catch (Exception e) {
            System.debug('Error getting projects: ' + e.getMessage());
            throw new AuraHandledException('Unable to retrieve projects: ' + e.getMessage());
        }
    }
    
    // Get all certifications
    @AuraEnabled(cacheable=true)
    public static List<CertificationInfo> getCertifications() {
        try {
            List<Certification__c> certifications = [
                SELECT Certification_Title__c, Issuer__c, Date_Obtained__c, 
                       Credential_ID__c, Verification_URL__c, Status__c, 
                       Expiration_Date__c, Sort_Order__c
                FROM Certification__c 
                ORDER BY Sort_Order__c ASC, Date_Obtained__c DESC
            ];
            
            List<CertificationInfo> certList = new List<CertificationInfo>();
            
            for (Certification__c cert : certifications) {
                CertificationInfo info = new CertificationInfo();
                info.title = cert.Certification_Title__c;
                info.issuer = cert.Issuer__c;
                info.dateObtained = cert.Date_Obtained__c;
                info.credentialId = cert.Credential_ID__c;
                info.verificationUrl = cert.Verification_URL__c;
                info.status = cert.Status__c;
                info.expirationDate = cert.Expiration_Date__c;
                
                certList.add(info);
            }
            
            return certList;
        } catch (Exception e) {
            System.debug('Error getting certifications: ' + e.getMessage());
            throw new AuraHandledException('Unable to retrieve certifications: ' + e.getMessage());
        }
    }
    
    // Generate portfolio HTML
    @AuraEnabled
    public static String generatePortfolioHTML() {
        try {
            PortfolioData data = getPortfolioData();
            PortfolioGenerator generator = new PortfolioGenerator();
            return generator.generateCompletePortfolio(data);
        } catch (Exception e) {
            System.debug('Error generating portfolio HTML: ' + e.getMessage());
            throw new AuraHandledException('Unable to generate portfolio: ' + e.getMessage());
        }
    }
    
    // Update personal information
    @AuraEnabled
    public static void updatePersonalInfo(PersonalInfo info) {
        try {
            Portfolio_Content__c content = [
                SELECT Id FROM Portfolio_Content__c WHERE Is_Active__c = true LIMIT 1
            ];
            
            content.Full_Name__c = info.fullName;
            content.Title__c = info.title;
            content.Bio__c = info.bio;
            content.Email__c = info.email;
            content.LinkedIn_URL__c = info.linkedinUrl;
            content.GitHub_URL__c = info.githubUrl;
            content.Years_of_Experience__c = info.yearsOfExperience;
            
            update content;
        } catch (Exception e) {
            System.debug('Error updating personal info: ' + e.getMessage());
            throw new AuraHandledException('Unable to update personal information: ' + e.getMessage());
        }
    }
    
    // Track portfolio analytics
    @AuraEnabled
    public static void trackPortfolioVisit(String ipAddress, String userAgent, String referrerUrl) {
        try {
            Portfolio_Analytics__c analytics = new Portfolio_Analytics__c();
            analytics.Visit_Date__c = System.now();
            analytics.IP_Address__c = ipAddress;
            analytics.User_Agent__c = userAgent;
            analytics.Referrer_URL__c = referrerUrl;
            
            insert analytics;
        } catch (Exception e) {
            System.debug('Error tracking visit: ' + e.getMessage());
            // Don't throw exception for analytics - shouldn't break the main functionality
        }
    }
}
