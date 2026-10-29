export type AboutEntry = { period: string; title: string; organization?: string; detail: string; logo?: string; initials?: string };

export const professionalExperience: AboutEntry[] = [
  { period: 'Jun 2026 – Present', title: 'AI & Product Engineer (Founding)', organization: 'Condere Corp Ltd (United Kingdom)', logo: '/images/affiliations/condere.png', initials: 'C', detail: 'Designing agentic AI and human-in-the-loop systems for recruitment.' },
  { period: 'Feb – May 2026', title: 'Software Engineering Fellow', organization: 'Moniepoint Inc.', logo: '/images/affiliations/moniepoint.png', initials: 'M', detail: 'Built analytics endpoints and containerized systems for merchant activity insights.' },
];

export const researchExperience: AboutEntry[] = [
  { period: 'Jan – Dec 2025', title: 'Undergraduate ML Researcher', organization: 'Lagos State University', logo: '/images/affiliations/lasu.png', initials: 'LASU', detail: 'Achieved 20% improvement in prediction accuracy compared to baseline approaches, and outlined practical implications for network designers to optimize fade margins and improve the reliability of satellite links.' },
  { period: 'Jun – Dec 2024', title: 'Machine Learning Researcher', organization: 'Engineering.fit() Research Lab', logo: '/images/affiliations/engineering-fit.png', initials: 'E.fit', detail: 'CNN-based oil spill detection and model optimization for edge devices.' },
  { period: 'Nov 2023 – Apr 2024', title: 'Research Assistant', organization: 'Lagos State University', logo: '/images/affiliations/lasu.png', initials: 'LASU', detail: 'Automated detection of medical diagnostics: CNN, EfficientNet, MobileNet, ResNet, DenseNet and ViTs.' },
];

export const experienceGroups = [
  { title: 'Professional experience', entries: professionalExperience },
  { title: 'Research experience', entries: researchExperience },
];

export const education: AboutEntry[] = [
  { period: '2020 – 2025', title: 'B.Sc., Electronic & Computer Engineering', organization: 'Lagos State University', logo: '/images/affiliations/lasu.png', initials: 'LASU', detail: 'GPA 4.77/5.00 (Top 1% in 7,621). Faculty Valedictorian, first of 400.' },
];

export const service: AboutEntry[] = [
  { period: '2024 – 2025', title: 'President', organization: 'SPE LASU Student Chapter', logo: '/images/affiliations/spe-international.png', initials: 'SPE', detail: 'Led academic, professional, and outreach programs, including the Nexus 2.0 energy conference.' },
  { period: '2024 – 2025', title: 'Co-Founder', organization: 'Inspire The Student Initiative', logo: '/images/affiliations/inspire-the-student.png', initials: 'ITS', detail: 'Co-led 15 volunteers, shared over 750 study materials, and organized webinars reaching over 150 participants.' },
  { period: '2024 – 2025', title: 'Departmental Coordinator', organization: 'NIEEE, LASU Student Chapter', logo: '/images/affiliations/nieee.png', initials: 'NIEEE', detail: 'Connected more than 2,500 student members, faculty, and chapter leaders, supporting students through projects, competitions, and academic initiatives.' },
  { period: '2022 – 2025', title: 'Volunteer Tutor', organization: 'Lagos State University', logo: '/images/affiliations/lasu.png', initials: 'LASU', detail: 'Tutored over 947 engineering students in mathematics, programming, and core engineering courses.' },
  { period: '2023 – 2024', title: 'Vice President & Membership Chair', organization: 'SPE LASU Student Chapter', logo: '/images/affiliations/spe-international.png', initials: 'SPE', detail: 'Supported membership, onboarding, and chapter operations across successive roles.' },
  { period: '2023', title: 'Acting Membership Chair', organization: 'SPE LASU Student Chapter', logo: '/images/affiliations/spe-international.png', initials: 'SPE', detail: 'Increased membership renewal by 80% and membership retention by 60% at the end of my tenure.' },
];