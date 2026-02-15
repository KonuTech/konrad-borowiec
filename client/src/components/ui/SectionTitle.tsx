import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  children: ReactNode;
}

const SectionTitle: FC<SectionTitleProps> = ({ children }) => {
  return (
    <motion.div 
      className="text-center mb-16 md:mb-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-nunito font-bold text-3xl md:text-4xl mb-4">{children}</h2>
      <div className="w-20 h-1 bg-gradient-to-r from-ghibli-blue to-ghibli-purple mx-auto"></div>
    </motion.div>
  );
};

export default SectionTitle;
