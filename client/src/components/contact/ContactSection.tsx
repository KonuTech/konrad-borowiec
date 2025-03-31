import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-white dark:bg-portfolio-dark">
      <div className="container mx-auto px-4">
        <SectionTitle>
          Get In <span className="bg-gradient-to-r from-portfolio-primary to-portfolio-accent bg-clip-text text-transparent">Touch</span>
        </SectionTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-portfolio-lightest dark:bg-portfolio-darker rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-nunito font-bold text-2xl mb-6 text-portfolio-primary dark:text-portfolio-lighter">Send Me a Message</h3>
              <ContactForm />
            </div>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ContactInfo />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
