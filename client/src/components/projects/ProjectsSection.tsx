import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import ProjectCard from './ProjectCard';
import { Project } from '@shared/schema';

const ProjectsSection = () => {
  const { data: projects = [], isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle>
          My <span className="bg-gradient-to-r from-ghibli-blue to-ghibli-purple bg-clip-text text-transparent">Projects</span>
        </SectionTitle>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ghibli-purple"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">Failed to load projects</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                href="#"
                className="inline-flex items-center font-nunito font-bold text-ghibli-purple dark:text-ghibli-lightPink hover:text-ghibli-pink dark:hover:text-ghibli-pink transition-colors duration-300"
              >
                View All Projects <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
