import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionTitle from '@/components/ui/SectionTitle';
import ProjectCard from './ProjectCard';
import { Project } from '@shared/types';
import { api } from '@/lib/staticApi';

const ProjectsSection = () => {
  const { t } = useTranslation();
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
    <section id="projects" className="bg-white py-20 dark:bg-portfolio-dark md:py-14">
      <div className="container mx-auto px-4">
        <SectionTitle>
          My side <span className="gradient-text">{t('projects.title')}</span>
        </SectionTitle>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-portfolio-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{t('projects.noProjects')}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
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

            <div className="mt-12 text-center md:mt-8">
              <a
                href="#top"
                className="font-nunito inline-flex items-center font-bold text-portfolio-primary transition-colors duration-300 hover:text-portfolio-dark dark:text-portfolio-lighter dark:hover:text-white"
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
