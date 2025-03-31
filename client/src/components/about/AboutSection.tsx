import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import Timeline from './Timeline';
import TechStack from './TechStack';
import ContactInfo from '../contact/ContactInfo';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-portfolio-lightest dark:bg-portfolio-darker">
      <div className="container mx-auto px-4">
        <SectionTitle>
          About <span className="bg-gradient-to-r from-portfolio-primary to-portfolio-accent bg-clip-text text-transparent">Me</span>
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
            <div className="bg-white dark:bg-portfolio-dark p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-nunito font-bold text-2xl mb-6 text-portfolio-primary dark:text-portfolio-lighter">My Journey</h3>
              <p className="mb-4 leading-relaxed text-portfolio-text dark:text-portfolio-lighter/90">
                I'm a Data Guy with a strong background in financial services and telecommunications sectors. With expertise in SQL, Python, and various data processing technologies, I focus on designing efficient data pipelines and extracting valuable insights.
              </p>
              <p className="mb-6 leading-relaxed text-portfolio-text dark:text-portfolio-lighter/90">
                My journey began in finance and analytics, evolving into a more technical role specializing in data engineering, big data processing, and machine learning. I enjoy solving complex data challenges and building robust, scalable solutions.
              </p>
            </div>
            
            <div className="bg-white dark:bg-portfolio-dark p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow mt-6">
              <h3 className="font-nunito font-bold text-2xl mb-6 text-portfolio-primary dark:text-portfolio-lighter">Tech Stack</h3>
              <TechStack />
            </div>
            
            <div className="bg-white dark:bg-portfolio-dark p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow mt-6">
              <h3 className="font-nunito font-bold text-2xl mb-6 text-portfolio-primary dark:text-portfolio-lighter">Contact Information</h3>
              <ContactInfo />
            </div>
          </motion.div>
          
          {/* Timeline Section */}
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-portfolio-dark p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-nunito font-bold text-2xl mb-6 text-portfolio-primary dark:text-portfolio-lighter">Experience & Education</h3>
              <Timeline />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
