import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Profile photo served via Express static middleware
const profilePhoto = '/pictures/photos/konrad.jpg';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="pt-13 overflow-hidden pb-20 md:pb-14 md:pt-20">
      <div className="relative">
        <div className="cloud-bg h-60 opacity-20 dark:opacity-10 md:h-64"></div>
        <div className="cloud-mask absolute bottom-0 h-40 w-full"></div>
      </div>

      <div className="container relative z-10 mx-auto -mt-40 px-4 md:-mt-48">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-10">
          {/* Profile Photo - Positioned first on mobile for immediate visibility */}
          <motion.div
            className="order-first flex justify-center md:order-last md:w-1/2"
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
                ease: 'easeInOut',
              },
            }}
          >
            <div className="relative mb-6 md:mb-0">
              <div className="animate-spin-slow h-60 w-60 rounded-full bg-gradient-to-r from-portfolio-primary via-portfolio-accent to-portfolio-light opacity-30 md:h-80 md:w-80"></div>
              <img
                src={profilePhoto}
                alt={t('hero.title')}
                className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-4 border-white bg-white object-cover shadow-lg dark:border-portfolio-dark md:h-72 md:w-72"
                style={{ objectPosition: 'center -50px' }}
              />
            </div>
          </motion.div>

          {/* Introduction Text - Second on mobile */}
          <motion.div
            className="order-last text-center md:order-first md:w-1/2 md:text-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-nunito mb-3 font-bold text-portfolio-primary dark:text-portfolio-light md:mb-4">
              {t('hero.intro')}
            </p>
            <h1 className="font-nunito mb-3 bg-gradient-to-r from-portfolio-primary via-portfolio-accent to-portfolio-dark bg-clip-text text-3xl font-extrabold text-transparent md:mb-4 md:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mx-auto mb-6 max-w-lg text-justify text-lg text-portfolio-text dark:text-portfolio-lighter md:mx-0 md:mb-8">
              {t('hero.subtitle')}
              <br />
              {t('hero.description')}
            </p>
            <div className="flex flex-col flex-wrap justify-center gap-4 md:max-w-lg md:flex-row md:justify-start">
              <a
                href="#projects"
                className="font-nunito flex transform items-center justify-center rounded-md border border-portfolio-primary bg-white px-6 py-3 text-center font-bold text-portfolio-primary shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-portfolio-lighter dark:bg-portfolio-darker dark:text-portfolio-lighter md:flex-1"
              >
                {t('hero.ctaProjects')}
              </a>
              <a
                href="#contact-anchor"
                onClick={(e) => {
                  e.preventDefault();
                  const anchor = document.getElementById('contact-anchor');
                  if (anchor) {
                    const element = anchor.nextElementSibling;
                    const target = element || anchor;
                    const elementTop = target.getBoundingClientRect().top + window.pageYOffset;
                    const offsetTop = elementTop - 100;
                    window.scrollTo({
                      top: offsetTop,
                      behavior: 'smooth',
                    });
                  }
                }}
                className="font-nunito flex transform items-center justify-center rounded-md bg-portfolio-primary px-6 py-3 text-center font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-portfolio-dark hover:shadow-lg md:flex-1"
              >
                {t('hero.ctaContact')}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
