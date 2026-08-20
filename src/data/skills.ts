export interface SkillGroup {
  category: string
  description: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    description: 'Core programming languages',
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    category: 'Backend & Frontend',
    description: 'Services, APIs, and interfaces',
    skills: ['Spring Boot', 'Django', 'Node.js', 'React', 'Angular', 'Vue', 'REST APIs'],
  },
  {
    category: 'AI & Data',
    description: 'Machine learning and data systems',
    skills: ['Generative AI', 'LLM APIs', 'RAG', 'NLP', 'Apache Spark', 'Elasticsearch', 'Redis'],
  },
  {
    category: 'Cloud & DevOps',
    description: 'Delivery and infrastructure',
    skills: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'GitHub Actions', 'Linux'],
  },
]
