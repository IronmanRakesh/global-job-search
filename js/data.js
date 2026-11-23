/**
 * Global Job Search — Job Data & Feed Format
 * Target countries: EU states, Canada, UAE, Australia, New Zealand
 * Job feed format for importing real jobs from verified sources
 */

// ============================================================================
// Target Countries (EU states + CA, UAE, AU, NZ)
// ============================================================================

export const TARGET_COUNTRIES = [
  // European Union States
  { code: 'AT', name: 'Austria', flag: '🇦🇹', region: 'EU', currency: 'EUR', jobBoards: ['karriere.at', 'ams.at', 'willhaben.at'] },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', region: 'EU', currency: 'EUR', jobBoards: ['vdab.be', 'jobat.be', 'stepstone.be'] },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', region: 'EU', currency: 'BGN', jobBoards: ['jobs.bg', 'zaplata.bg'] },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷', region: 'EU', currency: 'EUR', jobBoards: ['mojposao.hr', 'posao.hr'] },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾', region: 'EU', currency: 'EUR', jobBoards: ['cypruswork.com', 'ergani.gov.cy'] },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', region: 'EU', currency: 'CZK', jobBoards: ['jobs.cz', 'prace.cz', 'profesia.cz'] },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', region: 'EU', currency: 'DKK', jobBoards: ['jobindex.dk', 'workindenmark.dk', 'jobnet.dk'] },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪', region: 'EU', currency: 'EUR', jobBoards: ['cvkeskus.ee', 'toopank.ee'] },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', region: 'EU', currency: 'EUR', jobBoards: ['tyomarkkinatori.fi', 'duunitori.fi', 'te-palvelut.fi'] },
  { code: 'FR', name: 'France', flag: '🇫🇷', region: 'EU', currency: 'EUR', jobBoards: ['pole-emploi.fr', 'appec.fr', 'cadremploi.fr', 'apec.fr'] },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', region: 'EU', currency: 'EUR', jobBoards: ['arbeitsagentur.de', 'stepstone.de', 'indeed.de', 'xing.com', 'linkedin.com'] },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', region: 'EU', currency: 'EUR', jobBoards: ['oaed.gr', 'kariera.gr', 'xrisieukairia.gr'] },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', region: 'EU', currency: 'HUF', jobBoards: ['profession.hu', 'jobline.hu', 'munka.hu'] },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', region: 'EU', currency: 'EUR', jobBoards: ['jobs.ie', 'irishjobs.ie', 'linkedin.com'] },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', region: 'EU', currency: 'EUR', jobBoards: ['infojobs.it', 'linkedin.com', 'indeed.it', 'lavoro.gov.it'] },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻', region: 'EU', currency: 'EUR', jobBoards: ['cv.lv', 'cvmarket.lv'] },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹', region: 'EU', currency: 'EUR', jobBoards: ['cvbankas.lt', 'cvmarket.lt'] },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', region: 'EU', currency: 'EUR', jobBoards: ['jobfinder.lu', 'adem.lu'] },
  { code: 'MT', name: 'Malta', flag: '🇲🇹', region: 'EU', currency: 'EUR', jobBoards: ['jobsearch.gov.mt', 'keepmeposted.com.mt'] },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', region: 'EU', currency: 'EUR', jobBoards: ['werk.nl', 'indeed.nl', 'linkedin.com', 'nationalevacaturebank.nl'] },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', region: 'EU', currency: 'PLN', jobBoards: ['pracuj.pl', 'olx.pl', 'jooble.org', 'linkedin.com'] },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', region: 'EU', currency: 'EUR', jobBoards: ['net-empregos.com', 'indeed.pt', 'iefp.pt'] },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', region: 'EU', currency: 'RON', jobBoards: ['ejobs.ro', 'bestjobs.eu', 'hipo.ro'] },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰', region: 'EU', currency: 'EUR', jobBoards: ['profesia.sk', 'istp.sk'] },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮', region: 'EU', currency: 'EUR', jobBoards: ['deloglasnik.si', 'moje-delo.com'] },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', region: 'EU', currency: 'EUR', jobBoards: ['infojobs.net', 'linkedin.com', 'indeed.es', 'sepe.es'] },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', region: 'EU', currency: 'SEK', jobBoards: ['arbetsformedlingen.se', 'linkedin.com', 'jobb.blocket.se'] },

  // Non-EU Target Countries
  { code: 'CA', name: 'Canada', flag: '🇨🇦', region: 'NA', currency: 'CAD', jobBoards: ['jobbank.gc.ca', 'indeed.ca', 'linkedin.com', 'glassdoor.ca', 'workopolis.com'] },
  { code: 'AE', name: 'UAE', flag: '🇦🇪', region: 'ME', currency: 'AED', jobBoards: ['linkedin.com', 'bayt.com', 'indeed.ae', 'gulftalent.com', 'naht.org.ae'] },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', region: 'OC', currency: 'AUD', jobBoards: ['jobsearch.gov.au', 'seek.com.au', 'indeed.com.au', 'linkedin.com', 'careerone.com.au'] },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', region: 'OC', currency: 'NZD', jobBoards: ['careers.govt.nz', 'seek.co.nz', 'trademe.co.nz', 'linkedin.com', 'indeed.co.nz'] },
];

// All countries for reference
export const ALL_COUNTRIES = [...TARGET_COUNTRIES];

// ============================================================================
// Job Types
// ============================================================================

