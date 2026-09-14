import type { ReactNode } from "react";

export type ProjectCategory =
  | "All Projects"
  | "AI & ML"
  | "Backend Development"
  | "Web Development"
  | "Featured";

export type Project = {
  id: number | string;
  title: string;
  categories: Exclude<ProjectCategory, "All Projects">[];
  description: string;
  image: string;
  link: string;
};

export type BlogPost = {
  id: number | string;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
};

export type Publication = {
  citation: string;
  link: string;
};

export type TechItem = {
  name: string;
  icon: ReactNode;
};

export type TechCategory = "Languages" | "Libraries & Frameworks" | "Tools & Platforms";
