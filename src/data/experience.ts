export interface ExperienceItem {
  company: string
  role: string
  dates: string
  location: string
  focus: string
  achievements: string[]
  technologies: string[]
}

export const experience: ExperienceItem[] = [
  {
    company: 'Quantumera AI',
    role: 'Software Development Engineer (Intern)',
    dates: 'May 2026 — Aug 2026',
    location: 'Remote, U.S.',
    focus: 'Cloud infrastructure & data systems',
    achievements: [
    'Gathered transportation-related data from existing datasets and public APIs, processed data through SQS, enabling a scalable AI-driven solution for intelligent transportation system.',
    'Developed and deployed Data Ingestion Service on EC2 to pull data from SQS, integrated DynamoDB-stored data, and saved results into S3 for downstream analytics.',
    'Created Redis cluster with Elasticache to cache frequently accessed data, optimizing real-time data integration and reducing end-to-end latency by 33%.',
    'Load data from S3 into EMR, leveraged Spark to parallel process datasets, and feed outputs into ELasticsearch to enhance analytical capabilities and support advanced AI models.',
    'Applied IAM to manage secure access to sensitive data, conducting comprehensive testing to validate reliability and performance across the system.',
    ],
    technologies: [
      'AWS',
      'SQS',
      'EC2',
      'S3',
      'DynamoDB',
      'Redis',
      'EMR',
      'Spark',
      'Elasticsearch',
      'IAM',
    ],
  },
  {
    company: 'Bosch (China) Investment Ltd',
    role: 'Software Development Engineer (Intern)',
    dates: 'Aug 2023 — Aug 2024',
    location: 'Suzhou, China',
    focus: 'Enterprise frontend & full-stack engineering',
    achievements: [
      'Independently developed and deployed an enterprise-level web system integrating frontend and backend microservices on distributed servers, attracting 5k+ active users and handling 1M+ user requests in parallel.',
      'Designed and implemented reusable frontend components with Angular/Vue, improving UI consistency across 20+ modules. Utilized Pinia, RxJS, and Redux for state management and efficient data flow, reducing redundant logic by 30%.',
      'Developed backend services with Spring Boot and MySQL, implementing optimized queries and RESTful APIs documented via Swagger UI. Improved response time by 30% and reduced integration defects by 25%.',
      'Integrated CI/CD pipelines and Dockerized deployments using GitHub Actions under Linux environments, reducing release time by 40% and ensuring distributed reliability.',
      'Collaborated cross-functionally to design and test APIs, integrating basic NLP-based text parsing modules for data normalization and improving consistency across services; achieved a 99% on-time delivery rate following Agile practices.',
    ],
    technologies: [
      'Angular',
      'Vue',
      'TypeScript',
      'RxJS',
      'Java',
      'Spring Boot',
      'MySQL',
      'REST APIs',
      'CI/CD'
    ],
  },
  {
    company: 'Bosch (China) Investment Ltd',
    role: 'Automation Test Engineer (Intern)',
    dates: 'Jun 2021 — Dec 2021',
    location: 'Suzhou, China',
    focus: 'Test automation & quality assurance',
    achievements: [
      'Developed and maintained automated test suites using JUnit, designing unit, integration, and regression testing to ensure system reliability and performance. ',
      'Designed detailed test plans and scenarios based on product requirements, executing 200+ test cases, and identifying 50+ critical defects. Worked closely with developers to provide actionable feedback and improve overall product quality.',
      'Integrated automated tests into CI/CD pipelines with GitHub Actions, enabling continuous validation during builds. This reduced release cycle time by 30%, improved early defect detection.',
    ],
    technologies: [
      'JUnit',
      'Java',
      'GitHub Actions',
      'CI/CD',
      'Test Automation',
      'Linux',
    ],
  },
]
