
public with sharing class PortfolioGenerator {
    
    public String generateCompletePortfolio(PortfolioController.PortfolioData data) {
        if (data == null) {
            throw new IllegalArgumentException('Portfolio data cannot be null');
        }
        String html = generateHTMLStructure(data);
        return html;
    }
    
    private String generateHTMLStructure(PortfolioController.PortfolioData data) {
        String html = '<!DOCTYPE html>\n';
        html += '<html lang="en">\n';
        html += generateHead(data.personalInfo);
        html += '<body class="bg-gray-50">\n';
        html += generateNavigation(data.personalInfo);
        html += generateHeroSection(data.personalInfo);
        html += generateSkillsSection(data.skills);
        html += generateProjectsSection(data.projects);
        html += generateCertificationsSection(data.certifications);
        html += generateContactSection(data.personalInfo);
        html += generateFooter();
        html += generateScripts();
        html += '</body>\n';
        html += '</html>';
        
        return html;
    }
    
    private String escapeHtml(String input) {
        if (String.isBlank(input)) {
            return '';
        }
        return input.escapeHtml4();
    }
    
    private String generateHead(PortfolioController.PersonalInfo info) {
        String head = '<head>\n';
        head += '<meta charset="UTF-8">\n';
        head += '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
        
        if (info != null) {
            head += '<title>' + escapeHtml(info.fullName) + ' - ' + escapeHtml(info.title) + '</title>\n';
            head += '<meta name="description" content="' + escapeHtml(info.bio) + '">\n';
        } else {
            head += '<title>Portfolio</title>\n';
            head += '<meta name="description" content="Professional Portfolio">\n';
        }
        
        head += '<script src="https://cdn.tailwindcss.com"></script>\n';
        head += '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">\n';
        head += generateCustomCSS();
        head += '</head>\n';
        return head;
    }
    
    private String generateCustomCSS() {
        String css = '<style>\n';
        css += '.gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }\n';
        css += '.typing-animation { border-right: 2px solid #667eea; animation: blink 1s infinite; }\n';
        css += '@keyframes blink { 0%, 50% { border-color: transparent; } 51%, 100% { border-color: #667eea; } }\n';
        css += '.card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }\n';
        css += '.card-hover:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.1); }\n';
        css += '.skill-bar { transition: width 2s ease-in-out; }\n';
        css += '</style>\n';
        return css;
    }
    
    private String generateNavigation(PortfolioController.PersonalInfo info) {
        String nav = '<nav class="bg-white shadow-lg fixed w-full top-0 z-50">\n';
        nav += '<div class="max-w-7xl mx-auto px-4">\n';
        nav += '<div class="flex justify-between items-center py-4">\n';
        nav += '<div class="flex items-center">\n';
        
        String displayName = (info != null && String.isNotBlank(info.fullName)) ? 
            escapeHtml(info.fullName) : 'Portfolio';
        nav += '<span class="text-xl font-bold text-gray-800">' + displayName + '</span>\n';
        
        nav += '</div>\n';
        nav += '<div class="hidden md:flex space-x-8">\n';
        nav += '<a href="#home" class="text-gray-700 hover:text-blue-600 transition duration-300">Home</a>\n';
        nav += '<a href="#skills" class="text-gray-700 hover:text-blue-600 transition duration-300">Skills</a>\n';
        nav += '<a href="#projects" class="text-gray-700 hover:text-blue-600 transition duration-300">Projects</a>\n';
        nav += '<a href="#certifications" class="text-gray-700 hover:text-blue-600 transition duration-300">Certifications</a>\n';
        nav += '<a href="#contact" class="text-gray-700 hover:text-blue-600 transition duration-300">Contact</a>\n';
        nav += '</div>\n';
        nav += '</div>\n';
        nav += '</div>\n';
        nav += '</nav>\n';
        return nav;
    }
    
    private String generateHeroSection(PortfolioController.PersonalInfo info) {
        String hero = '<section id="home" class="gradient-bg min-h-screen flex items-center justify-center pt-16">\n';
        hero += '<div class="text-center text-white px-4">\n';
        
        if (info != null) {
            hero += '<h1 class="text-5xl md:text-7xl font-bold mb-4">' + escapeHtml(info.fullName) + '</h1>\n';
            hero += '<p class="text-xl md:text-2xl mb-6 typing-animation">' + escapeHtml(info.title) + '</p>\n';
            hero += '<p class="text-lg md:text-xl mb-8 max-w-3xl mx-auto">' + escapeHtml(info.bio) + '</p>\n';
            hero += '<div class="flex justify-center space-x-6">\n';
            
            if (String.isNotBlank(info.linkedinUrl)) {
                hero += '<a href="' + escapeHtml(info.linkedinUrl) + '" target="_blank" class="text-white hover:text-blue-300 transition duration-300">\n';
                hero += '<i class="fab fa-linkedin text-3xl"></i>\n';
                hero += '</a>\n';
            }
            
            if (String.isNotBlank(info.githubUrl)) {
                hero += '<a href="' + escapeHtml(info.githubUrl) + '" target="_blank" class="text-white hover:text-blue-300 transition duration-300">\n';
                hero += '<i class="fab fa-github text-3xl"></i>\n';
                hero += '</a>\n';
            }
        } else {
            hero += '<h1 class="text-5xl md:text-7xl font-bold mb-4">Portfolio</h1>\n';
            hero += '<p class="text-xl md:text-2xl mb-6 typing-animation">Professional Portfolio</p>\n';
            hero += '<div class="flex justify-center space-x-6">\n';
        }
        
        hero += '</div>\n';
        hero += '</div>\n';
        hero += '</section>\n';
        return hero;
    }
    
    private String generateSkillsSection(List<PortfolioController.SkillCategory> skillCategories) {
        String skills = '<section id="skills" class="py-20 bg-white">\n';
        skills += '<div class="max-w-7xl mx-auto px-4">\n';
        skills += '<h2 class="text-4xl font-bold text-center text-gray-800 mb-12">Technical Skills</h2>\n';
        
        if (skillCategories != null && !skillCategories.isEmpty()) {
            for (PortfolioController.SkillCategory category : skillCategories) {
                if (category != null && String.isNotBlank(category.category)) {
                    skills += '<div class="mb-12">\n';
                    skills += '<h3 class="text-2xl font-semibold text-gray-700 mb-6">' + escapeHtml(category.category) + '</h3>\n';
                    skills += '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">\n';
                    
                    if (category.skillList != null && !category.skillList.isEmpty()) {
                        for (PortfolioController.SkillInfo skill : category.skillList) {
                            if (skill != null && String.isNotBlank(skill.name)) {
                                skills += '<div class="bg-gray-50 p-6 rounded-lg card-hover">\n';
                                skills += '<div class="flex items-center mb-3">\n';
                                
                                if (String.isNotBlank(skill.iconName)) {
                                    skills += '<i class="' + escapeHtml(skill.iconName) + ' text-2xl text-blue-600 mr-3"></i>\n';
                                }
                                
                                skills += '<h4 class="text-lg font-semibold text-gray-800">' + escapeHtml(skill.name) + '</h4>\n';
                                skills += '</div>\n';
                                
                                if (String.isNotBlank(skill.proficiency)) {
                                    skills += '<p class="text-sm text-gray-600 mb-3">' + escapeHtml(skill.proficiency) + '</p>\n';
                                }
                                
                                if (String.isNotBlank(skill.description)) {
                                    skills += '<p class="text-sm text-gray-500">' + escapeHtml(skill.description) + '</p>\n';
                                }
                                
                                skills += '</div>\n';
                            }
                        }
                    }
                    
                    skills += '</div>\n';
                    skills += '</div>\n';
                }
            }
        } else {
            skills += '<p class="text-center text-gray-500">No skills available</p>\n';
        }
        
        skills += '</div>\n';
        skills += '</section>\n';
        return skills;
    }
    
    private String generateProjectsSection(List<PortfolioController.ProjectInfo> projects) {
        String projectSection = '<section id="projects" class="py-20 bg-gray-50">\n';
        projectSection += '<div class="max-w-7xl mx-auto px-4">\n';
        projectSection += '<h2 class="text-4xl font-bold text-center text-gray-800 mb-12">Featured Projects</h2>\n';
        projectSection += '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">\n';
        
        if (projects != null && !projects.isEmpty()) {
            for (PortfolioController.ProjectInfo project : projects) {
                if (project != null && String.isNotBlank(project.title)) {
                    projectSection += '<div class="bg-white rounded-lg shadow-lg overflow-hidden card-hover">\n';
                    projectSection += '<div class="p-6">\n';
                    projectSection += '<h3 class="text-xl font-semibold text-gray-800 mb-3">' + escapeHtml(project.title) + '</h3>\n';
                    
                    if (String.isNotBlank(project.description)) {
                        projectSection += '<p class="text-gray-600 mb-4">' + escapeHtml(project.description) + '</p>\n';
                    }
                    
                    if (project.technologies != null && !project.technologies.isEmpty()) {
                        projectSection += '<div class="flex flex-wrap gap-2 mb-4">\n';
                        for (String tech : project.technologies) {
                            if (String.isNotBlank(tech)) {
                                projectSection += '<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">' + escapeHtml(tech) + '</span>\n';
                            }
                        }
                        projectSection += '</div>\n';
                    }
                    
                    if (String.isNotBlank(project.businessImpact)) {
                        projectSection += '<p class="text-sm text-gray-500 mb-4"><strong>Impact:</strong> ' + escapeHtml(project.businessImpact) + '</p>\n';
                    }
                    
                    projectSection += '<div class="flex space-x-4">\n';
                    
                    if (String.isNotBlank(project.demoUrl)) {
                        projectSection += '<a href="' + escapeHtml(project.demoUrl) + '" target="_blank" class="text-blue-600 hover:text-blue-800 transition duration-300">\n';
                        projectSection += '<i class="fas fa-external-link-alt mr-1"></i>Demo\n';
                        projectSection += '</a>\n';
                    }
                    
                    if (String.isNotBlank(project.codeUrl)) {
                        projectSection += '<a href="' + escapeHtml(project.codeUrl) + '" target="_blank" class="text-gray-600 hover:text-gray-800 transition duration-300">\n';
                        projectSection += '<i class="fab fa-github mr-1"></i>Code\n';
                        projectSection += '</a>\n';
                    }
                    
                    projectSection += '</div>\n';
                    projectSection += '</div>\n';
                    projectSection += '</div>\n';
                }
            }
        } else {
            projectSection += '<p class="text-center text-gray-500">No projects available</p>\n';
        }
        
        projectSection += '</div>\n';
        projectSection += '</div>\n';
        projectSection += '</section>\n';
        return projectSection;
    }
    
    private String generateCertificationsSection(List<PortfolioController.CertificationInfo> certifications) {
        String certSection = '<section id="certifications" class="py-20 bg-white">\n';
        certSection += '<div class="max-w-7xl mx-auto px-4">\n';
        certSection += '<h2 class="text-4xl font-bold text-center text-gray-800 mb-12">Certifications</h2>\n';
        certSection += '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">\n';
        
        if (certifications != null && !certifications.isEmpty()) {
            for (PortfolioController.CertificationInfo cert : certifications) {
                if (cert != null && String.isNotBlank(cert.title)) {
                    certSection += '<div class="bg-gray-50 p-6 rounded-lg card-hover">\n';
                    certSection += '<h3 class="text-lg font-semibold text-gray-800 mb-2">' + escapeHtml(cert.title) + '</h3>\n';
                    
                    if (String.isNotBlank(cert.issuer)) {
                        certSection += '<p class="text-blue-600 font-medium mb-2">' + escapeHtml(cert.issuer) + '</p>\n';
                    }
                    
                    if (cert.dateObtained != null) {
                        certSection += '<p class="text-sm text-gray-600 mb-2">Obtained: ' + cert.dateObtained.format() + '</p>\n';
                    }
                    
                    if (String.isNotBlank(cert.credentialId)) {
                        certSection += '<p class="text-sm text-gray-500 mb-2">ID: ' + escapeHtml(cert.credentialId) + '</p>\n';
                    }
                    
                    if (String.isNotBlank(cert.status)) {
                        certSection += '<span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">' + escapeHtml(cert.status) + '</span>\n';
                    }
                    
                    if (String.isNotBlank(cert.verificationUrl)) {
                        certSection += '<div class="mt-4">\n';
                        certSection += '<a href="' + escapeHtml(cert.verificationUrl) + '" target="_blank" class="text-blue-600 hover:text-blue-800 transition duration-300 text-sm">\n';
                        certSection += '<i class="fas fa-certificate mr-1"></i>Verify\n';
                        certSection += '</a>\n';
                        certSection += '</div>\n';
                    }
                    
                    certSection += '</div>\n';
                }
            }
        } else {
            certSection += '<p class="text-center text-gray-500">No certifications available</p>\n';
        }
        
        certSection += '</div>\n';
        certSection += '</div>\n';
        certSection += '</section>\n';
        return certSection;
    }
    
    private String generateContactSection(PortfolioController.PersonalInfo info) {
        String contact = '<section id="contact" class="py-20 bg-gray-800 text-white">\n';
        contact += '<div class="max-w-7xl mx-auto px-4 text-center">\n';
        contact += '<h2 class="text-4xl font-bold mb-8">Get In Touch</h2>\n';
        contact += '<p class="text-xl mb-8">Ready to discuss your next Salesforce project?</p>\n';
        
        String emailAddress = (info != null && String.isNotBlank(info.email)) ? 
            escapeHtml(info.email) : 'contact@example.com';
        contact += '<a href="mailto:' + emailAddress + '" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">\n';
        contact += 'Contact Me\n';
        contact += '</a>\n';
        contact += '</div>\n';
        contact += '</section>\n';
        return contact;
    }
    
    private String generateFooter() {
        String footer = '<footer class="bg-gray-900 text-white py-8">\n';
        footer += '<div class="max-w-7xl mx-auto px-4 text-center">\n';
        footer += '<p>&copy; ' + String.valueOf(System.today().year()) + ' Generated by Salesforce Portfolio System. All rights reserved.</p>\n';
        footer += '</div>\n';
        footer += '</footer>\n';
        return footer;
    }
    
    private String generateScripts() {
        String scripts = '<script>\n';
        scripts += 'document.addEventListener("DOMContentLoaded", function() {\n';
        scripts += '  // Smooth scrolling for navigation links\n';
        scripts += '  document.querySelectorAll("a[href^=\'#\']").forEach(anchor => {\n';
        scripts += '    anchor.addEventListener("click", function (e) {\n';
        scripts += '      e.preventDefault();\n';
        scripts += '      document.querySelector(this.getAttribute("href")).scrollIntoView({\n';
        scripts += '        behavior: "smooth"\n';
        scripts += '      });\n';
        scripts += '    });\n';
        scripts += '  });\n';
        scripts += '});\n';
        scripts += '</script>\n';
        return scripts;
    }
}
