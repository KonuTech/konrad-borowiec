import { FC } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@shared/schema';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div 
      className="ghibli-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg h-full flex flex-col"
      whileHover={{ 
        y: -10,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        transition: { duration: 0.3 }
      }}
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={project.imageUrl || ''} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
        />
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="text-xs px-3 py-1 bg-ghibli-lightBlue dark:bg-ghibli-blue/50 text-ghibli-blue dark:text-white rounded-full font-bold shadow-sm">
              ✨ Featured
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow relative">
        {/* Decorative dot in the corner */}
        <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-gradient-to-br from-ghibli-lightPink to-ghibli-pink opacity-80"></div>
        
        <h3 className="font-nunito font-bold text-xl text-gray-800 dark:text-white mb-3">{project.title}</h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies && project.technologies.map((tech, index) => {
            // Rotate through colors for technology tags
            const colors = [
              "bg-ghibli-lightBlue/30 text-ghibli-blue",
              "bg-ghibli-lightPink/30 text-ghibli-pink",
              "bg-ghibli-lightGreen/30 text-ghibli-green",
              "bg-ghibli-yellow/30 text-amber-700",
              "bg-ghibli-purple/20 text-ghibli-purple"
            ];
            
            return (
              <span 
                key={index} 
                className={`text-xs px-3 py-1 rounded-full font-medium ${colors[index % colors.length]}`}
              >
                {tech}
              </span>
            );
          })}
        </div>
        
        <div className="flex space-x-4 mt-auto">
          {project.liveUrl && (
            <motion.a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-nunito font-bold text-ghibli-blue hover:text-ghibli-pink transition-colors duration-300 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-external-link-alt mr-2"></i> Live Demo
            </motion.a>
          )}
          
          {project.githubUrl && (
            <motion.a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-nunito font-bold text-ghibli-blue hover:text-ghibli-pink transition-colors duration-300 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fab fa-github mr-2"></i> GitHub
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
