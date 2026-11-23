/**
 * Global Job Search — Job Data
 * Mock data for demonstration. In production, this would come from an API.
 */

// ============================================================================
// Countries
// ============================================================================

export const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸', jobs: 245000 },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', jobs: 98000 },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', jobs: 87000 },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', jobs: 76000 },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', jobs: 54000 },
  { code: 'FR', name: 'France', flag: '🇫🇷', jobs: 52000 },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', jobs: 48000 },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', jobs: 42000 },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', jobs: 38000 },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', jobs: 35000 },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', jobs: 34000 },
  { code: 'AE', name: 'UAE', flag: '🇦🇪', jobs: 32000 },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', jobs: 29000 },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', jobs: 24000 },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', jobs: 22000 },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', jobs: 21000 },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', jobs: 19000 },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', jobs: 18000 },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', jobs: 17000 },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', jobs: 16000 },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', jobs: 15000 },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', jobs: 14000 },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', jobs: 13000 },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', jobs: 12000 },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', jobs: 11000 },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', jobs: 10000 },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', jobs: 9500 },
  { code: 'IN', name: 'India', flag: '🇮🇳', jobs: 9000 },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', jobs: 8500 },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼', jobs: 8000 },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', jobs: 7500 },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', jobs: 7000 },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', jobs: 6500 },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', jobs: 6000 },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', jobs: 5500 },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', jobs: 5000 },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', jobs: 4500 },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', jobs: 4000 },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', jobs: 3500 },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', jobs: 3000 },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', jobs: 2500 },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', jobs: 2000 },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', jobs: 1800 },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', jobs: 1500 },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', jobs: 1200 },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', jobs: 1000 },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', jobs: 800 },
  { code: 'OTHER', name: 'Other Countries', flag: '🌍', jobs: 15000 },
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
// Job Types
// ============================================================================

export const JOB_TYPES = [
  { value: 'fulltime', label: 'Full-time', icon: 'briefcase', count: 580000 },
  { value: 'parttime', label: 'Part-time', icon: 'clock', count: 120000 },
  { value: 'freelance', label: 'Freelance', icon: 'users', count: 89000 },
  { value: 'contract', label: 'Contract', icon: 'file-text', count: 67000 },
  { value: 'internship', label: 'Internship', icon: 'graduation-cap', count: 45000 },
  { value: 'government', label: 'Government', icon: 'building', count: 32000 },
];

// ============================================================================
// Visa Types
// ============================================================================

