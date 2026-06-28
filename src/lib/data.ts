import type { Project, Experience, SkillCategory, PersonalInfo } from "@/types";
import type { Locale } from "./dictionaries";

const dataLoaders = {
  en: {
    personal: () => import("@/data/personal.json").then((m) => m.default as PersonalInfo),
    projects: () => import("@/data/projects.json").then((m) => m.default as Project[]),
    experience: () => import("@/data/experience.json").then((m) => m.default as Experience[]),
    skills: () => import("@/data/skills.json").then((m) => m.default as SkillCategory[]),
  },
  es: {
    personal: () => import("@/dictionaries/es/personal.json").then((m) => m.default as PersonalInfo),
    projects: () => import("@/dictionaries/es/projects.json").then((m) => m.default as Project[]),
    experience: () => import("@/dictionaries/es/experience.json").then((m) => m.default as Experience[]),
    skills: () => import("@/dictionaries/es/skills.json").then((m) => m.default as SkillCategory[]),
  },
};

export async function getLocalizedData(locale: Locale) {
  const loaders = dataLoaders[locale];
  const [personal, projects, experience, skills] = await Promise.all([
    loaders.personal(),
    loaders.projects(),
    loaders.experience(),
    loaders.skills(),
  ]);
  return { personal, projects, experience, skills };
}
