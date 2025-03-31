import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-ghibli-lightGreen/20 dark:from-gray-900 dark:to-ghibli-green/10">
      {/* Decorative elements */}
      <motion.div 
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-ghibli-lightBlue/20 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute bottom-40 right-0 w-60 h-60 rounded-full bg-ghibli-lightPink/20 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating objects */}
      <motion.div
        className="absolute top-10 right-10 w-12 h-12"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0, -10, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 24 24" className="w-full h-full text-ghibli-lightBlue">
          <path d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z" fill="currentColor" />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute bottom-10 left-10 w-14 h-14"
        animate={{ 
          y: [0, -15, 0],
          rotate: 360
        }}
        transition={{ 
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
      >
        <svg viewBox="0 0 24 24" className="w-full h-full text-ghibli-lightPink">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M15.5,11A1.5,1.5 0 0,0 17,9.5A1.5,1.5 0 0,0 15.5,8A1.5,1.5 0 0,0 14,9.5A1.5,1.5 0 0,0 15.5,11M8.5,11A1.5,1.5 0 0,0 10,9.5A1.5,1.5 0 0,0 8.5,8A1.5,1.5 0 0,0 7,9.5A1.5,1.5 0 0,0 8.5,11M12,17.5C14.33,17.5 16.3,16.04 17.11,14H6.89C7.7,16.04 9.67,17.5 12,17.5Z" fill="currentColor" />
        </svg>
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle>
          Get In <span className="bg-gradient-to-r from-ghibli-blue via-ghibli-purple to-ghibli-pink bg-clip-text text-transparent">Touch</span>
        </SectionTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotateY: -5 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, type: "spring" }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-ghibli-lightPink/30"></div>
              <div className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-ghibli-lightBlue/30"></div>
              
              <div className="relative">
                <h3 className="font-nunito font-bold text-2xl mb-6 text-ghibli-pink dark:text-ghibli-lightPink">
                  Send Me a Message
                </h3>
                <ContactForm />
              </div>
            </div>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotateY: 5 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg relative overflow-hidden h-full">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-r-[60px] border-t-ghibli-lightBlue/20 border-r-transparent"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[60px] border-l-[60px] border-b-ghibli-lightPink/20 border-l-transparent"></div>
              
              <div className="relative">
                <ContactInfo />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