export const VISA_TYPES = [
  { value: 'none-required', label: 'No visa required / Citizen', description: 'Open to citizens and permanent residents only' },
  { value: 'work-visa-sponsored', label: 'Work visa sponsored', description: 'Employer sponsors work visa (H-1B, Skilled Worker, etc.)' },
  { value: 'digital-nomad', label: 'Digital nomad visa', description: 'Remote work visa for digital nomads' },
  { value: 'working-holiday', label: 'Working holiday', description: 'Working holiday visa for young professionals (18-30/35)' },
  { value: 'eu-blue-card', label: 'EU Blue Card', description: 'High-skilled worker visa for EU member states' },
  { value: 'h1b', label: 'H-1B (US)', description: 'US specialty occupation visa, employer-sponsored' },
  { value: 'skilled-worker-uk', label: 'Skilled Worker (UK)', description: 'UK points-based skilled worker visa' },
  { value: 'tn-visa', label: 'TN Visa (US/CA/MX)', description: 'NAFTA professional visa for US, Canada, Mexico citizens' },
  { value: 'permanent-residency-path', label: 'PR pathway included', description: 'Role offers path to permanent residency/green card' },
  { value: 'l1-visa', label: 'L-1 Visa (US)', description: 'Intracompany transferee visa for US' },
  { value: 'o1-visa', label: 'O-1 Visa (US)', description: 'Extraordinary ability visa for US' },
  { value: 'global-talent-uk', label: 'Global Talent (UK)', description: 'UK visa for leaders in tech, science, arts' },
  { value: 'tech-visa-pt', label: 'Tech Visa (Portugal)', description: 'Portugal visa for tech professionals' },
  { value: 'startup-visa', label: 'Startup visa', description: 'Visa for entrepreneurs starting a business' },
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
// Mock Jobs Data
// ============================================================================

function generateJobs(count) {
  const companies = [
    { name: 'Stripe', type: 'private', logo: 'S', color: '#635bff', domain: 'stripe.com' },
    { name: 'Shopify', type: 'private', logo: 'S', color: '#96bf48', domain: 'shopify.com' },
    { name: 'Vercel', type: 'private', logo: 'V', color: '#000000', domain: 'vercel.com' },
    { name: 'Netlify', type: 'private', logo: 'N', color: '#00c7b7', domain: 'netlify.com' },
    { name: 'Linear', type: 'private', logo: 'L', color: '#570df8', domain: 'linear.app' },
    { name: 'Notion', type: 'private', logo: 'N', color: '#000000', domain: 'notion.so' },
    { name: 'Figma', type: 'private', logo: 'F', color: '#f24e1e', domain: 'figma.com' },
    { name: 'Discord', type: 'private', logo: 'D', color: '#5865f2', domain: 'discord.com' },
    { name: 'Airtable', type: 'private', logo: 'A', color: '#18bfff', domain: 'airtable.com' },
    { name: 'Retool', type: 'private', logo: 'R', color: '#00d4aa', domain: 'retool.com' },
    { name: 'GitHub', type: 'private', logo: 'G', color: '#000000', domain: 'github.com' },
    { name: 'GitLab', type: 'private', logo: 'G', color: '#fc6d26', domain: 'gitlab.com' },
    { name: 'Atlassian', type: 'private', logo: 'A', color: '#0052cc', domain: 'atlassian.com' },
    { name: 'Datadog', type: 'private', logo: 'D', color: '#632ca6', domain: 'datadoghq.com' },
    { name: 'Snyk', type: 'private', logo: 'S', color: '#4c4a73', domain: 'snyk.io' },
    { name: 'Vanta', type: 'private', logo: 'V', color: '#0066ff', domain: 'vanta.com' },
    { name: 'Clerk', type: 'private', logo: 'C', color: '#000000', domain: 'clerk.com' },
    { name: 'Supabase', type: 'private', logo: 'S', color: '#3ecf8e', domain: 'supabase.com' },
    { name: 'PlanetScale', type: 'private', logo: 'P', color: '#000000', domain: 'planetscale.com' },
    { name: 'Neon', type: 'private', logo: 'N', color: '#00f4a6', domain: 'neon.tech' },
    { name: 'Temporal', type: 'private', logo: 'T', color: '#000000', domain: 'temporal.io' },
    { name: 'Convex', type: 'private', logo: 'C', color: '#00d4aa', domain: 'convex.dev' },
    { name: 'Trigger.dev', type: 'private', logo: 'T', color: '#000000', domain: 'trigger.dev' },
    { name: 'Resend', type: 'private', logo: 'R', color: '#000000', domain: 'resend.com' },
    { name: 'Upstash', type: 'private', logo: 'U', color: '#e8b400', domain: 'upstash.com' },
    { name: 'Clerk', type: 'private', logo: 'C', color: '#000000', domain: 'clerk.com' },
    { name: 'WorkOS', type: 'private', logo: 'W', color: '#000000', domain: 'workos.com' },
    { name: 'PropelAuth', type: 'private', logo: 'P', color: '#000000', domain: 'propelauth.com' },
    { name: 'Mercury', type: 'private', logo: 'M', color: '#000000', domain: 'mercury.com' },
    { name: 'Brex', type: 'private', logo: 'B', color: '#000000', domain: 'brex.com' },
    { name: 'Ramp', type: 'private', logo: 'R', color: '#000000', domain: 'ramp.com' },
    { name: 'Modern Treasury', type: 'private', logo: 'M', color: '#000000', domain: 'moderntreasury.com' },
    { name: 'Plaid', type: 'private', logo: 'P', color: '#000000', domain: 'plaid.com' },
    { name: 'Stripe', type: 'private', logo: 'S', color: '#635bff', domain: 'stripe.com' },
    { name: 'Adyen', type: 'private', logo: 'A', color: '#006fff', domain: 'adyen.com' },
    { name: 'Checkout.com', type: 'private', logo: 'C', color: '#000000', domain: 'checkout.com' },
    { name: 'Wise', type: 'private', logo: 'W', color: '#00b87c', domain: 'wise.com' },
    { name: 'Revolut', type: 'private', logo: 'R', color: '#000000', domain: 'revolut.com' },
    { name: 'Monzo', type: 'private', logo: 'M', color: '#fc4c02', domain: 'monzo.com' },
    { name: 'N26', type: 'private', logo: 'N', color: '#000000', domain: 'n26.com' },
    { name: 'Chime', type: 'private', logo: 'C', color: '#00b4d8', domain: 'chime.com' },
    { name: 'Robinhood', type: 'private', logo: 'R', color: '#00c805', domain: 'robinhood.com' },
    { name: 'Coinbase', type: 'private', logo: 'C', color: '#0052ff', domain: 'coinbase.com' },
    { name: 'Kraken', type: 'private', logo: 'K', color: '#000000', domain: 'kraken.com' },
    { name: 'Binance', type: 'private', logo: 'B', color: '#f0b90b', domain: 'binance.com' },
    { name: 'OpenAI', type: 'private', logo: 'O', color: '#000000', domain: 'openai.com' },
    { name: 'Anthropic', type: 'private', logo: 'A', color: '#000000', domain: 'anthropic.com' },
    { name: 'Hugging Face', type: 'private', logo: 'H', color: '#ffd21e', domain: 'huggingface.co' },
    { name: 'Weights & Biases', type: 'private', logo: 'W', color: '#000000', domain: 'wandb.ai' },
    { name: 'Scale AI', type: 'private', logo: 'S', color: '#000000', domain: 'scale.com' },
    { name: 'Databricks', type: 'private', logo: 'D', color: '#ff3621', domain: 'databricks.com' },
    { name: 'Snowflake', type: 'private', logo: 'S', color: '#29b5e8', domain: 'snowflake.com' },
    { name: 'MongoDB', type: 'private', logo: 'M', color: '#47a248', domain: 'mongodb.com' },
    { name: 'Redis', type: 'private', logo: 'R', color: '#dc382d', domain: 'redis.com' },
    { name: 'Elastic', type: 'private', logo: 'E', color: '#005571', domain: 'elastic.co' },
    { name: 'Confluent', type: 'private', logo: 'C', color: '#000000', domain: 'confluent.io' },
    { name: 'HashiCorp', type: 'private', logo: 'H', color: '#000000', domain: 'hashicorp.com' },
    { name: 'Docker', type: 'private', logo: 'D', color: '#2496ed', domain: 'docker.com' },
    { name: 'GitHub', type: 'private', logo: 'G', color: '#000000', domain: 'github.com' },
    { name: 'GitLab', type: 'private', logo: 'G', color: '#fc6d26', domain: 'gitlab.com' },
    { name: 'Bitbucket', type: 'private', logo: 'B', color: '#0052cc', domain: 'bitbucket.org' },
    { name: 'AWS', type: 'private', logo: 'A', color: '#ff9900', domain: 'aws.amazon.com' },
    { name: 'Google Cloud', type: 'private', logo: 'G', color: '#4285f4', domain: 'cloud.google.com' },
    { name: 'Microsoft Azure', type: 'private', logo: 'A', color: '#0078d4', domain: 'azure.microsoft.com' },
    { name: 'DigitalOcean', type: 'private', logo: 'D', color: '#0080ff', domain: 'digitalocean.com' },
    { name: 'Cloudflare', type: 'private', logo: 'C', color: '#f38020', domain: 'cloudflare.com' },
    { name: 'Vercel', type: 'private', logo: 'V', color: '#000000', domain: 'vercel.com' },
    { name: 'Netlify', type: 'private', logo: 'N', color: '#00c7b7', domain: 'netlify.com' },
    { name: 'Railway', type: 'private', logo: 'R', color: '#000000', domain: 'railway.app' },
    { name: 'Render', type: 'private', logo: 'R', color: '#000000', domain: 'render.com' },
    { name: 'Fly.io', type: 'private', logo: 'F', color: '#000000', domain: 'fly.io' },
    { name: 'Government of Canada', type: 'government', logo: 'GC', color: '#ff0000', domain: 'canada.ca' },
    { name: 'US Federal Government', type: 'government', logo: 'US', color: '#002868', domain: 'usa.gov' },
    { name: 'UK Civil Service', type: 'government', logo: 'UK', color: '#002868', domain: 'civilservice.gov.uk' },
    { name: 'German Government', type: 'government', logo: 'DE', color: '#000000', domain: 'bund.de' },
    { name: 'Australian Government', type: 'government', logo: 'AU', color: '#00008b', domain: 'gov.au' },
    { name: 'Singapore Government', type: 'government', logo: 'SG', color: '#ef3340', domain: 'gov.sg' },
    { name: 'EU Institutions', type: 'government', logo: 'EU', color: '#003399', domain: 'europa.eu' },
    { name: 'UN Organizations', type: 'government', logo: 'UN', color: '#0072c6', domain: 'un.org' },
    { name: 'World Bank', type: 'government', logo: 'WB', color: '#0096d6', domain: 'worldbank.org' },
    { name: 'OECD', type: 'government', logo: 'OE', color: '#003366', domain: 'oecd.org' },
  ];

  const jobTitles = [
    // Engineering
    'Senior Software Engineer', 'Staff Software Engineer', 'Principal Engineer',
    'Engineering Manager', 'Director of Engineering', 'VP Engineering',
    'Frontend Engineer', 'Backend Engineer', 'Full Stack Engineer',
    'Mobile Engineer', 'iOS Engineer', 'Android Engineer', 'Flutter Engineer',
    'DevOps Engineer', 'Platform Engineer', 'Site Reliability Engineer',
    'Security Engineer', 'Data Engineer', 'ML Engineer', 'AI Engineer',
    'QA Engineer', 'SDET', 'Test Engineer',
    'Solutions Architect', 'Technical Architect', 'Enterprise Architect',

    // Data & AI
    'Data Scientist', 'Senior Data Scientist', 'Principal Data Scientist',
    'ML Research Scientist', 'Applied Scientist', 'Research Engineer',
    'Data Analyst', 'Business Intelligence Engineer', 'Analytics Engineer',
    'MLOps Engineer', 'AI Platform Engineer',

    // Product & Design
    'Product Manager', 'Senior Product Manager', 'Group Product Manager',
    'Product Designer', 'UX Designer', 'UI Designer', 'Product Design Lead',
    'Design Systems Engineer', 'UX Researcher', 'Content Designer',

    // Other
    'Technical Program Manager', 'Engineering Program Manager',
    'Developer Relations Engineer', 'Developer Advocate', 'Technical Writer',
    'Sales Engineer', 'Solutions Engineer', 'Pre-sales Engineer',
    'Support Engineer', 'Customer Success Engineer',
  ];

  const locations = [
    { city: 'San Francisco', country: 'US', remote: true },
    { city: 'New York', country: 'US', remote: true },
    { city: 'Seattle', country: 'US', remote: true },
    { city: 'Austin', country: 'US', remote: true },
    { city: 'Boston', country: 'US', remote: true },
    { city: 'London', country: 'GB', remote: true },
    { city: 'Berlin', country: 'DE', remote: true },
    { city: 'Munich', country: 'DE', remote: true },
    { city: 'Toronto', country: 'CA', remote: true },
    { city: 'Vancouver', country: 'CA', remote: true },
    { city: 'Sydney', country: 'AU', remote: true },
    { city: 'Melbourne', country: 'AU', remote: true },
    { city: 'Singapore', country: 'SG', remote: true },
    { city: 'Zurich', country: 'CH', remote: true },
    { city: 'Stockholm', country: 'SE', remote: true },
    { city: 'Tokyo', country: 'JP', remote: false },
    { city: 'Dubai', country: 'AE', remote: true },
    { city: 'Dublin', country: 'IE', remote: true },
    { city: 'Amsterdam', country: 'NL', remote: true },
    { city: 'Paris', country: 'FR', remote: true },
    { city: 'Remote', country: 'US', remote: true },
    { city: 'Remote', country: 'GB', remote: true },
    { city: 'Remote', country: 'DE', remote: true },
    { city: 'Remote', country: 'CA', remote: true },
    { city: 'Remote', country: 'EU', remote: true },
    { city: 'Remote', country: 'GLOBAL', remote: true },
  ];

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
    ['work-visa-sponsored', 'h1b'],
    ['work-visa-sponsored', 'skilled-worker-uk'],
    ['work-visa-sponsored', 'eu-blue-card'],
    ['digital-nomad'],
    ['working-holiday'],
    ['permanent-residency-path'],
    ['tn-visa'],
    ['l1-visa'],
    ['global-talent-uk'],
    ['tech-visa-pt'],
    ['startup-visa'],
    ['o1-visa'],
  ];

  const requirementsTemplates = [
    {
      required: ['5+ years professional experience', 'Strong system design skills', 'Production experience with distributed systems'],
      preferred: ['Experience with event-driven architecture', 'Open source contributions', 'Technical blogging/speaking'],
    },
    {
      required: ['3+ years with React/TypeScript', 'Experience with state management (Redux/Zustand)', 'Testing (Jest, Cypress/Playwright)'],
      preferred: ['Next.js experience', 'Design systems', 'Accessibility (WCAG)'],
    },
    {
      required: ['4+ years Python', 'FastAPI/Django/Flask', 'PostgreSQL, Redis', 'Docker, Kubernetes'],
      preferred: ['ML experience', 'Data pipelines', 'Observability (Datadog, Prometheus)'],
    },
    {
      required: ['3+ years Go', 'Microservices, gRPC', 'PostgreSQL, Redis', 'Kubernetes, AWS/GCP'],
      preferred: ['Service mesh (Istio/Linkerd)', 'Observability', 'Open source'],
    },
    {
      required: ['5+ years Java/Spring Boot', 'System design', 'MySQL/PostgreSQL', 'Kafka, Redis'],
      preferred: ['Event sourcing/CQRS', 'Domain-driven design', 'Cloud-native'],
    },
    {
      required: ['3+ years mobile (iOS/Android/React Native/Flutter)', 'App store deployment', 'CI/CD for mobile'],
      preferred: ['Cross-platform', 'Performance optimization', 'Offline-first'],
    },
    {
      required: ['3+ years DevOps/SRE', 'Kubernetes, Terraform', 'AWS/GCP/Azure', 'Observability stack'],
      preferred: ['GitOps', 'Platform engineering', 'Security hardening'],
    },
    {
      required: ['4+ years Data Engineering', 'Python/SQL', 'Spark/Airflow/dbt', 'Snowflake/BigQuery/Redshift'],
      preferred: ['MLOps', 'Real-time streaming', 'Data governance'],
    },
    {
      required: ['3+ years Product Management', 'B2B/B2C SaaS', 'Data-driven decisions', 'Technical background'],
      preferred: ['PLG experience', 'API/platform products', 'International expansion'],
    },
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

    // Salary based on experience and location
    const baseSalary = {
      entry: [60000, 120000],
      mid: [100000, 180000],
      senior: [150000, 280000],
      lead: [200000, 400000],
      executive: [300000, 600000],
    };
    const [minSal, maxSal] = baseSalary[experience];
    const salaryMin = Math.round((minSal + Math.random() * (maxSal - minSal) * 0.3) / 10000) * 10000;
    const salaryMax = Math.round((salaryMin + Math.random() * (maxSal - salaryMin) * 0.5) / 10000) * 10000;

    // Eligibility
    const eligibilityTypes = ['eligible', 'near', 'not-eligible'];
    const eligibilityWeights = [0.45, 0.35, 0.2];
    const rand = Math.random();
    let eligibility = 'not-eligible';
    if (rand < eligibilityWeights[0]) eligibility = 'eligible';
    else if (rand < eligibilityWeights[0] + eligibilityWeights[1]) eligibility = 'near';

    const postedDaysAgo = Math.floor(Math.random() * 30);
    const postedDate = new Date();
    postedDate.setDate(postedDate.getDate() - postedDaysAgo);

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
      countryFlag: COUNTRIES.find(c => c.code === location.country)?.flag || '🌍',
      remote: location.remote,
      remotePolicy: remote,
      jobType,
      experience,
      salaryMin,
      salaryMax,
      salaryCurrency: 'USD',
      techStack,
      visaTypes: visa,
      eligibility,
      requirements: {
        required: [...reqTemplate.required],
        preferred: [...reqTemplate.preferred],
      },
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

export const JOBS = generateJobs(500);

// ============================================================================
// Helper Functions
// ============================================================================

export function formatSalary(min, max, currency = 'USD') {
  const fmt = (n) => (n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : `${(n / 1000).toFixed(0)}K`);
  if (min && max) return `$${fmt(min)} – $${fmt(max)}`;
  if (min) return `From $${fmt(min)}`;
  if (max) return `Up to $${fmt(max)}`;
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
  const country = COUNTRIES.find(c => c.code === code);
  return country ? country.name : code;
}

export function getCountryFlag(code) {
  const country = COUNTRIES.find(c => c.code === code);
  return country ? country.flag : '🌍';
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
    // Keyword search
    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      const searchable = `${job.title} ${job.company} ${job.techStack.join(' ')} ${job.description}`.toLowerCase();
      if (!searchable.includes(kw)) return false;
    }

    // Job type
    if (filters.jobType?.length && !filters.jobType.includes(job.jobType)) return false;

    // Country
    if (filters.country?.length && !filters.country.includes(job.country)) return false;

    // Visa type
    if (filters.visaType?.length) {
      const hasVisa = job.visaTypes.some(v => filters.visaType.includes(v));
      if (!hasVisa) return false;
    }

    // Salary range
    if (filters.salaryMin && job.salaryMax < filters.salaryMin) return false;
    if (filters.salaryMax && job.salaryMin > filters.salaryMax) return false;

    // Tech stack
    if (filters.techStack?.length) {
      const hasTech = job.techStack.some(t => filters.techStack.some(f => f.toLowerCase() === t.toLowerCase()));
      if (!hasTech) return false;
    }

    // Experience
    if (filters.experience?.length && !filters.experience.includes(job.experience)) return false;

    // Remote policy
    if (filters.remote?.length && !filters.remote.includes(job.remotePolicy)) return false;

    return true;
  });
}

