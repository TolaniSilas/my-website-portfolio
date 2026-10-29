import type { Metadata } from "next";
export const metadata: Metadata = { title: "Projects" };
import ProjectsPage from '../../views/ProjectsPage';
import { getPublicContent } from '../../lib/cms/repository';
export const dynamic = 'force-dynamic';
export default async function Page() {
  const projects = await getPublicContent('projects');
  return <ProjectsPage projects={projects.entries} unavailable={projects.unavailable} />;
}
