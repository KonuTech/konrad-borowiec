import type { TFunction } from 'i18next';
import i18n, { RTL_LANGS } from '@/i18n';
import { timelineItems } from '@/data/roles';
import { TECHNOLOGIES, TECH_BY_ID, SKILL_TECHNOLOGIES } from '@/data/technologies';
import { projects } from '@/data/data';
import type { CvBullets, CvModel, CvProject, CvRole } from './types';

// Contact details and proper nouns stay constant across languages (titles,
// organizations, and technology names are kept in English site-wide).
const NAME = 'Konrad Borowiec';
const HEADLINE = 'Data Engineer | Financial Services Specialist';
const EMAIL = 'borowiec.k@gmail.com';
const PHONE = '+48 570 223 108';
const LOCATION = 'Warsaw, Poland';
const GITHUB_URL = 'https://github.com/konutech';
const LINKEDIN_URL = 'https://linkedin.com/in/32167';
const CREDLY_URL = 'https://credly.com/users/konrad-borowiec/badges';

// i18next returns the key itself when a translation is missing — fall back to
// the English source text from the data layer in that case.
const translateOr = (t: TFunction, key: string, fallback: string): string => {
  const value = t(key);
  return value && value !== key ? value : fallback;
};

// Role descriptions are an intro paragraph followed by bullet items separated
// by '\n\n• ' (the '•' marker is preserved in every locale's translation).
export function parseDescription(text: string): CvBullets {
  const [intro, ...bullets] = text.split(/\n\s*\n?\s*•\s+/);
  return {
    intro: intro.trim(),
    bullets: bullets.map((b) => b.trim()).filter(Boolean),
  };
}

const techLabels = (ids: string[]): string[] => ids.map((id) => TECH_BY_ID.get(id)?.label ?? id);

// Aggregate every technology mentioned anywhere (role tags + project tags)
// that is not already a core skill. Registry entries come first in registry
// order; project-only names (not in the registry) are appended verbatim.
function collectAdditionalTechnologies(): string[] {
  const roleTechIds = new Set(timelineItems.flatMap((item) => item.technologies));
  const result: string[] = [];
  const seen = new Set<string>();

  for (const tech of TECHNOLOGIES) {
    if (!tech.isSkill && roleTechIds.has(tech.id)) {
      result.push(tech.label);
      seen.add(tech.label.toLowerCase());
    }
  }

  // Project technologies are plain display strings — match them against the
  // registry (label + aliases, case-insensitive) to avoid duplicates.
  const registryNames = new Map<string, string>();
  for (const tech of TECHNOLOGIES) {
    registryNames.set(tech.label.toLowerCase(), tech.label);
    for (const alias of tech.aliases) {
      registryNames.set(alias.toLowerCase(), tech.label);
    }
  }
  const coreLabels = new Set(SKILL_TECHNOLOGIES.map((tech) => tech.label.toLowerCase()));

  for (const project of projects) {
    for (const name of project.technologies ?? []) {
      const canonical = registryNames.get(name.toLowerCase()) ?? name;
      const key = canonical.toLowerCase();
      if (coreLabels.has(key) || seen.has(key)) continue;
      seen.add(key);
      result.push(canonical);
    }
  }

  return result;
}

export function buildCvModel(lang: string): CvModel {
  const base = (lang || 'en').toLowerCase().split('-')[0];
  const t = i18n.getFixedT(base);
  const now = new Date();

  const roles: CvRole[] = timelineItems.map((item, index) => ({
    title: item.title,
    organization: item.organization,
    period: item.period,
    technologies: techLabels(item.technologies),
    description: parseDescription(translateOr(t, `timeline.items.${index}`, item.description)),
  }));

  const cvProjects: CvProject[] = projects.map((project) => ({
    title: project.title,
    technologies: project.technologies ?? [],
    description: translateOr(t, `projects.items.${project.id}.description`, project.description),
    githubUrl: project.githubUrl ?? undefined,
  }));

  return {
    lang: base,
    dir: RTL_LANGS.includes(base) ? 'rtl' : 'ltr',
    name: NAME,
    headline: HEADLINE,
    contact: [
      { label: t('cv.labels.email'), value: EMAIL, href: `mailto:${EMAIL}` },
      { label: t('contact.labels.phone'), value: PHONE, href: `tel:${PHONE.replace(/\s/g, '')}` },
      { label: t('contact.labels.location'), value: LOCATION },
      { label: t('common.github'), value: 'github.com/konutech', href: GITHUB_URL },
      { label: t('common.linkedin'), value: 'linkedin.com/in/32167', href: LINKEDIN_URL },
      {
        label: t('common.credly'),
        value: 'credly.com/users/konrad-borowiec/badges',
        href: CREDLY_URL,
      },
    ],
    labels: {
      summary: t('cv.summary'),
      skills: t('about.skills'),
      skillsCore: t('cv.skillsCore'),
      skillsOther: t('cv.skillsOther'),
      experience: t('about.experience'),
      education: t('about.education'),
      sideProjects: t('cv.sideProjects'),
      technologies: t('projects.technologies'),
    },
    summary: [t('about.bio1'), t('about.bio2')],
    skillsCore: SKILL_TECHNOLOGIES.map((tech) => tech.label),
    skillsOther: collectAdditionalTechnologies(),
    experience: roles.filter((_, index) => timelineItems[index].type === 'work'),
    education: roles.filter((_, index) => timelineItems[index].type === 'education'),
    projects: cvProjects,
    footer: {
      generatedOn: t('cv.generatedOn', {
        date: new Intl.DateTimeFormat(base, { dateStyle: 'long' }).format(now),
      }),
      copyright: t('common.copyright', { year: now.getFullYear() }),
    },
  };
}
