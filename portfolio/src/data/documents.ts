export type PortfolioDocument = {
  label: string;
  description: string;
  previewUrl: string;
  openUrl: string;
  downloadUrl: string;
};

const resumeUrl = 'https://docs.google.com/document/d/12pPsc9r_XsGnkyR1deLyTiweF9qSkJoHtXVpVNV7PqM';

export const documents: Record<'resume' | 'cv', PortfolioDocument | null> = {
  resume: {
    label: 'Resume',
    description: 'Professional experience and applied engineering work.',
    previewUrl: `${resumeUrl}/preview`,
    openUrl: `${resumeUrl}/edit`,
    downloadUrl: `${resumeUrl}/export?format=pdf`,
  },
  // Add your PDF to public/documents/academic-cv.pdf, then replace null with:
  // { label: 'Academic CV', description: 'Research, publications, and academic experience.',
  //   previewUrl: '/documents/academic-cv.pdf', openUrl: '/documents/academic-cv.pdf',
  //   downloadUrl: '/documents/academic-cv.pdf' }
  cv: null,
};