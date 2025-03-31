import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 overflow-hidden">
      <div className="relative">
        <div className="cloud-bg h-80 opacity-20 dark:opacity-10"></div>
        <div className="cloud-mask absolute bottom-0 w-full h-40"></div>
      </div>
      
      <div className="container mx-auto px-4 -mt-60 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div 
            className="text-center md:text-left md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-ghibli-purple dark:text-ghibli-lightPink font-nunito font-bold mb-4">Hello, I'm</p>
            <h1 className="font-nunito font-extrabold text-4xl md:text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-ghibli-blue via-ghibli-purple to-ghibli-pink bg-clip-text text-transparent">
              Dev Portfolio
            </h1>
            <p className="text-lg mb-8 max-w-lg mx-auto md:mx-0">
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
                className="px-6 py-3 bg-white dark:bg-gray-800 text-ghibli-purple dark:text-ghibli-lightPink border-2 border-ghibli-purple dark:border-ghibli-lightPink rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-nunito font-bold"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              y: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              },
              opacity: { duration: 0.8 }
            }}
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-ghibli-blue via-ghibli-purple to-ghibli-pink opacity-30 animate-spin-slow"></div>
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" 
                alt="Developer portrait" 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-72 md:h-72 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
              />
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="flex justify-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex space-x-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-ghibli-pink transition-colors duration-300" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-ghibli-pink transition-colors duration-300" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-ghibli-pink transition-colors duration-300" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
