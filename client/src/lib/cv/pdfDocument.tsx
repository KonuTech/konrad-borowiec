import { Document, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import type { FC } from 'react';
import type { CvModel, CvProject, CvRole } from './types';

// Text-PDF layout for @react-pdf/renderer. Loaded lazily (with the library)
// only for languages in TEXT_PDF_LANGS — see pdf.tsx.

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Noto Sans',
    fontSize: 9.5,
    lineHeight: 1.45,
    color: '#1a202c',
    paddingVertical: 36,
    paddingHorizontal: 42,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#2c5282',
    paddingBottom: 10,
    marginBottom: 12,
  },
  // Name and headline share a single line — as separate stacked Texts the
  // large name's line box overlapped the headline below it.
  nameLine: { fontSize: 16, fontWeight: 'bold', color: '#2c5282', marginBottom: 8 },
  headline: { fontSize: 10.5, color: '#4a5568' },
  contactGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  contactItem: { width: '50%', fontSize: 8.5, marginBottom: 1 },
  sectionTitle: {
    fontSize: 12.5,
    fontWeight: 'bold',
    color: '#2c5282',
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e0',
    paddingBottom: 2,
    marginTop: 12,
    marginBottom: 8,
  },
  role: { marginBottom: 11 },
  roleTitle: { fontSize: 10.5, fontWeight: 'bold' },
  period: { fontSize: 8.5, color: '#718096', marginTop: 1 },
  tech: { fontSize: 8, color: '#4a5568', marginTop: 1, marginBottom: 2 },
  paragraph: { marginTop: 2 },
  bulletRow: { flexDirection: 'row', marginTop: 2 },
  bulletMarker: { width: 10 },
  bulletText: { flex: 1 },
  bold: { fontWeight: 'bold' },
  link: { color: '#2b6cb0', textDecoration: 'none' },
  footer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#cbd5e0',
    paddingTop: 6,
    fontSize: 8,
    color: '#718096',
    textAlign: 'center',
  },
});

const inlineOrg = (organization: string): string => organization.replace(/\s*\n\s*/g, ', ');

const RoleBlock: FC<{ role: CvRole; techLabel: string }> = ({ role, techLabel }) => (
  <View style={styles.role}>
    {/* Keep the header glued to at least the start of the description. */}
    <View minPresenceAhead={48}>
      <Text style={styles.roleTitle}>
        {role.title} — {inlineOrg(role.organization)}
      </Text>
      <Text style={styles.period}>{role.period}</Text>
      {role.technologies.length > 0 && (
        <Text style={styles.tech}>
          <Text style={styles.bold}>{techLabel}: </Text>
          {role.technologies.join(', ')}
        </Text>
      )}
    </View>
    {role.description.intro ? <Text style={styles.paragraph}>{role.description.intro}</Text> : null}
    {role.description.bullets.map((bullet, index) => (
      <View key={index} style={styles.bulletRow}>
        <Text style={styles.bulletMarker}>•</Text>
        <Text style={styles.bulletText}>{bullet}</Text>
      </View>
    ))}
  </View>
);

const ProjectBlock: FC<{ project: CvProject; techLabel: string }> = ({ project, techLabel }) => (
  <View style={styles.role}>
    <View minPresenceAhead={48}>
      <Text style={styles.roleTitle}>{project.title}</Text>
      {project.technologies.length > 0 && (
        <Text style={styles.tech}>
          <Text style={styles.bold}>{techLabel}: </Text>
          {project.technologies.join(', ')}
        </Text>
      )}
    </View>
    <Text style={styles.paragraph}>{project.description}</Text>
    {project.githubUrl ? (
      <Text style={styles.paragraph}>
        <Link style={styles.link} src={project.githubUrl}>
          {project.githubUrl.replace(/^https?:\/\//, '')}
        </Link>
      </Text>
    ) : null}
  </View>
);

const SectionTitle: FC<{ title: string }> = ({ title }) => (
  <Text style={styles.sectionTitle} minPresenceAhead={64}>
    {title}
  </Text>
);

export const CvDocument: FC<{ model: CvModel }> = ({ model }) => {
  const { labels } = model;
  return (
    <Document
      title={`${model.name} — CV`}
      author={model.name}
      subject={model.headline}
      language={model.lang}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.nameLine}>
            {model.name}
            <Text style={styles.headline}>{'  ·  ' + model.headline}</Text>
          </Text>
          <View style={styles.contactGrid}>
            {model.contact.map((entry, index) => (
              <Text key={index} style={styles.contactItem}>
                <Text style={styles.bold}>{entry.label}: </Text>
                {entry.href ? (
                  <Link style={styles.link} src={entry.href}>
                    {entry.value}
                  </Link>
                ) : (
                  entry.value
                )}
              </Text>
            ))}
          </View>
        </View>

        <SectionTitle title={labels.summary} />
        {model.summary.map((paragraph, index) => (
          <Text key={index} style={styles.paragraph}>
            {paragraph}
          </Text>
        ))}

        <SectionTitle title={labels.skills} />
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>{labels.skillsCore}: </Text>
          {model.skillsCore.join(', ')}
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>{labels.skillsOther}: </Text>
          {model.skillsOther.join(', ')}
        </Text>

        <SectionTitle title={labels.experience} />
        {model.experience.map((role, index) => (
          <RoleBlock key={index} role={role} techLabel={labels.technologies} />
        ))}

        <SectionTitle title={labels.education} />
        {model.education.map((role, index) => (
          <RoleBlock key={index} role={role} techLabel={labels.technologies} />
        ))}

        <SectionTitle title={labels.sideProjects} />
        {model.projects.map((project, index) => (
          <ProjectBlock key={index} project={project} techLabel={labels.technologies} />
        ))}

        <Text style={styles.footer}>
          {model.footer.generatedOn} · {model.footer.copyright}
        </Text>
      </Page>
    </Document>
  );
};