export const JOB_TYPES = [
  { value: 'fulltime', label: 'Full-time', icon: 'briefcase', desc: 'Permanent positions' },
  { value: 'parttime', label: 'Part-time', icon: 'clock', desc: 'Flexible hours' },
  { value: 'freelance', label: 'Freelance', icon: 'users', desc: 'Project-based work' },
  { value: 'contract', label: 'Contract', icon: 'file-text', desc: 'Fixed-term roles' },
  { value: 'internship', label: 'Internship', icon: 'graduation-cap', desc: 'Entry-level experience' },
  { value: 'government', label: 'Government', icon: 'building', desc: 'Public sector roles' },
];

// ============================================================================
// Visa Types (relevant to target countries)
// ============================================================================

export const VISA_TYPES = [
  { value: 'none-required', label: 'No visa required / Citizen', description: 'Open to citizens and permanent residents only', countries: ['all'] },
  { value: 'work-visa-sponsored', label: 'Work visa sponsored', description: 'Employer sponsors work visa', countries: ['all'] },
  { value: 'eu-blue-card', label: 'EU Blue Card', description: 'High-skilled worker visa for EU member states', countries: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE'] },
  { value: 'working-holiday', label: 'Working holiday', description: 'Working holiday visa for young professionals (18-30/35)', countries: ['AU','NZ','CA','IE','DK','FR','DE','JP','KR','HK','TW'] },
  { value: 'digital-nomad', label: 'Digital nomad visa', description: 'Remote work visa for digital nomads', countries: ['ES','PT','HR','EE','CZ','DE','GR','IT','MT','RO','AE','CA','AU'] },
  { value: 'skilled-worker-uk', label: 'Skilled Worker (UK)', description: 'UK points-based skilled worker visa', countries: ['GB'] },
  { value: 'global-talent-uk', label: 'Global Talent (UK)', description: 'UK visa for leaders in tech, science, arts', countries: ['GB'] },
  { value: 'tech-visa-pt', label: 'Tech Visa (Portugal)', description: 'Portugal visa for tech professionals', countries: ['PT'] },
  { value: 'permanent-residency-path', label: 'PR pathway included', description: 'Role offers path to permanent residency', countries: ['CA','AU','NZ','DE','NL','IE'] },
  { value: 'tfwp-canada', label: 'TFWP (Canada)', description: 'Temporary Foreign Worker Program', countries: ['CA'] },
  { value: 'imp-canada', label: 'IMP (Canada)', description: 'International Mobility Program', countries: ['CA'] },
  { value: 'subclass-482', label: 'Subclass 482 (AU)', description: 'Temporary Skill Shortage visa', countries: ['AU'] },
  { value: 'subclass-186', label: 'Subclass 186 (AU)', description: 'Employer Nomination Scheme', countries: ['AU'] },
  { value: 'aews-nz', label: 'AEWV (NZ)', description: 'Accredited Employer Work Visa', countries: ['NZ'] },
];

// ============================================================================
// Experience Levels
// ============================================================================

export const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Entry (0-2 yrs)', minYears: 0, maxYears: 2 },
  { value: 'mid', label: 'Mid (2-5 yrs)', minYears: 2, maxYears: 5 },
  { value: 'senior', label: 'Senior (5-10 yrs)', minYears: 5, maxYears: 10 },
  { value: 'lead', label: 'Lead/Principal (10+ yrs)', minYears: 10, maxYears: 15 },
  { value: 'executive', label: 'Executive/C-level', minYears: 15, maxYears: 99 },
];

// ============================================================================
// Remote Policies
// ============================================================================

export const REMOTE_POLICIES = [
  { value: 'fully-remote', label: 'Fully Remote', icon: 'globe' },
  { value: 'hybrid', label: 'Hybrid', icon: 'layout' },
  { value: 'onsite', label: 'On-site', icon: 'building' },
  { value: 'relocation', label: 'Relocation Offered', icon: 'move' },
];

// ============================================================================
// Technologies / Skills
// ============================================================================

