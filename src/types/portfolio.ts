export interface Project {
  id: string;
  number: string;
  title: string;
  category: 'hardware' | 'software' | 'web' | 'entrepreneurship';
  categoryLabel: string;
  status: 'Verified Trade Training' | 'Applied Case Study' | 'Concept Project' | 'Coming Soon';
  shortDescription: string;
  fullDescription: string;
  toolsAndTechniques: string[];
  roleAndResponsibilities: string[];
  outcomes: string[];
  image?: string;
  aspect: string;
}

export interface Credential {
  id: string;
  title: string;
  category: 'technical' | 'academic' | 'language' | 'ai';
  categoryLabel: string;
  institution: string;
  boardOrProvider?: string;
  yearOrDate: string;
  displayDate: string;
  gradeOrScore?: string;
  scoreBreakdown?: { label: string; score: string | number }[];
  description: string;
  verifiedDetails: string[];
  privacyNote: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  organization: string;
  category: 'Academic' | 'Language' | 'Web Design' | 'Technical Engineering';
  summary: string;
  detail: string;
}

export interface SkillItem {
  name: string;
  level: 'Practical Skills' | 'Technical Training' | 'Developing Expertise';
  description: string;
  focusAreas: string[];
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  iconName: string;
  skills: SkillItem[];
}
