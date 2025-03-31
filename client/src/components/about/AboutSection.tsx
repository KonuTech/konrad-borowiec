import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import Timeline from './Timeline';
import TechStack from './TechStack';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <SectionTitle>
          About <span className="bg-gradient-to-r from-ghibli-blue to-ghibli-purple bg-clip-text text-transparent">Me</span>
        </SectionTitle>
        
        <div className="flex flex-col md:flex-row gap-10">
          {/* Bio Section */}
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-nunito font-bold text-2xl mb-6 text-ghibli-purple dark:text-ghibli-lightPink">My Journey</h3>
            <p className="mb-4 leading-relaxed">
              I'm a Data Engineer and Analyst with a strong background in financial services and telecommunications sectors. With expertise in SQL, Python, and various data processing technologies, I focus on designing efficient data pipelines and extracting valuable insights.
            </p>
            <p className="mb-6 leading-relaxed">
              My journey began in finance and analytics, evolving into a more technical role specializing in data engineering, big data processing, and machine learning. I enjoy solving complex data challenges and building robust, scalable solutions.
            </p>
            
            <h3 className="font-nunito font-bold text-2xl mb-6 text-ghibli-purple dark:text-ghibli-lightPink">Tech Stack</h3>
            <TechStack />
          </motion.div>
          
          {/* Timeline Section */}
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-nunito font-bold text-2xl mb-6 text-ghibli-purple dark:text-ghibli-lightPink">Experience & Education</h3>
            <Timeline />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
