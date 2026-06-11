// Structured CV model assembled by buildCvModel() and consumed by the three
// renderers (markdown.ts, html.ts, pdfDocument.tsx). All text is already in
// the target language; renderers only deal with layout.

export type CvBullets = {
  intro: string;
  bullets: string[];
};

export type CvRole = {
  title: string;
  organization: string; // may contain '\n' (multi-line org names) — renderers normalize
  period: string; // 'MM.YYYY - MM.YYYY'
  technologies: string[]; // display labels, already resolved
  description: CvBullets;
};

export type CvProject = {
  title: string;
  technologies: string[];
  description: string;
  githubUrl?: string;
};

export type CvContactEntry = {
  label: string;
  value: string;
  href?: string;
};

export type CvSectionLabels = {
  summary: string;
  skills: string;
  skillsCore: string;
  skillsOther: string;
  experience: string;
  education: string;
  sideProjects: string;
  technologies: string;
};

export type CvModel = {
  lang: string;
  dir: 'ltr' | 'rtl';
  name: string;
  headline: string;
  contact: CvContactEntry[];
  labels: CvSectionLabels;
  summary: string[];
  skillsCore: string[];
  skillsOther: string[];
  experience: CvRole[];
  education: CvRole[];
  projects: CvProject[];
  footer: {
    generatedOn: string;
    copyright: string;
  };
};

export type CvFormat = 'pdf' | 'html' | 'md';
