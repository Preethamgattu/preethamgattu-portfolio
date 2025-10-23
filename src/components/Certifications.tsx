
import { featuredCertifications } from '../data/certifications';

const Certifications = () => {
  const certifications = featuredCertifications.map(cert => ({
    title: cert.name,
    issuer: cert.issuer,
    date: new Date(cert.issueDate).getFullYear().toString(),
    credentialId: cert.credentialId || '',
    status: 'Active',
    icon: '🏆',
    description: cert.description,
    credentialUrl: cert.credentialUrl
  }));

  return (
    <section id="certifications" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Certifications
          </h2>
          <div className="section-divider"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Official Salesforce certifications validating expertise and commitment to excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={cert.credentialId}
              className={`professional-card hover-lift text-center animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl mb-4">
                {cert.icon}
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {cert.title}
              </h3>

              <p className="text-muted-foreground mb-2">
                {cert.issuer}
              </p>

              <p className="text-sm text-muted-foreground mb-3">
                Issued: {cert.date}
              </p>

              <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full mb-4">
                <span className="text-xs font-medium">
                  {cert.status}
                </span>
              </div>

              <div className="pt-4 border-t">
                <p className="font-mono text-xs text-muted-foreground mb-2">
                  ID: {cert.credentialId}
                </p>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline"
                  >
                    Verify Credential →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="professional-card max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-4">Verification</h3>
            <p className="text-muted-foreground mb-4">
              All certifications can be verified through Salesforce Trailhead
            </p>
            <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200">
              Verify Credentials
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
