export type PortfolioDocument = {
  label: string;
  description: string;
  previewUrl: string;
  openUrl: string;
  downloadUrl: string;
};

const resumeUrl = '/documents/Silas_Osunba_Resume.pdf';
const cvUrl = '/documents/Silas_Osunba_Academic_CV.pdf';

export const documents: Record<'resume' | 'cv', PortfolioDocument | null> = {
  resume: {
    label: 'Resume',
    description: 'Professional experience and applied engineering work.',
    previewUrl: resumeUrl,
    openUrl: resumeUrl,
    downloadUrl: resumeUrl,
  },
  cv: {
    label: 'Academic CV',
    description: 'Research, publications, and academic experience.',
    previewUrl: cvUrl,
    openUrl: cvUrl,
    downloadUrl: cvUrl,
  },
};