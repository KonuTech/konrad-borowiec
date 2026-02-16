import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import Timeline from './Timeline';
import TechStack from './TechStack';
import ContactInfo from '../contact/ContactInfo';

const AboutSection = () => {
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  return (
    <section id="about" className="py-20 md:py-14 bg-portfolio-lightest dark:bg-portfolio-darker">
      <div className="container mx-auto px-4">
        <SectionTitle>
          About <span className="bg-gradient-to-r from-portfolio-primary to-portfolio-accent bg-clip-text text-transparent">Me</span>
        </SectionTitle>
        
        <div className="flex flex-col md:flex-row gap-10 md:gap-6">
          {/* Bio Section */}
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-white dark:bg-portfolio-dark p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-nunito font-bold text-2xl mb-6 md:mb-4 text-portfolio-primary dark:text-portfolio-lighter">My Journey</h3>
              <p className="mb-4 leading-relaxed text-portfolio-text dark:text-portfolio-lighter/90 text-justify">
                I'm a Data Guy with a strong background in the financial services sector. I enjoy my work the most when the tools and solutions I develop are actively used by other people or businesses. With expertise in SQL, Python, and various data processing technologies, I focus on designing efficient data pipelines and extracting valuable insights.
              </p>
              <p className="mb-6 leading-relaxed text-portfolio-text dark:text-portfolio-lighter/90 text-justify">
                My journey began in finance and analytics, evolving into a more technical role specializing in data engineering, big data processing, and machine learning. I enjoy solving complex data challenges and building robust, reliable solutions.
              </p>
            </div>
            
            <div className="bg-white dark:bg-portfolio-dark p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow mt-6 md:mt-4">
              <h3 className="font-nunito font-bold text-2xl mb-6 md:mb-4 text-portfolio-primary dark:text-portfolio-lighter">Tech Stack</h3>
              <TechStack />
            </div>
            
            <div className="bg-white dark:bg-portfolio-dark p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow mt-6 md:mt-4">
              <div id="contact" className="scroll-mt-24"></div>
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
            <div ref={timelineRef} className="bg-white dark:bg-portfolio-dark p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-nunito font-bold text-2xl mb-6 md:mb-4 text-portfolio-primary dark:text-portfolio-lighter">Experience & Education</h3>
              <div className="relative">
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isTimelineExpanded ? 'max-h-[10000px]' : 'max-h-[400px] md:max-h-[1100px]'
                  }`}
                >
                  <Timeline />
                </div>
                {!isTimelineExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-portfolio-dark to-transparent pointer-events-none" />
                )}
              </div>
              <button
                onClick={() => {
                  if (isTimelineExpanded) {
                    timelineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  setIsTimelineExpanded(!isTimelineExpanded);
                }}
                className="mt-4 w-full text-center py-2 px-4 rounded-full font-nunito font-medium text-portfolio-primary dark:text-portfolio-lighter hover:bg-portfolio-primary/10 dark:hover:bg-portfolio-lighter/10 transition-colors duration-300"
              >
                {isTimelineExpanded ? 'Hide Timeline \u25B2' : 'Show Full Timeline \u25BC'}
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Back to Top Button */}
        <div className="flex justify-center mt-16 md:mt-8">
          <a 
            href="#home" 
            className="bg-portfolio-primary hover:bg-portfolio-primary/80 text-white px-6 py-3 rounded-full font-nunito font-medium flex items-center transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <i className="fas fa-arrow-up mr-2"></i> Back to Top
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
