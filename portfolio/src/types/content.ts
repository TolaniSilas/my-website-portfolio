export type ProjectCategory = 'Engineering' | 'Civic';

export type Project = {
  id: number | string;
  title: string;
  categories: ProjectCategory[];
  credit?: string;
  description: string;
  image: string;
  link: string;
};

export type BlogPost = {
  id: number | string;
  title: string;
  date: string;
  dateTime: string;
  readingMinutes: number;
  image: string;
  excerpt: string;
  slug: string;
};

export type Publication = {
  citation: string;
  link: string;
};