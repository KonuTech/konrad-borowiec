import { FC } from 'react';
import { Project } from '@shared/schema';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="hover-card bg-white dark:bg-portfolio-darker rounded-xl overflow-hidden shadow-md h-full flex flex-col">
      <img 
        src={project.imageUrl || ''} 
        alt={project.title} 
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-nunito font-bold text-xl text-portfolio-dark dark:text-portfolio-lighter">{project.title}</h3>
          {project.featured && (
            <span className="text-xs px-2 py-1 bg-portfolio-lightest dark:bg-portfolio-primary/30 text-portfolio-primary dark:text-portfolio-lighter rounded-full">Featured</span>
          )}
        </div>
        <p className="text-sm text-portfolio-text dark:text-portfolio-lighter mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies && project.technologies.map((tech, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-portfolio-lightest dark:bg-portfolio-dark text-portfolio-text dark:text-portfolio-lighter rounded-full">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4 mt-auto">
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-nunito font-bold text-portfolio-primary hover:text-portfolio-dark dark:text-portfolio-lighter dark:hover:text-white transition-colors duration-300"
            >
              <i className="fas fa-external-link-alt mr-1"></i> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-nunito font-bold text-portfolio-primary hover:text-portfolio-dark dark:text-portfolio-lighter dark:hover:text-white transition-colors duration-300"
            >
              <i className="fab fa-github mr-1"></i> GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