export function sortJobs(jobs, sortBy) {
  const sorted = [...jobs];
  switch (sortBy) {
    case 'date-desc':
      return sorted.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    case 'salary-desc':
      return sorted.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0));
    case 'salary-asc':
      return sorted.sort((a, b) => (a.salaryMin || 0) - (b.salaryMin || 0));
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'relevance':
    default:
      // Eligible first, then near, then not-eligible, then by date
      return sorted.sort((a, b) => {
        const eligibilityOrder = { eligible: 0, near: 1, 'not-eligible': 2 };
        const diff = eligibilityOrder[a.eligibility] - eligibilityOrder[b.eligibility];
        if (diff !== 0) return diff;
        return new Date(b.postedDate) - new Date(a.postedDate);
      });
  }
}

export function paginateJobs(jobs, page, pageSize) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    jobs: jobs.slice(start, end),
    total: jobs.length,
    totalPages: Math.ceil(jobs.length / pageSize),
    currentPage: page,
    pageSize,
  };
}

// ============================================================================
// Resume Matching (Mock)
// ============================================================================

export function parseResume(file) {
  // In production, this would use a real resume parser (pdf-parse, mammoth, etc.)
  // For demo, we return mock extracted data
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockSkills = [
        'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS',
        'Docker', 'Kubernetes', 'GraphQL', 'Redis', 'Git',
        'CI/CD', 'Testing', 'System Design', 'Microservices',
      ];
      const mockExperience = 'senior';
      const mockLocations = ['US', 'CA', 'GB', 'DE', 'Remote'];
      const mockVisa = ['work-visa-sponsored', 'h1b', 'tn-visa', 'permanent-residency-path'];
      const mockJobTypes = ['fulltime', 'contract'];
      const mockRemote = ['fully-remote', 'hybrid', 'relocation'];
      const mockSalaryMin = 150000;

      resolve({
        skills: mockSkills,
        experience: mockExperience,
        preferredLocations: mockLocations,
        visaRequirements: mockVisa,
        jobTypes: mockJobTypes,
        remotePreference: mockRemote,
        salaryExpectation: mockSalaryMin,
        rawText: `Mock resume content for ${file.name}`,
      });
    }, 1500);
  });
}

