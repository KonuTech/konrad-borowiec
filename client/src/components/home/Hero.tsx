import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 overflow-hidden bg-gradient-to-b from-ghibli-lightBlue/30 to-white dark:from-ghibli-blue/20 dark:to-gray-900">
      {/* Floating elements */}
      <motion.div 
        className="absolute top-20 left-[10%] w-8 h-8 rounded-full bg-ghibli-yellow opacity-70"
        animate={{ 
          y: [0, -15, 0],
          x: [0, 8, 0] 
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute top-40 right-[15%] w-6 h-6 rounded-full bg-ghibli-lightPink opacity-70"
        animate={{ 
          y: [0, -20, 0],
          x: [0, -10, 0] 
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-32 left-[30%] w-10 h-10 rounded-full bg-ghibli-lightGreen opacity-60"
        animate={{ 
          y: [0, 20, 0],
          x: [0, 15, 0] 
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div 
            className="text-center md:text-left md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-ghibli-pink dark:text-ghibli-lightPink font-nunito font-bold mb-4 text-lg">Hello, I'm</p>
            <h1 className="font-nunito font-extrabold text-4xl md:text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-ghibli-blue via-ghibli-purple to-ghibli-pink bg-clip-text text-transparent drop-shadow-sm">
              Dev Portfolio
            </h1>
            <p className="text-lg mb-8 max-w-lg mx-auto md:mx-0 text-gray-700 dark:text-gray-300">
              A passionate full-stack developer crafting beautiful, functional web experiences with a touch of magic ✨
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a 
                href="#projects" 
                className="px-6 py-3 bg-gradient-to-r from-ghibli-blue to-ghibli-purple text-white rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-nunito font-bold"
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 bg-white dark:bg-gray-800 text-ghibli-pink dark:text-ghibli-lightPink border-2 border-ghibli-pink dark:border-ghibli-lightPink rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-nunito font-bold"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative circles */}
            <motion.div 
              className="absolute w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-1/2 left-0 w-5 h-5 -ml-2 rounded-full bg-ghibli-yellow"></div>
              <div className="absolute top-0 left-1/2 w-5 h-5 -mt-2 rounded-full bg-ghibli-lightGreen"></div>
              <div className="absolute top-1/2 right-0 w-5 h-5 -mr-2 rounded-full bg-ghibli-orange"></div>
              <div className="absolute bottom-0 left-1/2 w-5 h-5 -mb-2 rounded-full bg-ghibli-lightPink"></div>
            </motion.div>
            
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-ghibli-blue via-ghibli-lightPink to-ghibli-yellow opacity-40 animate-spin-slow"></div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" 
                  alt="Developer portrait" 
                  className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex space-x-8">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md text-xl hover:bg-ghibli-lightBlue dark:hover:bg-ghibli-blue/30 hover:text-ghibli-blue transition-colors duration-300" 
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md text-xl hover:bg-ghibli-lightPink dark:hover:bg-ghibli-pink/30 hover:text-ghibli-pink transition-colors duration-300" 
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md text-xl hover:bg-ghibli-lightGreen dark:hover:bg-ghibli-green/30 hover:text-ghibli-green transition-colors duration-300" 
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
