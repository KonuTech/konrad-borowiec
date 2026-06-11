import type { CvModel, CvProject, CvRole } from './types';

const esc = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const orgHtml = (organization: string): string =>
  organization
    .split(/\s*\n\s*/)
    .map(esc)
    .join('<br />');

// Styles are scoped under .cv-root so the same sheet works both in the
// standalone HTML document and inside the raster-PDF render container.
// CSS logical properties make the layout mirror automatically under dir="rtl".
// The break-* rules drive pagination for both browser printing and html2pdf.
const CSS = `
  .cv-root { max-width: 210mm; margin: 0 auto; padding: 28px;
    font-family: 'Segoe UI', 'Noto Sans', 'Helvetica Neue', Arial, 'Hiragino Sans',
      'Yu Gothic UI', 'Microsoft YaHei', 'Malgun Gothic', 'Noto Naskh Arabic',
      'Noto Sans Devanagari', sans-serif;
    font-size: 10.5pt; line-height: 1.5; color: #1a202c; background: #ffffff; }
  .cv-root * { box-sizing: border-box; }
  .cv-root header { border-block-end: 2px solid #2c5282; padding-block-end: 12px; margin-block-end: 14px; }
  .cv-root h1 { margin: 0 0 2px; font-size: 21pt; line-height: 1.2; color: #2c5282; }
  .cv-root .headline { margin: 0 0 10px; font-size: 11.5pt; font-weight: 600; color: #4a5568; }
  .cv-root ul.contact { list-style: none; margin: 0; padding: 0; display: grid;
    grid-template-columns: 1fr 1fr; gap: 2px 18px; font-size: 9.5pt; }
  .cv-root h2 { font-size: 13pt; color: #2c5282; border-block-end: 1px solid #cbd5e0;
    padding-block-end: 3px; margin: 16px 0 10px; break-after: avoid; }
  .cv-root h3 { font-size: 11pt; margin: 0; break-after: avoid; }
  .cv-root article { margin-block-end: 13px; }
  .cv-root .role-header { break-inside: avoid; break-after: avoid; }
  .cv-root .period { font-size: 9.5pt; color: #718096; margin: 1px 0 2px; }
  .cv-root .tech { font-size: 9pt; color: #4a5568; margin: 0 0 4px; }
  .cv-root p { margin: 4px 0; }
  .cv-root ul.bullets { margin: 4px 0 0; padding-inline-start: 18px; }
  .cv-root ul.bullets li { margin-block-end: 3px; break-inside: avoid; }
  .cv-root a { color: #2b6cb0; text-decoration: none; overflow-wrap: anywhere; }
  .cv-root footer { margin-block-start: 18px; border-block-start: 1px solid #cbd5e0;
    padding-block-start: 8px; font-size: 9pt; color: #718096; text-align: center; }
  @media print {
    @page { size: A4; margin: 14mm; }
    .cv-root { max-width: none; padding: 0; font-size: 10pt; }
    .cv-root a { color: inherit; }
  }
`;

const roleArticle = (role: CvRole, techLabel: string): string => {
  const tech =
    role.technologies.length > 0
      ? `<p class="tech"><strong>${esc(techLabel)}:</strong> ${esc(role.technologies.join(', '))}</p>`
      : '';
  const intro = role.description.intro ? `<p>${esc(role.description.intro)}</p>` : '';
  const bullets =
    role.description.bullets.length > 0
      ? `<ul class="bullets">${role.description.bullets
          .map((bullet) => `<li>${esc(bullet)}</li>`)
          .join('')}</ul>`
      : '';
  return `<article>
    <div class="role-header">
      <h3>${esc(role.title)} — ${orgHtml(role.organization)}</h3>
      <p class="period">${esc(role.period)}</p>
      ${tech}
    </div>
    ${intro}
    ${bullets}
  </article>`;
};

const projectArticle = (project: CvProject, techLabel: string): string => {
  const tech =
    project.technologies.length > 0
      ? `<p class="tech"><strong>${esc(techLabel)}:</strong> ${esc(project.technologies.join(', '))}</p>`
      : '';
  const link = project.githubUrl
    ? `<p><a href="${esc(project.githubUrl)}">${esc(project.githubUrl.replace(/^https?:\/\//, ''))}</a></p>`
    : '';
  return `<article>
    <div class="role-header">
      <h3>${esc(project.title)}</h3>
      ${tech}
    </div>
    <p>${esc(project.description)}</p>
    ${link}
  </article>`;
};

const contactItem = ({ label, value, href }: CvModel['contact'][number]): string => {
  const rendered = href ? `<a href="${esc(href)}">${esc(value)}</a>` : esc(value);
  return `<li><strong>${esc(label)}:</strong> ${rendered}</li>`;
};

// Body markup + scoped styles, reused by both the standalone document and the
// raster-PDF container (which cannot use <html>/<head>).
export function renderHtmlBody(model: CvModel): string {
  const { labels } = model;
  return `<style>${CSS}</style>
<div class="cv-root" dir="${model.dir}" lang="${model.lang}">
  <header>
    <h1>${esc(model.name)}</h1>
    <p class="headline">${esc(model.headline)}</p>
    <ul class="contact">${model.contact.map(contactItem).join('')}</ul>
  </header>
  <main>
    <section>
      <h2>${esc(labels.summary)}</h2>
      ${model.summary.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}
    </section>
    <section>
      <h2>${esc(labels.skills)}</h2>
      <p><strong>${esc(labels.skillsCore)}:</strong> ${esc(model.skillsCore.join(', '))}</p>
      <p><strong>${esc(labels.skillsOther)}:</strong> ${esc(model.skillsOther.join(', '))}</p>
    </section>
    <section>
      <h2>${esc(labels.experience)}</h2>
      ${model.experience.map((role) => roleArticle(role, labels.technologies)).join('')}
    </section>
    <section>
      <h2>${esc(labels.education)}</h2>
      ${model.education.map((role) => roleArticle(role, labels.technologies)).join('')}
    </section>
    <section>
      <h2>${esc(labels.sideProjects)}</h2>
      ${model.projects.map((project) => projectArticle(project, labels.technologies)).join('')}
    </section>
  </main>
  <footer>${esc(model.footer.generatedOn)} · ${esc(model.footer.copyright)}</footer>
</div>`;
}

export function renderHtmlDocument(model: CvModel): string {
  return `<!DOCTYPE html>
<html lang="${model.lang}" dir="${model.dir}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${model.name} — CV</title>
</head>
<body style="margin:0">
${renderHtmlBody(model)}
</body>
</html>
`;
}
