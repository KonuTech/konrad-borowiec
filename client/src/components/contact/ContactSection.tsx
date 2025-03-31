import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle>
          Get In <span className="bg-gradient-to-r from-ghibli-blue to-ghibli-purple bg-clip-text text-transparent">Touch</span>
        </SectionTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
              <h3 className="font-nunito font-bold text-2xl mb-6 text-ghibli-purple dark:text-ghibli-lightPink">Send Me a Message</h3>
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
