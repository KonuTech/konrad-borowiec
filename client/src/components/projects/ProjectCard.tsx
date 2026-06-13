import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Project } from '@shared/types';
import { trackEvent } from '@/lib/analytics';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const { t } = useTranslation();

  return (
    <div className="hover-card relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md dark:bg-portfolio-darker">
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent('project_link_clicked', { project_id: project.id, kind: 'github' })
          }
          aria-label={`${project.title} on GitHub`}
          className="absolute inset-0 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-primary"
        >
          <span className="sr-only">{project.title}</span>
        </a>
      )}
      <picture>
        {project.imageUrlMobile && (
          <source media="(max-width: 767px)" srcSet={project.imageUrlMobile} />
        )}
        <img
          src={project.imageUrl || ''}
          alt={project.title}
          className={project.wide ? 'h-auto w-full' : 'h-48 w-full object-cover'}
          loading="lazy"
        />
      </picture>
      <div className="flex flex-grow flex-col p-6">
        <div className="mb-3 flex items-start justify-between">
          <h3 className="font-nunito text-xl font-bold text-portfolio-dark dark:text-portfolio-lighter">
            {project.title}
          </h3>
        </div>
        <p className="mb-4 text-sm text-portfolio-text dark:text-portfolio-lighter">
          {t(`projects.items.${project.id}.description`, { defaultValue: project.description })}
        </p>
        <div className="mb-6 flex flex-wrap gap-2">
          {project.technologies &&
            project.technologies.map((tech, index) => (
              <span
                key={index}
                className="rounded-full bg-portfolio-lightest px-2 py-1 text-xs text-portfolio-text dark:bg-portfolio-dark dark:text-portfolio-lighter"
              >
                {tech}
              </span>
            ))}
        </div>
        <div className="relative z-20 mt-auto flex space-x-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent('project_link_clicked', { project_id: project.id, kind: 'demo' })
              }
              className="font-nunito text-sm font-bold text-portfolio-primary transition-colors duration-300 hover:text-portfolio-dark dark:text-portfolio-lighter dark:hover:text-white"
            >
              <i className="fas fa-external-link-alt mr-1"></i> {t('common.demo')}
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent('project_link_clicked', { project_id: project.id, kind: 'github' })
              }
              className="font-nunito text-sm font-bold text-portfolio-primary transition-colors duration-300 hover:text-portfolio-dark dark:text-portfolio-lighter dark:hover:text-white"
            >
              <i className="fab fa-github mr-1"></i> {t('common.github')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
