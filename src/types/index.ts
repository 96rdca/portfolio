export interface Project {
  id: string;
  title: string;
  category: "development" | "infrastructure";
  overview: string;
  techStack: string[];
  role: string;
  challenges: string[];
  results: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  screenshotPath: string | null;
  featured: boolean;
  order: number;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  accomplishments: string[];
  technologies: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  linkedInUrl: string;
  githubUrl: string;
  aboutParagraphs: string[];
  currentlyLearning: string[];
  yearsOfExperience: number;
  industries: string[];
  resumePath: string;
}
