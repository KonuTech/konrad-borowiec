import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  children: ReactNode;
}

const SectionTitle: FC<SectionTitleProps> = ({ children }) => {
  return (
    <motion.div
      className="mb-16 text-center md:mb-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-nunito mb-4 text-3xl font-bold md:text-4xl">{children}</h2>
      <div className="from-ghibli-blue to-ghibli-purple mx-auto h-1 w-20 bg-gradient-to-r"></div>
    </motion.div>
  );
};

export default SectionTitle;
