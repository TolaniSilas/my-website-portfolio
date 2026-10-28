export type NewsEntry = {
  id: string;
  date: string;
  dateTime?: string;
  text: string;
  parts?: (string | { label: string; url: string })[];
  link?: { label: string; url: string };
  after?: string;
};

// Edit, remove, or add updates here. Keep newest entries first.
// Dates and milestones are taken from the resume and academic CV.
export const news: NewsEntry[] = [
  {
    id: 'engineering-valedictorian', date: 'Aug 2026', dateTime: '2026-08',
    text: 'Received the Chancellor’s and Dean’s Award for the Engineering Valedictorian at Lagos State University, Class of 2025.',
  },
  {
    id: 'nse-excellence', date: 'Aug 2026', dateTime: '2026-08',
    text: 'Received the Nigerian Society of Engineers Award of Excellence as the best student in the Faculty of Engineering, Lagos State University, Class of 2025.',
  },
  {
    id: 'condere', date: 'Jun 2026', dateTime: '2026-06',
    text: 'Joined Condere as an AI & Product Engineer, working on agentic AI and human-in-the-loop recruitment systems.',
  },
  {
    id: 'querymate-talk', date: 'Apr 2026', dateTime: '2026-04',
    text: 'Delivered an invited project talk on ',
    parts: [
      { label: 'QueryMate', url: 'https://github.com/TolaniSilas/Query-Mate' },
      ' at ',
      { label: 'Cafe Cursor', url: 'https://cursor.com/community' },
      '.',
    ],
  },
  {
    id: 'moniepoint', date: 'Feb 2026', dateTime: '2026-02',
    text: 'Selected as a Software Engineering Fellow at Moniepoint Inc.',
  },
  {
    id: 'graduation', date: 'Oct 2025', dateTime: '2025-10',
    text: 'Graduated with First Class Honors.',
  },
  {
    id: 'oil-spill-paper', date: 'Aug 2025', dateTime: '2025-08',
    text: 'Presented our paper ',
    link: { label: 'Using Convolutional Neural Network for the Detection of Offshore and Onshore Oil Spills', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7361042863821852673/' },
    after: ' at SPE NAICE ’25.',
  },
  {
    id: 'oil-spill-publication', date: 'Aug 2025', dateTime: '2025-08',
    text: 'Our paper ',
    link: { label: 'Using Convolutional Neural Network for the Detection of Offshore and Onshore Oil Spills', url: 'https://doi.org/10.2118/228732-MS' },
    after: ' was accepted and published at SPE NAICE ’25.',
  },
  {
    id: 'transport-paper', date: 'Aug 2025', dateTime: '2025-08',
    text: 'Our paper ',
    link: { label: 'Electric Vehicles vs. Biofuels: A Review of Decarbonization in Transportation', url: 'https://doi.org/10.2118/228753-MS' },
    after: ' was accepted and published at SPE NAICE ’25.',
  },
  {
    id: 'fuel-cell-paper', date: 'Aug 2025', dateTime: '2025-08',
    text: 'Our paper ',
    link: { label: 'Predicting Proton Exchange Membrane Fuel Cell Performance through Advanced Machine Learning Techniques: A Comparative Analysis of Ensemble Techniques', url: 'https://doi.org/10.59324/stss.2025.2(8).07' },
    after: ' was accepted and published in Scientia. Technology, Science and Society.',
  },
  {
    id: 'nexus-conference', date: 'Jul 2025', dateTime: '2025-07',
    text: 'As President of the Conference Committee, I was part of the organizing team, who organized the Nexus 2.0 Energy Policy and Innovation Conference, bringing together over 500 students, 100 volunteers, and 10 energy leaders and dignitaries. We received sponsorship funding from Heirs Energies and other technology companies.',
  },
  {
    id: 'sap-scholarship', date: 'Jul 2025', dateTime: '2025-07',
    text: 'Received a fully funded SAP scholarship from WYZE Group.',
  },

  {
    id: 'spe-president', date: 'Oct 2024', dateTime: '2024-10',
    text: 'Elected as the President of the Society of Petroleum Engineers International (SPEI), Lagos State University Student Chapter.',
  },
  {
    id: 'inspire-student', date: 'Sept 2024', dateTime: '2024-09',
    text: 'Our co-founded initiative, ',
    link: { label: 'Inspire The Student Initiative', url: 'https://www.linkedin.com/company/inspire-the-students' },
    after: ', was accepted into the Millennium Fellowship, supported and promoted by the United Nations Academic Impact (UNAI) and the Millennium Campus Network (MCN).',
  },
  {
    id: 'first-ep-scholar', date: 'Aug 2024', dateTime: '2024-08',
    text: 'Recipient of the First E&P Scholarship in recognition of outstanding academic excellence.',
  },
  {
    id: 'datican-award', date: 'Jun 2024', dateTime: '2024-06',
    text: 'Led my team to fourth place out of 24 teams in the DATICAN 1.0 Data Science and Medical Image Analysis Competition with our project, “Automatic Detection of Diabetic Retinopathy,” organized by the University of Chicago in collaboration with Lagos State University.',
  },
  {
    id: 'datacamp-scholarships', date: 'Dec 2023', dateTime: '2023-12',
    text: 'Recipient of four ',
    link: { label: 'DataCamp', url: 'https://www.datacamp.com/' },
    after: ' scholarships to develop my skills in data science and artificial intelligence.',
  },
  {
    id: 'spe-scholarship', date: 'Jul 2023', dateTime: '2023-07',
    text: 'Received the Undergraduate Scholarship Award for Excellent Performance in Engineering from SPE International (SPEI), Lagos Section.',
  },
  {
    id: 'vc-commendation', date: 'Sept 2022', dateTime: '2022-09',
    text: 'Received the Vice Chancellor’s Letter of Commendation and Award of Scholarship in my sophomore year.',
  },
  {
    id: 'bamtoks-valedictorian', date: 'Oct 2020', dateTime: '2020-10',
    text: 'Graduated as class valedictorian and the highest-achieving student at Bamtoks College.',
  },
];
