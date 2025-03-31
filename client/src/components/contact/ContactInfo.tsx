import { FC } from 'react';

const ContactInfo: FC = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h3 className="font-nunito font-bold text-2xl mb-6 text-ghibli-purple dark:text-ghibli-lightPink">Contact Information</h3>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-ghibli-lightBlue dark:bg-ghibli-blue/30 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-envelope text-ghibli-blue dark:text-ghibli-lightBlue"></i>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Email</p>
              <a href="mailto:borowiec.k@gmail.com" className="text-ghibli-blue dark:text-ghibli-lightBlue hover:underline">borowiec.k@gmail.com</a>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-ghibli-lightPink dark:bg-ghibli-pink/30 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-phone text-ghibli-pink dark:text-ghibli-lightPink"></i>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Phone</p>
              <p>+48 570 223 108</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-ghibli-lightBlue dark:bg-ghibli-blue/30 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-map-marker-alt text-ghibli-blue dark:text-ghibli-lightBlue"></i>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Location</p>
              <p>Poland</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-ghibli-purple/20 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-clock text-ghibli-purple"></i>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Working Hours</p>
              <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-10">
        <h3 className="font-nunito font-bold text-xl mb-6 text-ghibli-purple dark:text-ghibli-lightPink">Connect With Me</h3>
        
        <div className="flex space-x-4">
          <a
            href="https://github.com/konutech"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:bg-ghibli-lightBlue dark:hover:bg-ghibli-blue/30 transition-colors duration-300"
            aria-label="GitHub"
          >
            <i className="fab fa-github text-xl"></i>
          </a>
          <a
            href="https://linkedin.com/in/32167"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:bg-ghibli-lightBlue dark:hover:bg-ghibli-blue/30 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin text-xl"></i>
          </a>
          <a
            href="https://credly.com/users/konrad-borowiec/badges"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:bg-ghibli-lightBlue dark:hover:bg-ghibli-blue/30 transition-colors duration-300"
            aria-label="Credly"
          >
            <i className="fas fa-certificate text-xl"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
