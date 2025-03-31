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
    <section id="projects" className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-ghibli-lightBlue/20 dark:from-gray-900 dark:to-ghibli-blue/10">
      {/* Decorative elements */}
      <motion.div 
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-ghibli-yellow/20 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-ghibli-lightPink/20 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle>
          My <span className="bg-gradient-to-r from-ghibli-blue via-ghibli-purple to-ghibli-pink bg-clip-text text-transparent">Projects</span>
        </SectionTitle>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-ghibli-lightBlue border-t-ghibli-blue"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-8 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <i className="fas fa-exclamation-circle text-3xl mb-4"></i>
            <p>Failed to load projects</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.1 * index,
                    ease: "easeOut"
                  }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a 
                href="#"
                className="inline-flex items-center font-nunito font-bold text-ghibli-blue dark:text-ghibli-lightBlue hover:text-ghibli-pink dark:hover:text-ghibli-lightPink transition-colors duration-300 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-xl transform hover:-translate-y-1"
              >
                View All Projects <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </motion.div>
          </>
        )}
      </div>
      
      {/* Small floating decorations */}
      <motion.div
        className="absolute bottom-12 right-[10%] w-6 h-6 rounded-full bg-ghibli-yellow/70"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute top-20 left-[8%] w-4 h-4 rounded-full bg-ghibli-lightGreen/70"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
};

export default ProjectsSection;
