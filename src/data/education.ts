export interface EducationItem {
  school: string
  degree: string
  dates: string
  program: string
  location: string
  gpa: string
  logo: string
  logoVariant: 'wide' | 'square',
  status: 'current'|'complete'
}

export const education: EducationItem[] = [
  {
    school: 'University of Waterloo',
    degree: 'Master of Engineering',
    program: '— Electrical & Computer Engineering',
    dates: 'Sep 2025 — Dec 2026',
    location: 'Waterloo, Ontario, Canada',
    gpa: '3.9 / 4.0',
    logo: '/education/waterloo-logo.png',
    logoVariant: 'wide',
    status: 'current'
  },
  {
    school: 'McMaster University',
    degree: 'Bachelor of Applied Science',
    program: '— Honours Computer Science (Co-op)',
    dates: 'Sep 2020 — Jun 2025',
    location: 'Hamilton, Ontario, Canada',
    gpa: '3.7 / 4.0',
    logo: '/education/mcmaster-logo.jpg',
    logoVariant: 'square',
    status:'complete'
  },
]
