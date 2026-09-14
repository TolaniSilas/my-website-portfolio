
import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { projects } from "../data/projects";

const Footer = () => {
  const selectedProjects = [1, 2, 5, 3, 4].flatMap(id => projects.filter(p => p.id === id));
  return (
    <footer className="site-footer mt-auto border-t border-line bg-surface dark:border-line-dark dark:bg-surface-dark">
      <div className="page-shell footer-grid">
        <div className="footer-identity">
          <Link href="/" className="footer-brand" aria-label="Silas Osunba home">
            <span className="footer-monogram" aria-hidden="true">SO</span>
            <span>Silas<br />Osunba</span>
          </Link>
          <p className="footer-copyright">© Silas Osunba {new Date().getFullYear()}. All rights reserved.</p>
          <nav aria-label="Social links" className="footer-socials">
            <a href="https://www.linkedin.com/in/osunbasilas/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn aria-hidden="true" /></a>
            <a href="https://github.com/TolaniSilas" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub aria-hidden="true" /></a>
            <a href="mailto:osunbasilas@gmail.com" aria-label="Email Silas"><FaEnvelope aria-hidden="true" /></a>
          </nav>
        </div>

        <nav aria-labelledby="footer-more">
          <h2 id="footer-more" className="footer-heading">More</h2>
          <ul className="footer-links">
            <li><Link href="/about">About me</Link></li>
            <li><Link href="/contact">Contact me</Link></li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-projects">
          <h2 id="footer-projects" className="footer-heading">Selected Projects</h2>
          <ul className="footer-links">
            {selectedProjects.map((project) => (
              <li key={project.id}><a href={project.link} target="_blank" rel="noopener noreferrer">{project.title}</a></li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-articles">
          <h2 id="footer-articles" className="footer-heading">Articles</h2>
          <ul className="footer-links">
            <li><Link href="/articles">Latest articles</Link></li>
            <li><Link href="/research">Research & publications</Link></li>
            <li><a href="https://medium.com/@tolanisilas3606" target="_blank" rel="noopener noreferrer">Writing on Medium</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
