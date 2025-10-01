import { motion } from "framer-motion";

// Profile photo served via Express static middleware
const profilePhoto = "/pictures/photos/konrad.jpg";

const Hero = () => {
  return (
    <section id="home" className="pt-16 md:pt-32 pb-20 overflow-hidden">
      <div className="relative">
        <div className="cloud-bg h-60 md:h-80 opacity-20 dark:opacity-10"></div>
        <div className="cloud-mask absolute bottom-0 w-full h-40"></div>
      </div>

      <div className="container mx-auto px-4 -mt-40 md:-mt-60 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          {/* Profile Photo - Positioned first on mobile for immediate visibility */}
          <motion.div
            className="md:w-1/2 flex justify-center order-first md:order-last"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.2 },
              y: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <div className="relative mb-6 md:mb-0">
              <div className="w-60 h-60 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-portfolio-primary via-portfolio-accent to-portfolio-light opacity-30 animate-spin-slow"></div>
              <img
                src={profilePhoto}
                alt="Konrad Borowiec portrait"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-52 h-52 md:w-72 md:h-72 rounded-full object-cover border-4 border-white dark:border-portfolio-dark shadow-lg bg-white"
                style={{ objectPosition: "center -50px" }}
              />
            </div>
          </motion.div>

          {/* Introduction Text - Second on mobile */}
          <motion.div
            className="text-center md:text-left md:w-1/2 order-last md:order-first"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-portfolio-primary dark:text-portfolio-light font-nunito font-bold mb-3 md:mb-4">
              Hello, I'm
            </p>
            <h1 className="font-nunito font-extrabold text-3xl md:text-5xl lg:text-6xl mb-3 md:mb-4 bg-gradient-to-r from-portfolio-primary via-portfolio-accent to-portfolio-dark bg-clip-text text-transparent">
              Konrad Borowiec
            </h1>
            <p className="text-lg mb-6 md:mb-8 max-w-lg mx-auto md:mx-0 text-portfolio-text dark:text-portfolio-lighter text-justify">
              Data isn't just numbers - it's the key to smarter decisions.
              <br />
              As your specialist in data engineering, analytics, and machine
              learning, I craft pipelines and unlock insights from raw
              data.
              <br />
              <br />
              Let's transform your data into a catalyst for progress!
            </p>
            <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-start gap-4 md:max-w-lg">
              <a
                href="#projects"
                className="px-6 py-3 bg-white dark:bg-portfolio-darker text-portfolio-primary dark:text-portfolio-lighter border border-portfolio-primary dark:border-portfolio-lighter rounded-md shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-nunito font-bold text-center flex items-center justify-center md:flex-1"
              >
                Check out my side projects
              </a>
              <a
                href="#contact-info"
                className="px-6 py-3 bg-portfolio-primary hover:bg-portfolio-dark text-white rounded-md shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-nunito font-bold text-center flex items-center justify-center md:flex-1"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center mt-10 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex space-x-5 md:space-x-6">
            <a
              href="https://github.com/konutech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl md:text-4xl text-portfolio-dark dark:text-portfolio-lighter hover:text-portfolio-primary transition-colors duration-300"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/32167"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl md:text-4xl text-portfolio-dark dark:text-portfolio-lighter hover:text-portfolio-primary transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://credly.com/users/konrad-borowiec/badges"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl md:text-4xl text-portfolio-dark dark:text-portfolio-lighter hover:text-portfolio-primary transition-colors duration-300"
              aria-label="Credly"
            >
              <i className="fas fa-certificate"></i>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