export function matchJobsToResume(jobs, resumeData) {
  return jobs.map(job => {
    let score = 0;
    const maxScore = 100;
    const matchedSkills = [];
    const missingSkills = [];

    // Skill matching (40 points)
    const jobSkillsLower = job.techStack.map(s => s.toLowerCase());
    const resumeSkillsLower = resumeData.skills.map(s => s.toLowerCase());

    job.techStack.forEach(skill => {
      if (resumeSkillsLower.includes(skill.toLowerCase())) {
        score += 40 / job.techStack.length;
        matchedSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    });

    // Experience matching (20 points)
    const expOrder = { entry: 0, mid: 1, senior: 2, lead: 3, executive: 4 };
    const resumeExp = expOrder[resumeData.experience] || 1;
    const jobExp = expOrder[job.experience] || 1;
    if (resumeExp >= jobExp) score += 20;
    else if (resumeExp === jobExp - 1) score += 10;

    // Location matching (15 points)
    if (resumeData.preferredLocations.includes('GLOBAL') ||
        resumeData.preferredLocations.includes(job.country) ||
        (job.remote && resumeData.preferredLocations.includes('Remote'))) {
      score += 15;
    }

    // Visa matching (15 points)
    const hasVisaMatch = job.visaTypes.some(v => resumeData.visaRequirements.includes(v));
    if (hasVisaMatch) score += 15;

    // Job type matching (5 points)
    if (resumeData.jobTypes.includes(job.jobType)) score += 5;

    // Remote policy matching (5 points)
    if (resumeData.remotePreference.includes(job.remotePolicy)) score += 5;

    // Salary matching (up to 10 points bonus)
    if (job.salaryMax >= resumeData.salaryExpectation) score += 5;
    if (job.salaryMin >= resumeData.salaryExpectation) score += 5;

    score = Math.min(Math.round(score), maxScore);

    // Determine eligibility
    let eligibility = 'not-eligible';
    let todoItems = [];

    if (score >= 80) {
      eligibility = 'eligible';
    } else if (score >= 60) {
      eligibility = 'near';
      // Generate todo items for near matches
      if (missingSkills.length > 0) {
        todoItems.push(`Learn ${missingSkills.slice(0, 3).join(', ')}`);
      }
      if (resumeExp < jobExp) {
        todoItems.push(`Gain ${jobExp - resumeExp} more year(s) of experience`);
      }
      if (!hasVisaMatch && job.visaTypes.some(v => v !== 'none-required')) {
        todoItems.push(`Secure visa sponsorship (${job.visaTypes.filter(v => v !== 'none-required').join(', ')})`);
      }
      if (job.salaryMax < resumeData.salaryExpectation) {
        todoItems.push(`Salary expectation ($${formatSalary(resumeData.salaryExpectation)}) exceeds range`);
      }
    } else {
      eligibility = 'not-eligible';
      if (missingSkills.length > 0) {
        todoItems.push(`Missing core skills: ${missingSkills.slice(0, 5).join(', ')}`);
      }
      if (resumeExp < jobExp - 1) {
        todoItems.push(`Significant experience gap (need ${jobExp - resumeExp} more years)`);
      }
      if (!hasVisaMatch && job.visaTypes.some(v => v !== 'none-required')) {
        todoItems.push(`Visa sponsorship required but not offered`);
      }
    }

    // Add todo items for eligible jobs too (preferred skills)
    if (eligibility === 'eligible' && job.requirements.preferred.length > 0) {
      todoItems.push(`Preferred: ${job.requirements.preferred.slice(0, 2).join(', ')}`);
    }

    return {
      ...job,
      matchScore: score,
      eligibility,
      matchedSkills,
      missingSkills,
      todoItems: todoItems.slice(0, 5),
      hasVisaMatch,
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}