export const TECHNOLOGIES = [
  // Frontend
  { id: 'react', name: 'React', category: 'frontend', color: '#61dafb' },
  { id: 'vue', name: 'Vue.js', category: 'frontend', color: '#42b883' },
  { id: 'angular', name: 'Angular', category: 'frontend', color: '#dd0031' },
  { id: 'svelte', name: 'Svelte', category: 'frontend', color: '#ff3e00' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', color: '#000000' },
  { id: 'nuxt', name: 'Nuxt.js', category: 'frontend', color: '#00dc82' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', color: '#3178c6' },
  { id: 'javascript', name: 'JavaScript', category: 'frontend', color: '#f7df1e' },
  { id: 'html', name: 'HTML5', category: 'frontend', color: '#e34f26' },
  { id: 'css', name: 'CSS3', category: 'frontend', color: '#1572b6' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', color: '#06b6d4' },
  { id: 'styled-components', name: 'Styled Components', category: 'frontend', color: '#db7093' },
  { id: 'redux', name: 'Redux', category: 'frontend', color: '#764abc' },
  { id: 'zustand', name: 'Zustand', category: 'frontend', color: '#000000' },
  { id: 'testing-library', name: 'Testing Library', category: 'frontend', color: '#e33332' },
  { id: 'cypress', name: 'Cypress', category: 'frontend', color: '#17202c' },
  { id: 'playwright', name: 'Playwright', category: 'frontend', color: '#2eadae' },
  { id: 'storybook', name: 'Storybook', category: 'frontend', color: '#ff4785' },
  { id: 'webpack', name: 'Webpack', category: 'frontend', color: '#8dd6f9' },
  { id: 'vite', name: 'Vite', category: 'frontend', color: '#646cff' },

  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'backend', color: '#339933' },
  { id: 'python', name: 'Python', category: 'backend', color: '#3776ab' },
  { id: 'go', name: 'Go', category: 'backend', color: '#00add8' },
  { id: 'java', name: 'Java', category: 'backend', color: '#007396' },
  { id: 'kotlin', name: 'Kotlin', category: 'backend', color: '#7f52ff' },
  { id: 'csharp', name: 'C#', category: 'backend', color: '#239120' },
  { id: 'rust', name: 'Rust', category: 'backend', color: '#dea584' },
  { id: 'ruby', name: 'Ruby', category: 'backend', color: '#cc342d' },
  { id: 'php', name: 'PHP', category: 'backend', color: '#777bb4' },
  { id: 'express', name: 'Express.js', category: 'backend', color: '#000000' },
  { id: 'nestjs', name: 'NestJS', category: 'backend', color: '#e0234e' },
  { id: 'fastapi', name: 'FastAPI', category: 'backend', color: '#009688' },
  { id: 'django', name: 'Django', category: 'backend', color: '#092e20' },
  { id: 'spring', name: 'Spring Boot', category: 'backend', color: '#6db33f' },
  { id: 'dotnet', name: '.NET', category: 'backend', color: '#512bd4' },
  { id: 'gin', name: 'Gin', category: 'backend', color: '#00add8' },
  { id: 'echo', name: 'Echo', category: 'backend', color: '#000000' },
  { id: 'graphql', name: 'GraphQL', category: 'backend', color: '#e10098' },
  { id: 'grpc', name: 'gRPC', category: 'backend', color: '#4285f4' },
  { id: 'rest', name: 'REST APIs', category: 'backend', color: '#ff6c37' },

  // Database
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', color: '#336791' },
  { id: 'mysql', name: 'MySQL', category: 'database', color: '#4479a1' },
  { id: 'mongodb', name: 'MongoDB', category: 'database', color: '#47a248' },
  { id: 'redis', name: 'Redis', category: 'database', color: '#dc382d' },
  { id: 'elasticsearch', name: 'Elasticsearch', category: 'database', color: '#005571' },
  { id: 'dynamodb', name: 'DynamoDB', category: 'database', color: '#4053d6' },
  { id: 'cassandra', name: 'Cassandra', category: 'database', color: '#1287bf' },
  { id: 'sqlite', name: 'SQLite', category: 'database', color: '#003b57' },
  { id: 'supabase', name: 'Supabase', category: 'database', color: '#3ecf8e' },
  { id: 'firebase', name: 'Firebase', category: 'database', color: '#ffca28' },
  { id: 'prisma', name: 'Prisma', category: 'database', color: '#2d3748' },
  { id: 'typeorm', name: 'TypeORM', category: 'database', color: '#e0234e' },
  { id: 'sqlalchemy', name: 'SQLAlchemy', category: 'database', color: '#d71f00' },

  // Cloud & DevOps
  { id: 'aws', name: 'AWS', category: 'cloud', color: '#ff9900' },
  { id: 'gcp', name: 'Google Cloud', category: 'cloud', color: '#4285f4' },
  { id: 'azure', name: 'Azure', category: 'cloud', color: '#0078d4' },
  { id: 'docker', name: 'Docker', category: 'cloud', color: '#2496ed' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'cloud', color: '#326ce5' },
  { id: 'terraform', name: 'Terraform', category: 'cloud', color: '#7b42bc' },
  { id: 'ansible', name: 'Ansible', category: 'cloud', color: '#ee0000' },
  { id: 'github-actions', name: 'GitHub Actions', category: 'cloud', color: '#2088ff' },
  { id: 'gitlab-ci', name: 'GitLab CI', category: 'cloud', color: '#fc6d26' },
  { id: 'jenkins', name: 'Jenkins', category: 'cloud', color: '#d24939' },
  { id: 'circleci', name: 'CircleCI', category: 'cloud', color: '#343434' },
  { id: 'vercel', name: 'Vercel', category: 'cloud', color: '#000000' },
  { id: 'netlify', name: 'Netlify', category: 'cloud', color: '#00c7b7' },
  { id: 'cloudflare', name: 'Cloudflare', category: 'cloud', color: '#f38020' },
  { id: 'prometheus', name: 'Prometheus', category: 'cloud', color: '#e6522c' },
  { id: 'grafana', name: 'Grafana', category: 'cloud', color: '#f46800' },
  { id: 'datadog', name: 'Datadog', category: 'cloud', color: '#632ca6' },
  { id: 'sentry', name: 'Sentry', category: 'cloud', color: '#362d59' },

  // Mobile
  { id: 'react-native', name: 'React Native', category: 'mobile', color: '#61dafb' },
  { id: 'flutter', name: 'Flutter', category: 'mobile', color: '#02569b' },
  { id: 'swift', name: 'Swift', category: 'mobile', color: '#fa7343' },
  { id: 'kotlin-multiplatform', name: 'Kotlin Multiplatform', category: 'mobile', color: '#7f52ff' },
  { id: 'expo', name: 'Expo', category: 'mobile', color: '#000020' },
  { id: 'xamarin', name: 'Xamarin', category: 'mobile', color: '#3498db' },

  // Data & AI
  { id: 'machine-learning', name: 'Machine Learning', category: 'data', color: '#ff6f00' },
  { id: 'deep-learning', name: 'Deep Learning', category: 'data', color: '#d50000' },
  { id: 'tensorflow', name: 'TensorFlow', category: 'data', color: '#ff6f00' },
  { id: 'pytorch', name: 'PyTorch', category: 'data', color: '#ee4c2c' },
  { id: 'pandas', name: 'Pandas', category: 'data', color: '#150458' },
  { id: 'numpy', name: 'NumPy', category: 'data', color: '#013243' },
  { id: 'spark', name: 'Apache Spark', category: 'data', color: '#e25a1c' },
  { id: 'kafka', name: 'Apache Kafka', category: 'data', color: '#231f20' },
  { id: 'airflow', name: 'Apache Airflow', category: 'data', color: '#017cee' },
  { id: 'dbt', name: 'dbt', category: 'data', color: '#ff694b' },
  { id: 'snowflake', name: 'Snowflake', category: 'data', color: '#29b5e8' },
  { id: 'bigquery', name: 'BigQuery', category: 'data', color: '#4285f4' },
  { id: 'looker', name: 'Looker', category: 'data', color: '#4285f4' },
  { id: 'tableau', name: 'Tableau', category: 'data', color: '#e97627' },
  { id: 'powerbi', name: 'Power BI', category: 'data', color: '#f2c811' },

  // Other
  { id: 'git', name: 'Git', category: 'tools', color: '#f05032' },
  { id: 'linux', name: 'Linux', category: 'tools', color: '#fcc624' },
  { id: 'bash', name: 'Bash/Shell', category: 'tools', color: '#4eaa25' },
  { id: 'vim', name: 'Vim/Neovim', category: 'tools', color: '#019733' },
  { id: 'vscode', name: 'VS Code', category: 'tools', color: '#007acc' },
  { id: 'figma', name: 'Figma', category: 'design', color: '#f24e1e' },
  { id: 'sketch', name: 'Sketch', category: 'design', color: '#f7b500' },
  { id: 'jira', name: 'Jira', category: 'tools', color: '#0052cc' },
  { id: 'confluence', name: 'Confluence', category: 'tools', color: '#172b4d' },
  { id: 'notion', name: 'Notion', category: 'tools', color: '#000000' },
  { id: 'slack', name: 'Slack', category: 'tools', color: '#4a154b' },
  { id: 'agile', name: 'Agile/Scrum', category: 'process', color: '#009966' },
  { id: 'tdd', name: 'TDD', category: 'process', color: '#ff6b6b' },
  { id: 'ci-cd', name: 'CI/CD', category: 'process', color: '#4ecdc4' },
  { id: 'microservices', name: 'Microservices', category: 'architecture', color: '#45b7d1' },
  { id: 'serverless', name: 'Serverless', category: 'architecture', color: '#96ceb4' },
  { id: 'event-driven', name: 'Event-Driven', category: 'architecture', color: '#ffeaa7' },
];

// ============================================================================
// Job Feed Format (for importing real jobs)
// ============================================================================

/**
 * Job Feed Schema (JSON)
 *
 * {
 *   "version": "1.0",
 *   "source": "linkedin|indeed|glassdoor|company-career|government-portal|job-board",
 *   "sourceUrl": "https://...",
 *   "fetchedAt": "2025-01-15T10:30:00Z",
 *   "jobs": [
 *     {
 *       "id": "unique-job-id",
 *       "title": "Senior Software Engineer",
 *       "company": "Stripe",
 *       "companyType": "private|government|nonprofit",
 *       "companyUrl": "https://stripe.com",
 *       "companyLogoUrl": "https://stripe.com/logo.png",
 *       "location": {
 *         "city": "San Francisco",
 *         "region": "CA",
 *         "country": "US",
 *         "remotePolicy": "hybrid|fully-remote|onsite|relocation"
 *       },
 *       "jobType": "fulltime|parttime|freelance|contract|internship|government",
 *       "experienceLevel": "entry|mid|senior|lead|executive",
 *       "salary": {
 *         "min": 180000,
 *         "max": 250000,
 *         "currency": "USD",
 *         "period": "yearly|hourly|monthly",
 *         "disclosed": true
 *       },
 *       "visaSupport": ["work-visa-sponsored", "h1b", "permanent-residency-path"],
 *       "description": "Full job description...",
 *       "requirements": {
 *         "required": ["5+ years experience", "React", "TypeScript"],
 *         "preferred": ["GraphQL", "AWS"]
 *       },
 *       "skills": ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
 *       "applyUrl": "https://stripe.com/careers/senior-software-engineer-123",
 *       "postedAt": "2025-01-10T09:00:00Z",
 *       "expiresAt": "2025-02-10T09:00:00Z",
 *       "isVerified": true,
 *       "verificationSource": "company-career-page",
 *       "sourceJobId": "external-job-id-from-source"
 *     }
 *   ]
 * }
 */

// ============================================================================
// Sample Jobs Data (for development/testing - replace with real feed)
// ============================================================================

function generateSampleJobs(count) {
  const companies = [
    { name: 'Stripe', type: 'private', logo: 'S', color: '#635bff', domain: 'stripe.com', countries: ['US','IE','DE','FR','NL','SG','AU','CA'] },
    { name: 'Shopify', type: 'private', logo: 'S', color: '#96bf48', domain: 'shopify.com', countries: ['CA','US','IE','AU','NZ','DE','UK'] },
    { name: 'Vercel', type: 'private', logo: 'V', color: '#000000', domain: 'vercel.com', countries: ['US','CA','NL','DE','SG','AU'] },
    { name: 'Netlify', type: 'private', logo: 'N', color: '#00c7b7', domain: 'netlify.com', countries: ['US','CA','AU'] },
    { name: 'Linear', type: 'private', logo: 'L', color: '#570df8', domain: 'linear.app', countries: ['US','CA','NL','DE'] },
    { name: 'Notion', type: 'private', logo: 'N', color: '#000000', domain: 'notion.so', countries: ['US','JP','KR','SG','AU','DE','FR'] },
    { name: 'Figma', type: 'private', logo: 'F', color: '#f24e1e', domain: 'figma.com', countries: ['US','GB','DE','FR','JP','AU','CA'] },
    { name: 'Discord', type: 'private', logo: 'D', color: '#5865f2', domain: 'discord.com', countries: ['US','GB','DE','FR','JP','AU','BR'] },
    { name: 'Airtable', type: 'private', logo: 'A', color: '#18bfff', domain: 'airtable.com', countries: ['US','GB','DE','FR','AU'] },
    { name: 'Retool', type: 'private', logo: 'R', color: '#00d4aa', domain: 'retool.com', countries: ['US','GB','DE'] },
    { name: 'GitHub', type: 'private', logo: 'G', color: '#000000', domain: 'github.com', countries: ['US','GB','DE','JP','AU','CA','IN'] },
    { name: 'GitLab', type: 'private', logo: 'G', color: '#fc6d26', domain: 'gitlab.com', countries: ['NL','US','GB','DE','FR','AU','CA'] },
    { name: 'Atlassian', type: 'private', logo: 'A', color: '#0052cc', domain: 'atlassian.com', countries: ['AU','US','NL','DE','JP','IN'] },
    { name: 'Datadog', type: 'private', logo: 'D', color: '#632ca6', domain: 'datadoghq.com', countries: ['US','FR','GB','JP','AU','CA'] },
    { name: 'Snyk', type: 'private', logo: 'S', color: '#4c4a73', domain: 'snyk.io', countries: ['GB','US','IL','PL','RO','PT'] },
    { name: 'Supabase', type: 'private', logo: 'S', color: '#3ecf8e', domain: 'supabase.com', countries: ['SG','US','PT','BR','IN'] },
    { name: 'Government of Canada', type: 'government', logo: 'GC', color: '#ff0000', domain: 'canada.ca', countries: ['CA'] },
    { name: 'Bundesagentur für Arbeit', type: 'government', logo: 'DE', color: '#000000', domain: 'arbeitsagentur.de', countries: ['DE'] },
    { name: 'Pôle Emploi', type: 'government', logo: 'FR', color: '#002868', domain: 'pole-emploi.fr', countries: ['FR'] },
    { name: 'Jobsearch.gov.au', type: 'government', logo: 'AU', color: '#00008b', domain: 'jobsearch.gov.au', countries: ['AU'] },
    { name: 'Careers.govt.nz', type: 'government', logo: 'NZ', color: '#000000', domain: 'careers.govt.nz', countries: ['NZ'] },
    { name: 'Werk.nl', type: 'government', logo: 'NL', color: '#002868', domain: 'werk.nl', countries: ['NL'] },
    { name: 'Arbetsförmedlingen', type: 'government', logo: 'SE', color: '#005eb8', domain: 'arbetsformedlingen.se', countries: ['SE'] },
  ];

  const jobTitles = [
    'Senior Software Engineer', 'Staff Software Engineer', 'Principal Engineer',
    'Engineering Manager', 'Director of Engineering', 'VP Engineering',
    'Frontend Engineer', 'Backend Engineer', 'Full Stack Engineer',
    'Mobile Engineer', 'iOS Engineer', 'Android Engineer', 'Flutter Engineer',
    'DevOps Engineer', 'Platform Engineer', 'Site Reliability Engineer',
    'Security Engineer', 'Data Engineer', 'ML Engineer', 'AI Engineer',
    'QA Engineer', 'SDET', 'Test Engineer',
    'Solutions Architect', 'Technical Architect', 'Enterprise Architect',
    'Data Scientist', 'Senior Data Scientist', 'Principal Data Scientist',
    'ML Research Scientist', 'Applied Scientist', 'Research Engineer',
    'Data Analyst', 'Business Intelligence Engineer', 'Analytics Engineer',
    'MLOps Engineer', 'AI Platform Engineer',
    'Product Manager', 'Senior Product Manager', 'Group Product Manager',
    'Product Designer', 'UX Designer', 'UI Designer', 'Product Design Lead',
    'Design Systems Engineer', 'UX Researcher', 'Content Designer',
    'Technical Program Manager', 'Engineering Program Manager',
    'Developer Relations Engineer', 'Developer Advocate', 'Technical Writer',
    'Sales Engineer', 'Solutions Engineer', 'Pre-sales Engineer',
    'Support Engineer', 'Customer Success Engineer',
  ];

  const targetCountries = TARGET_COUNTRIES.map(c => c.code);
  const locations = [];

  // Add major cities for target countries
  const citiesByCountry = {
    'DE': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Cologne'],
    'FR': ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes'],
    'NL': ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven'],
    'ES': ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Bilbao'],
    'IT': ['Milan', 'Rome', 'Turin', 'Bologna', 'Florence'],
    'IE': ['Dublin', 'Cork', 'Galway', 'Limerick'],
    'SE': ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala'],
    'DK': ['Copenhagen', 'Aarhus', 'Odense'],
    'FI': ['Helsinki', 'Espoo', 'Tampere', 'Vantaa'],
    'AT': ['Vienna', 'Graz', 'Linz', 'Salzburg'],
    'BE': ['Brussels', 'Antwerp', 'Ghent', 'Bruges'],
    'PL': ['Warsaw', 'Krakow', 'Wroclaw', 'Poznan', 'Gdansk'],
    'PT': ['Lisbon', 'Porto', 'Braga', 'Faro'],
    'CZ': ['Prague', 'Brno', 'Ostrava'],
    'AT': ['Vienna', 'Graz', 'Linz'],
    'CA': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton', 'Waterloo'],
    'AU': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra'],
    'NZ': ['Auckland', 'Wellington', 'Christchurch', 'Hamilton'],
    'AE': ['Dubai', 'Abu Dhabi', 'Sharjah'],
  };

  Object.entries(citiesByCountry).forEach(([country, cities]) => {
    if (targetCountries.includes(country)) {
      cities.forEach(city => {
        locations.push({ city, country });
      });
    }
  });

  const techStacks = [
    ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    ['Vue.js', 'Nuxt', 'Go', 'Redis', 'GCP'],
    ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Kubernetes'],
    ['Java', 'Spring Boot', 'MySQL', 'Kafka', 'AWS'],
    ['Go', 'gRPC', 'PostgreSQL', 'Redis', 'GCP'],
    ['Rust', 'Actix', 'PostgreSQL', 'Docker', 'AWS'],
    ['C#', '.NET', 'SQL Server', 'Azure', 'Kubernetes'],
    ['TypeScript', 'Next.js', 'Prisma', 'PostgreSQL', 'Vercel'],
    ['React Native', 'TypeScript', 'Firebase', 'Expo'],
    ['Flutter', 'Dart', 'Firebase', 'GCP'],
    ['Swift', 'SwiftUI', 'Core Data', 'iCloud'],
    ['Kotlin', 'Jetpack Compose', 'Room', 'Koin'],
    ['Python', 'Django', 'PostgreSQL', 'Celery', 'AWS'],
    ['Ruby', 'Rails', 'PostgreSQL', 'Sidekiq', 'Heroku'],
    ['Elixir', 'Phoenix', 'PostgreSQL', 'LiveView', 'Fly.io'],
  ];

  const visaTypes = [
    ['none-required'],
    ['work-visa-sponsored'],
    ['work-visa-sponsored', 'eu-blue-card'],
    ['work-visa-sponsored', 'tfwp-canada'],
    ['work-visa-sponsored', 'imp-canada'],
    ['work-visa-sponsored', 'subclass-482'],
    ['work-visa-sponsored', 'subclass-186'],
    ['work-visa-sponsored', 'aews-nz'],
    ['digital-nomad'],
    ['working-holiday'],
    ['permanent-residency-path'],
    ['eu-blue-card'],
    ['tech-visa-pt'],
    ['skilled-worker-uk'],
    ['global-talent-uk'],
  ];

  const requirementsTemplates = [
    { required: ['5+ years professional experience', 'Strong system design skills', 'Production experience with distributed systems'], preferred: ['Event-driven architecture', 'Open source contributions', 'Technical blogging/speaking'] },
    { required: ['3+ years with React/TypeScript', 'State management (Redux/Zustand)', 'Testing (Jest, Cypress/Playwright)'], preferred: ['Next.js', 'Design systems', 'Accessibility (WCAG)'] },
    { required: ['4+ years Python', 'FastAPI/Django/Flask', 'PostgreSQL, Redis', 'Docker, Kubernetes'], preferred: ['ML experience', 'Data pipelines', 'Observability'] },
    { required: ['3+ years Go', 'Microservices, gRPC', 'PostgreSQL, Redis', 'Kubernetes, AWS/GCP'], preferred: ['Service mesh', 'Observability', 'Open source'] },
    { required: ['5+ years Java/Spring Boot', 'System design', 'MySQL/PostgreSQL', 'Kafka, Redis'], preferred: ['Event sourcing/CQRS', 'Domain-driven design', 'Cloud-native'] },
    { required: ['3+ years mobile', 'App store deployment', 'CI/CD for mobile'], preferred: ['Cross-platform', 'Performance optimization', 'Offline-first'] },
    { required: ['3+ years DevOps/SRE', 'Kubernetes, Terraform', 'AWS/GCP/Azure', 'Observability stack'], preferred: ['GitOps', 'Platform engineering', 'Security hardening'] },
    { required: ['4+ years Data Engineering', 'Python/SQL', 'Spark/Airflow/dbt', 'Snowflake/BigQuery/Redshift'], preferred: ['MLOps', 'Real-time streaming', 'Data governance'] },
    { required: ['3+ years Product Management', 'B2B/B2C SaaS', 'Data-driven decisions', 'Technical background'], preferred: ['PLG experience', 'API/platform products', 'International expansion'] },
  ];

  const jobs = [];

  for (let i = 0; i < count; i++) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const title = jobTitles[Math.floor(Math.random() * jobTitles.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const techStack = techStacks[Math.floor(Math.random() * techStacks.length)];
    const visa = visaTypes[Math.floor(Math.random() * visaTypes.length)];
    const reqTemplate = requirementsTemplates[Math.floor(Math.random() * requirementsTemplates.length)];

    const jobTypeValues = ['fulltime', 'parttime', 'freelance', 'contract', 'internship', 'government'];
    const jobType = jobTypeValues[Math.floor(Math.random() * jobTypeValues.length)];

    const experienceValues = ['entry', 'mid', 'senior', 'lead', 'executive'];
    const experience = experienceValues[Math.floor(Math.random() * experienceValues.length)];

    const remoteValues = ['fully-remote', 'hybrid', 'onsite', 'relocation'];
    const remote = remoteValues[Math.floor(Math.random() * remoteValues.length)];

    const baseSalary = { entry: [50000, 100000], mid: [80000, 150000], senior: [120000, 250000], lead: [180000, 350000], executive: [250000, 500000] };
    const [minSal, maxSal] = baseSalary[experience];
    const salaryMin = Math.round((minSal + Math.random() * (maxSal - minSal) * 0.3) / 10000) * 10000;
    const salaryMax = Math.round((salaryMin + Math.random() * (maxSal - salaryMin) * 0.5) / 10000) * 10000;

    const eligibilityTypes = ['eligible', 'near', 'not-eligible'];
    const eligibilityWeights = [0.45, 0.35, 0.2];
    const rand = Math.random();
    let eligibility = 'not-eligible';
    if (rand < eligibilityWeights[0]) eligibility = 'eligible';
    else if (rand < eligibilityWeights[0] + eligibilityWeights[1]) eligibility = 'near';

    const postedDaysAgo = Math.floor(Math.random() * 30);
    const postedDate = new Date();
    postedDate.setDate(postedDate.getDate() - postedDaysAgo);

    const countryObj = TARGET_COUNTRIES.find(c => c.code === location.country);
    const currency = countryObj?.currency || 'USD';

    const job = {
      id: `job-${i + 1}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      company: company.name,
      companyType: company.type,
      companyLogo: company.logo,
      companyColor: company.color,
      companyDomain: company.domain,
      location: location.city,
      country: location.country,
      countryFlag: countryObj?.flag || '🌍',
      remote: true,
      remotePolicy: remote,
      jobType,
      experience,
      salaryMin,
      salaryMax,
      salaryCurrency: currency,
      techStack,
      visaTypes: visa,
      eligibility,
      requirements: { required: [...reqTemplate.required], preferred: [...reqTemplate.preferred] },
      description: `We are looking for a ${title} to join our team at ${company.name}. You will work on challenging problems at scale, collaborate with talented engineers, and have a direct impact on our product and customers.`,
      applyUrl: `https://${company.domain}/careers/${title.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      postedDate: postedDate.toISOString(),
      expiresDate: new Date(postedDate.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      isVerified: true,
      source: 'company-careers',
    };

    jobs.push(job);
  }

  return jobs;
}

// Generate jobs only for target countries
export const SAMPLE_JOBS = generateSampleJobs(200);

// ============================================================================
// Helper Functions
// ============================================================================

export function formatSalary(min, max, currency = 'USD') {
  const fmt = (n) => (n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : `${(n / 1000).toFixed(0)}K`);
  const symbols = { USD: '$', EUR: '€', GBP: '£', CAD: 'CA$', AUD: 'A$', NZD: 'NZ$', AED: 'AED', SEK: 'kr', DKK: 'kr', NOK: 'kr', CHF: 'CHF', PLN: 'zł', CZK: 'Kč', HUF: 'Ft', BGN: 'лв', RON: 'lei', BGN: 'лв' };
  const sym = symbols[currency] || '$';
  if (min && max) return `${sym}${fmt(min)} – ${sym}${fmt(max)}`;
  if (min) return `From ${sym}${fmt(min)}`;
  if (max) return `Up to ${sym}${fmt(max)}`;
  return 'Competitive';
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function getCountryName(code) {
  const country = TARGET_COUNTRIES.find(c => c.code === code);
  return country ? country.name : code;
}

export function getCountryFlag(code) {
  const country = TARGET_COUNTRIES.find(c => c.code === code);
  return country ? country.flag : '🌍';
}

export function getCountryCurrency(code) {
  const country = TARGET_COUNTRIES.find(c => c.code === code);
  return country ? country.currency : 'USD';
}

export function getTechCategory(techId) {
  const tech = TECHNOLOGIES.find(t => t.id === techId);
  return tech ? tech.category : 'other';
}

export function getTechColor(techId) {
  const tech = TECHNOLOGIES.find(t => t.id === techId);
  return tech ? tech.color : '#6b6b7b';
}

export function filterJobs(jobs, filters) {
  return jobs.filter(job => {
    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      const searchable = `${job.title} ${job.company} ${job.techStack.join(' ')} ${job.description}`.toLowerCase();
      if (!searchable.includes(kw)) return false;
    }
    if (filters.jobType?.length && !filters.jobType.includes(job.jobType)) return false;
    if (filters.country?.length && !filters.country.includes(job.country)) return false;
    if (filters.visaType?.length) {
      const hasVisa = job.visaTypes.some(v => filters.visaType.includes(v));
      if (!hasVisa) return false;
    }
    if (filters.salaryMin && job.salaryMax < filters.salaryMin) return false;
    if (filters.salaryMax && job.salaryMin > filters.salaryMax) return false;
    if (filters.techStack?.length) {
      const hasTech = job.techStack.some(t => filters.techStack.some(f => f.toLowerCase() === t.toLowerCase()));
      if (!hasTech) return false;
    }
    if (filters.experience?.length && !filters.experience.includes(job.experience)) return false;
    if (filters.remote?.length && !filters.remote.includes(job.remotePolicy)) return false;
    return true;
  });
}

export function sortJobs(jobs, sortBy) {
  const sorted = [...jobs];
  switch (sortBy) {
    case 'date-desc': return sorted.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    case 'salary-desc': return sorted.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0));
    case 'salary-asc': return sorted.sort((a, b) => (a.salaryMin || 0) - (b.salaryMin || 0));
    case 'title-asc': return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'relevance':
    default:
      const eligibilityOrder = { eligible: 0, near: 1, 'not-eligible': 2 };
      return sorted.sort((a, b) => {
        const diff = eligibilityOrder[a.eligibility] - eligibilityOrder[b.eligibility];
        if (diff !== 0) return diff;
        return new Date(b.postedDate) - new Date(a.postedDate);
      });
  }
}

export function paginateJobs(jobs, page, pageSize) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return { jobs: jobs.slice(start, end), total: jobs.length, totalPages: Math.ceil(jobs.length / pageSize), currentPage: page, pageSize };
}

// ============================================================================
// Resume Matching (Mock)
// ============================================================================

export function parseResume(file) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockSkills = ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'Redis', 'Git', 'CI/CD', 'Testing', 'System Design', 'Microservices'];
      resolve({
        skills: mockSkills, experience: 'senior', preferredLocations: ['US','CA','GB','DE','AU','NZ','Remote'],
        visaRequirements: ['work-visa-sponsored', 'h1b', 'tn-visa', 'permanent-residency-path'],
        jobTypes: ['fulltime', 'contract'], remotePreference: ['fully-remote', 'hybrid', 'relocation'],
        salaryExpectation: 150000, rawText: `Mock resume content for ${file.name}`,
      });
    }, 1500);
  });
}

