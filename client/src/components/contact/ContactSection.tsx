import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import ContactInfo from './ContactInfo';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-white dark:bg-portfolio-dark">
      <div className="container mx-auto px-4">
        <SectionTitle>
          Get In <span className="bg-gradient-to-r from-portfolio-primary to-portfolio-accent bg-clip-text text-transparent">Touch</span>
        </SectionTitle>
        
        <div className="flex justify-center">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-lg"
          >
            <ContactInfo />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
