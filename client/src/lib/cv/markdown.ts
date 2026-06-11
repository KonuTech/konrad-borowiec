import type { CvModel, CvProject, CvRole } from './types';

// Some organization names span two lines in the data — join for inline use.
const inlineOrg = (organization: string): string => organization.replace(/\s*\n\s*/g, ', ');

const roleBlock = (role: CvRole, techLabel: string): string => {
  const lines: string[] = [
    `### ${role.title} — ${inlineOrg(role.organization)}`,
    '',
    `*${role.period}*`,
    '',
  ];
  if (role.technologies.length > 0) {
    lines.push(`**${techLabel}:** ${role.technologies.join(', ')}`, '');
  }
  if (role.description.intro) {
    lines.push(role.description.intro, '');
  }
  if (role.description.bullets.length > 0) {
    lines.push(...role.description.bullets.map((bullet) => `- ${bullet}`), '');
  }
  return lines.join('\n').trimEnd();
};

const projectBlock = (project: CvProject, techLabel: string): string => {
  const lines: string[] = [`### ${project.title}`, ''];
  if (project.technologies.length > 0) {
    lines.push(`**${techLabel}:** ${project.technologies.join(', ')}`, '');
  }
  lines.push(project.description, '');
  if (project.githubUrl) {
    lines.push(`[${project.githubUrl.replace(/^https?:\/\//, '')}](${project.githubUrl})`, '');
  }
  return lines.join('\n').trimEnd();
};

export function renderMarkdown(model: CvModel): string {
  const { labels } = model;

  const contact = model.contact.map((entry) => {
    const value = entry.href ? `[${entry.value}](${entry.href})` : entry.value;
    return `- **${entry.label}:** ${value}`;
  });

  const sections: string[] = [
    `# ${model.name}`,
    `**${model.headline}**`,
    contact.join('\n'),
    `## ${labels.summary}`,
    model.summary.join('\n\n'),
    `## ${labels.skills}`,
    `**${labels.skillsCore}:** ${model.skillsCore.join(', ')}`,
    `**${labels.skillsOther}:** ${model.skillsOther.join(', ')}`,
    `## ${labels.experience}`,
    ...model.experience.map((role) => roleBlock(role, labels.technologies)),
    `## ${labels.education}`,
    ...model.education.map((role) => roleBlock(role, labels.technologies)),
    `## ${labels.sideProjects}`,
    ...model.projects.map((project) => projectBlock(project, labels.technologies)),
    '---',
    `${model.footer.generatedOn} · ${model.footer.copyright}`,
  ];

  return sections.join('\n\n') + '\n';
}
