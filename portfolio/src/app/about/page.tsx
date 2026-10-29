import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About me",
  description: "Get to know Silas Osunba: his engineering background, research interests, and life beyond the code.",
};

import AboutPage from '../../views/AboutPage';
import { getPublicContent } from '../../lib/cms/repository';
export const dynamic = 'force-dynamic';
export default async function Page() {
  const projects = await getPublicContent('projects');
  return <AboutPage projects={projects.entries} />;
}
