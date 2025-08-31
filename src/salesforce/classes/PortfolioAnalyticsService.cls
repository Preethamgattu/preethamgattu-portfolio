
public with sharing class PortfolioAnalyticsService {
    
    // Track portfolio visit
    @AuraEnabled
    public static void trackVisit(String ipAddress, String userAgent, String referrerUrl, String locationCountry, String locationCity) {
        try {
            Portfolio_Analytics__c analytics = new Portfolio_Analytics__c();
            analytics.Visit_Date__c = System.now();
            analytics.IP_Address__c = ipAddress;
            analytics.User_Agent__c = userAgent;
            analytics.Referrer_URL__c = referrerUrl;
            analytics.Location_Country__c = locationCountry;
            analytics.Location_City__c = locationCity;
            analytics.Page_Views__c = 1;
            
            insert analytics;
        } catch (Exception e) {
            System.debug('Error tracking visit: ' + e.getMessage());
            // Don't throw exception for analytics - shouldn't break main functionality
        }
    }
    
    // Get analytics summary
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getAnalyticsSummary() {
        try {
            Map<String, Object> summary = new Map<String, Object>();
            
            // Total visits
            Integer totalVisits = [SELECT COUNT() FROM Portfolio_Analytics__c];
            summary.put('totalVisits', totalVisits);
            
            // Unique visitors (based on IP)
            Integer uniqueVisitors = [
                SELECT COUNT_DISTINCT(IP_Address__c) uniqueCount 
                FROM Portfolio_Analytics__c
            ][0].get('uniqueCount');
            summary.put('uniqueVisitors', uniqueVisitors);
            
            // Visits this month
            Date startOfMonth = Date.today().toStartOfMonth();
            Integer monthlyVisits = [
                SELECT COUNT() 
                FROM Portfolio_Analytics__c 
                WHERE Visit_Date__c >= :startOfMonth
            ];
            summary.put('monthlyVisits', monthlyVisits);
            
            // Visits this week
            Date startOfWeek = Date.today().toStartOfWeek();
            Integer weeklyVisits = [
                SELECT COUNT() 
                FROM Portfolio_Analytics__c 
                WHERE Visit_Date__c >= :startOfWeek
            ];
            summary.put('weeklyVisits', weeklyVisits);
            
            // Top countries
            List<AggregateResult> topCountries = [
                SELECT Location_Country__c country, COUNT(Id) visitCount 
                FROM Portfolio_Analytics__c 
                WHERE Location_Country__c != null 
                GROUP BY Location_Country__c 
                ORDER BY COUNT(Id) DESC 
                LIMIT 5
            ];
            summary.put('topCountries', topCountries);
            
            // Recent visits
            List<Portfolio_Analytics__c> recentVisits = [
                SELECT Visit_Date__c, Location_Country__c, Location_City__c 
                FROM Portfolio_Analytics__c 
                ORDER BY Visit_Date__c DESC 
                LIMIT 10
            ];
            summary.put('recentVisits', recentVisits);
            
            return summary;
        } catch (Exception e) {
            System.debug('Error getting analytics summary: ' + e.getMessage());
            throw new AuraHandledException('Unable to retrieve analytics: ' + e.getMessage());
        }
    }
    
    // Get detailed analytics for charts
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getDetailedAnalytics(Integer days) {
        try {
            Map<String, Object> analytics = new Map<String, Object>();
            Date startDate = Date.today().addDays(-days);
            
            // Daily visits chart data
            List<AggregateResult> dailyVisits = [
                SELECT DAY_ONLY(Visit_Date__c) visitDate, COUNT(Id) visitCount 
                FROM Portfolio_Analytics__c 
                WHERE Visit_Date__c >= :startDate 
                GROUP BY DAY_ONLY(Visit_Date__c) 
                ORDER BY DAY_ONLY(Visit_Date__c)
            ];
            analytics.put('dailyVisits', dailyVisits);
            
            // Browser statistics
            List<AggregateResult> browserStats = [
                SELECT User_Agent__c userAgent, COUNT(Id) count 
                FROM Portfolio_Analytics__c 
                WHERE Visit_Date__c >= :startDate 
                  AND User_Agent__c != null 
                GROUP BY User_Agent__c 
                ORDER BY COUNT(Id) DESC 
                LIMIT 10
            ];
            analytics.put('browserStats', browserStats);
            
            // Referrer statistics
            List<AggregateResult> referrerStats = [
                SELECT Referrer_URL__c referrer, COUNT(Id) count 
                FROM Portfolio_Analytics__c 
                WHERE Visit_Date__c >= :startDate 
                  AND Referrer_URL__c != null 
                GROUP BY Referrer_URL__c 
                ORDER BY COUNT(Id) DESC 
                LIMIT 10
            ];
            analytics.put('referrerStats', referrerStats);
            
            // Time-based patterns (hourly)
            List<AggregateResult> hourlyPattern = [
                SELECT HOUR_IN_DAY(Visit_Date__c) hour, COUNT(Id) visits 
                FROM Portfolio_Analytics__c 
                WHERE Visit_Date__c >= :startDate 
                GROUP BY HOUR_IN_DAY(Visit_Date__c) 
                ORDER BY HOUR_IN_DAY(Visit_Date__c)
            ];
            analytics.put('hourlyPattern', hourlyPattern);
            
            return analytics;
        } catch (Exception e) {
            System.debug('Error getting detailed analytics: ' + e.getMessage());
            throw new AuraHandledException('Unable to retrieve detailed analytics: ' + e.getMessage());
        }
    }
    
    // Clean up old analytics data
    public static void cleanupOldData() {
        try {
            // Delete analytics data older than 1 year
            Date cutoffDate = Date.today().addYears(-1);
            List<Portfolio_Analytics__c> oldRecords = [
                SELECT Id 
                FROM Portfolio_Analytics__c 
                WHERE Visit_Date__c < :cutoffDate
            ];
            
            if (!oldRecords.isEmpty()) {
                delete oldRecords;
                System.debug('Cleaned up ' + oldRecords.size() + ' old analytics records');
            }
        } catch (Exception e) {
            System.debug('Error cleaning up old analytics data: ' + e.getMessage());
        }
    }
    
    // Generate analytics report
    @AuraEnabled
    public static String generateAnalyticsReport(String reportType, Integer days) {
        try {
            Map<String, Object> data = new Map<String, Object>();
            data.put('reportType', reportType);
            data.put('generatedDate', System.now());
            data.put('periodDays', days);
            
            if (reportType == 'summary') {
                data.put('summary', getAnalyticsSummary());
            } else if (reportType == 'detailed') {
                data.put('detailed', getDetailedAnalytics(days));
            }
            
            return JSON.serialize(data);
        } catch (Exception e) {
            System.debug('Error generating analytics report: ' + e.getMessage());
            throw new AuraHandledException('Unable to generate analytics report: ' + e.getMessage());
        }
    }
}
