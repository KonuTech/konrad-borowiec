import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import ProjectCard from './ProjectCard';
import { Project } from '@shared/types';
import { api } from '@/lib/staticApi';

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const data = await api.projects.getAll();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error loading projects:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-portfolio-dark">
      <div className="container mx-auto px-4">
        <SectionTitle>
          My side <span className="gradient-text">Projects</span>
        </SectionTitle>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-portfolio-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">Failed to load projects</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <a 
                href="#top"
                className="inline-flex items-center font-nunito font-bold text-portfolio-primary dark:text-portfolio-lighter hover:text-portfolio-dark dark:hover:text-white transition-colors duration-300"
              >
                Back to Top <i className="fas fa-arrow-up ml-2"></i>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
