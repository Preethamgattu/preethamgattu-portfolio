
public with sharing class PortfolioDataService {
    
    // Cache implementation for better performance
    private static Map<String, Object> dataCache = new Map<String, Object>();
    private static final Integer CACHE_DURATION_MINUTES = 30;
    private static Map<String, DateTime> cacheTimestamps = new Map<String, DateTime>();
    
    // Get data from cache or database
    public static Object getCachedData(String cacheKey, String objectType) {
        DateTime cacheTime = cacheTimestamps.get(cacheKey);
        
        if (cacheTime != null && cacheTime.addMinutes(CACHE_DURATION_MINUTES) > System.now()) {
            return dataCache.get(cacheKey);
        }
        
        // Cache expired or doesn't exist, fetch fresh data
        Object freshData = fetchDataFromDatabase(objectType);
        dataCache.put(cacheKey, freshData);
        cacheTimestamps.put(cacheKey, System.now());
        
        return freshData;
    }
    
    // Clear cache when data is updated
    public static void clearCache(String cacheKey) {
        dataCache.remove(cacheKey);
        cacheTimestamps.remove(cacheKey);
    }
    
    // Clear all cache
    public static void clearAllCache() {
        dataCache.clear();
        cacheTimestamps.clear();
    }
    
    // Fetch data from database based on object type
    private static Object fetchDataFromDatabase(String objectType) {
        switch on objectType {
            when 'PersonalInfo' {
                return [
                    SELECT Full_Name__c, Title__c, Bio__c, Email__c, 
                           LinkedIn_URL__c, GitHub_URL__c, Years_of_Experience__c
                    FROM Portfolio_Content__c 
                    WHERE Is_Active__c = true 
                    LIMIT 1
                ];
            }
            when 'Skills' {
                return [
                    SELECT Skill_Name__c, Proficiency_Level__c, Category__c, 
                           Description__c, Icon_Name__c, Sort_Order__c
                    FROM Skill__c 
                    ORDER BY Category__c, Sort_Order__c ASC, Skill_Name__c ASC
                ];
            }
            when 'Projects' {
                return [
                    SELECT Project_Title__c, Description__c, Technologies__c, 
                           Business_Impact__c, Demo_URL__c, Code_URL__c, 
                           Project_Status__c, Sort_Order__c
                    FROM Project__c 
                    ORDER BY Sort_Order__c ASC, Project_Title__c ASC
                ];
            }
            when 'Certifications' {
                return [
                    SELECT Certification_Title__c, Issuer__c, Date_Obtained__c, 
                           Credential_ID__c, Verification_URL__c, Status__c, 
                           Expiration_Date__c, Sort_Order__c
                    FROM Certification__c 
                    ORDER BY Sort_Order__c ASC, Date_Obtained__c DESC
                ];
            }
            when else {
                return null;
            }
        }
    }
    
    // Bulk data operations for better performance
    public static void bulkUpdateSkills(List<Skill__c> skills) {
        try {
            update skills;
            clearCache('skills');
        } catch (DmlException e) {
            System.debug('Error updating skills: ' + e.getMessage());
            throw new AuraHandledException('Unable to update skills: ' + e.getMessage());
        }
    }
    
    public static void bulkUpdateProjects(List<Project__c> projects) {
        try {
            update projects;
            clearCache('projects');
        } catch (DmlException e) {
            System.debug('Error updating projects: ' + e.getMessage());
            throw new AuraHandledException('Unable to update projects: ' + e.getMessage());
        }
    }
    
    public static void bulkUpdateCertifications(List<Certification__c> certifications) {
        try {
            update certifications;
            clearCache('certifications');
        } catch (DmlException e) {
            System.debug('Error updating certifications: ' + e.getMessage());
            throw new AuraHandledException('Unable to update certifications: ' + e.getMessage());
        }
    }
    
    // Data validation methods
    public static Boolean validatePersonalInfo(Portfolio_Content__c content) {
        if (String.isBlank(content.Full_Name__c) || 
            String.isBlank(content.Title__c) || 
            String.isBlank(content.Email__c)) {
            return false;
        }
        
        // Email format validation
        String emailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
        Pattern emailPattern = Pattern.compile(emailRegex);
        return emailPattern.matcher(content.Email__c).matches();
    }
    
    public static Boolean validateSkill(Skill__c skill) {
        if (String.isBlank(skill.Skill_Name__c) || 
            String.isBlank(skill.Proficiency_Level__c) || 
            String.isBlank(skill.Category__c)) {
            return false;
        }
        return true;
    }
    
    public static Boolean validateProject(Project__c project) {
        if (String.isBlank(project.Project_Title__c) || 
            String.isBlank(project.Description__c) || 
            String.isBlank(project.Project_Status__c)) {
            return false;
        }
        return true;
    }
    
    public static Boolean validateCertification(Certification__c certification) {
        if (String.isBlank(certification.Certification_Title__c) || 
            String.isBlank(certification.Issuer__c) || 
            certification.Date_Obtained__c == null || 
            String.isBlank(certification.Status__c)) {
            return false;
        }
        return true;
    }
    
    // Export/Import functionality
    public static String exportPortfolioData() {
        Map<String, Object> portfolioData = new Map<String, Object>();
        
        portfolioData.put('personalInfo', getCachedData('personalInfo', 'PersonalInfo'));
        portfolioData.put('skills', getCachedData('skills', 'Skills'));
        portfolioData.put('projects', getCachedData('projects', 'Projects'));
        portfolioData.put('certifications', getCachedData('certifications', 'Certifications'));
        portfolioData.put('exportDate', System.now());
        portfolioData.put('version', '1.0');
        
        return JSON.serialize(portfolioData);
    }
    
    // Search functionality
    public static List<Object> searchPortfolioContent(String searchTerm) {
        List<Object> results = new List<Object>();
        
        if (String.isBlank(searchTerm)) {
            return results;
        }
        
        String searchPattern = '%' + searchTerm + '%';
        
        // Search in skills
        List<Skill__c> skills = [
            SELECT Skill_Name__c, Category__c, Description__c 
            FROM Skill__c 
            WHERE Skill_Name__c LIKE :searchPattern 
               OR Description__c LIKE :searchPattern
        ];
        results.addAll(skills);
        
        // Search in projects
        List<Project__c> projects = [
            SELECT Project_Title__c, Description__c, Technologies__c 
            FROM Project__c 
            WHERE Project_Title__c LIKE :searchPattern 
               OR Description__c LIKE :searchPattern 
               OR Technologies__c LIKE :searchPattern
        ];
        results.addAll(projects);
        
        // Search in certifications
        List<Certification__c> certifications = [
            SELECT Certification_Title__c, Issuer__c 
            FROM Certification__c 
            WHERE Certification_Title__c LIKE :searchPattern 
               OR Issuer__c LIKE :searchPattern
        ];
        results.addAll(certifications);
        
        return results;
    }
}
