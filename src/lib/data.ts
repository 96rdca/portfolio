import type { Project, Experience, SkillCategory, PersonalInfo } from "@/types";
import projectsData from "@/data/projects.json";
import experienceData from "@/data/experience.json";
import skillsData from "@/data/skills.json";
import personalData from "@/data/personal.json";

export const projects = projectsData as Project[];
export const experience: Experience[] = experienceData;
export const skills: SkillCategory[] = skillsData;
export const personal: PersonalInfo = personalData;
