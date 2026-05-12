import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ContactInfo from './ContactInfo';

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="bg-white py-20 dark:bg-portfolio-dark">
      <div className="container mx-auto px-4">
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
