import { FC } from 'react';

const ContactInfo: FC = () => {
  return (
    <div className="bg-portfolio-lightest dark:bg-portfolio-darker rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between h-full">
      <div>
        <h3 className="font-nunito font-bold text-2xl mb-6 text-portfolio-primary dark:text-portfolio-lighter">Contact Information</h3>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-portfolio-lighter/30 dark:bg-portfolio-primary/30 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-envelope text-portfolio-primary dark:text-portfolio-lighter"></i>
            </div>
            <div>
              <p className="text-sm font-medium mb-1 text-portfolio-text dark:text-portfolio-lighter/80">Email</p>
              <a href="mailto:borowiec.k@gmail.com" className="text-portfolio-primary dark:text-portfolio-lighter hover:underline">borowiec.k@gmail.com</a>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-portfolio-lighter/30 dark:bg-portfolio-primary/30 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-phone text-portfolio-primary dark:text-portfolio-lighter"></i>
            </div>
            <div>
              <p className="text-sm font-medium mb-1 text-portfolio-text dark:text-portfolio-lighter/80">Phone</p>
              <p className="text-portfolio-text dark:text-portfolio-lighter">+48 570 223 108</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-portfolio-lighter/30 dark:bg-portfolio-primary/30 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-map-marker-alt text-portfolio-primary dark:text-portfolio-lighter"></i>
            </div>
            <div>
              <p className="text-sm font-medium mb-1 text-portfolio-text dark:text-portfolio-lighter/80">Location</p>
              <p className="text-portfolio-text dark:text-portfolio-lighter">Warsaw, Poland</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-10">
        <h3 className="font-nunito font-bold text-xl mb-6 text-portfolio-primary dark:text-portfolio-lighter">Connect With Me</h3>
        
        <div className="flex space-x-4">
          <a
            href="https://github.com/konutech"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white dark:bg-portfolio-dark shadow-md flex items-center justify-center hover:bg-portfolio-lighter dark:hover:bg-portfolio-primary/30 transition-colors duration-300"
            aria-label="GitHub"
          >
            <i className="fab fa-github text-xl text-portfolio-primary dark:text-portfolio-lighter"></i>
          </a>
          <a
            href="https://linkedin.com/in/32167"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white dark:bg-portfolio-dark shadow-md flex items-center justify-center hover:bg-portfolio-lighter dark:hover:bg-portfolio-primary/30 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin text-xl text-portfolio-primary dark:text-portfolio-lighter"></i>
          </a>
          <a
            href="https://credly.com/users/konrad-borowiec/badges"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white dark:bg-portfolio-dark shadow-md flex items-center justify-center hover:bg-portfolio-lighter dark:hover:bg-portfolio-primary/30 transition-colors duration-300"
            aria-label="Credly"
          >
            <i className="fas fa-certificate text-xl text-portfolio-primary dark:text-portfolio-lighter"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