export function matchJobsToResume(jobs, resumeData) {
  return jobs.map(job => {
    let score = 0;
    const matchedSkills = [];
    const missingSkills = [];
    const jobSkillsLower = job.techStack.map(s => s.toLowerCase());
    const resumeSkillsLower = resumeData.skills.map(s => s.toLowerCase());
    job.techStack.forEach(skill => {
      if (resumeSkillsLower.includes(skill.toLowerCase())) { score += 40 / job.techStack.length; matchedSkills.push(skill); }
      else { missingSkills.push(skill); }
    });
    const expOrder = { entry: 0, mid: 1, senior: 2, lead: 3, executive: 4 };
    const resumeExp = expOrder[resumeData.experience] || 1;
    const jobExp = expOrder[job.experience] || 1;
    if (resumeExp >= jobExp) score += 20; else if (resumeExp === jobExp - 1) score += 10;
    if (resumeData.preferredLocations.includes('GLOBAL') || resumeData.preferredLocations.includes(job.country) || (job.remote && resumeData.preferredLocations.includes('Remote'))) score += 15;
    const hasVisaMatch = job.visaTypes.some(v => resumeData.visaRequirements.includes(v));
    if (hasVisaMatch) score += 15;
    if (resumeData.jobTypes.includes(job.jobType)) score += 5;
    if (resumeData.remotePreference.includes(job.remotePolicy)) score += 5;
    if (job.salaryMax >= resumeData.salaryExpectation) score += 5;
    if (job.salaryMin >= resumeData.salaryExpectation) score += 5;
    score = Math.min(Math.round(score), 100);
    let eligibility = 'not-eligible', todoItems = [];
    if (score >= 80) eligibility = 'eligible';
    else if (score >= 60) {
      eligibility = 'near';
      if (missingSkills.length > 0) todoItems.push(`Learn ${missingSkills.slice(0, 3).join(', ')}`);
      if (resumeExp < jobExp) todoItems.push(`Gain ${jobExp - resumeExp} more year(s) of experience`);
      if (!hasVisaMatch && job.visaTypes.some(v => v !== 'none-required')) todoItems.push(`Secure visa sponsorship (${job.visaTypes.filter(v => v !== 'none-required').join(', ')})`);
      if (job.salaryMax < resumeData.salaryExpectation) todoItems.push(`Salary expectation ($${formatSalary(resumeData.salaryExpectation)}) exceeds range`);
    } else {
      eligibility = 'not-eligible';
      if (missingSkills.length > 0) todoItems.push(`Missing core skills: ${missingSkills.slice(0, 5).join(', ')}`);
      if (resumeExp < jobExp - 1) todoItems.push(`Significant experience gap (need ${jobExp - resumeExp} more years)`);
      if (!hasVisaMatch && job.visaTypes.some(v => v !== 'none-required')) todoItems.push(`Visa sponsorship required but not offered`);
    }
    if (eligibility === 'eligible' && job.requirements.preferred.length > 0) todoItems.push(`Preferred: ${job.requirements.preferred.slice(0, 2).join(', ')}`);
    return { ...job, matchScore: score, eligibility, matchedSkills, missingSkills, todoItems: todoItems.slice(0, 5), hasVisaMatch };
  }).sort((a, b) => b.matchScore - a.matchScore);
}