import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionTitle from '@/components/ui/SectionTitle';
import Timeline from './Timeline';
import TechStack from './TechStack';
import ContactInfo from '../contact/ContactInfo';

const AboutSection = () => {
  const { t } = useTranslation();
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);
  const [timelineMaxHeight, setTimelineMaxHeight] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef(false);
  const computeHeightRef = useRef<() => void>(() => {});

  useEffect(() => {
    const computeHeight = () => {
      if (expandedRef.current) return;
      const leftCol = leftColRef.current;
      const rightCard = timelineRef.current;
      const timelineContainer = timelineContainerRef.current;
      if (!leftCol || !rightCard || !timelineContainer) return;

      if (window.innerWidth < 768) {
        setTimelineMaxHeight(null);
        return;
      }

      const leftHeight = leftCol.offsetHeight;
      const rightCardHeight = rightCard.offsetHeight;
      const timelineContainerHeight = timelineContainer.offsetHeight;
      const nonTimelineHeight = rightCardHeight - timelineContainerHeight;
      const maxH = leftHeight - nonTimelineHeight;
      setTimelineMaxHeight(maxH > 0 ? maxH : null);
    };

    computeHeightRef.current = computeHeight;

    const observer = new ResizeObserver(() => computeHeight());
    if (leftColRef.current) observer.observe(leftColRef.current);
    window.addEventListener('resize', computeHeight);
    const timer = setTimeout(computeHeight, 800);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', computeHeight);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="about" className="bg-portfolio-lightest py-20 dark:bg-portfolio-darker md:py-14">
      <div className="container mx-auto px-4">
        <SectionTitle>
          <span>{t('about.headingPrefix')}</span>{' '}
          <span className="bg-gradient-to-r from-portfolio-primary to-portfolio-accent bg-clip-text text-transparent">
            {t('about.title')}
          </span>
        </SectionTitle>

        <div className="flex flex-col gap-10 md:flex-row md:gap-6">
          {/* Bio Section */}
          <motion.div
            ref={leftColRef}
            className="md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-portfolio-dark">
              <h3 className="font-nunito mb-6 text-2xl font-bold text-portfolio-primary dark:text-portfolio-lighter md:mb-4">
                {t('about.experience')}
              </h3>
              <p className="mb-4 text-justify leading-relaxed text-portfolio-text dark:text-portfolio-lighter/90">
                {t('about.bio1')}
              </p>
              <p className="mb-6 text-justify leading-relaxed text-portfolio-text dark:text-portfolio-lighter/90">
                {t('about.bio2')}
              </p>
            </div>

            <div className="mt-6 rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-portfolio-dark md:mt-4">
              <h3 className="font-nunito mb-6 text-2xl font-bold text-portfolio-primary dark:text-portfolio-lighter md:mb-4">
                {t('about.skills')}
              </h3>
              <TechStack />
              {/* Invisible anchor for "Contact Me" button navigation */}
              <div id="contact-anchor" aria-hidden="true"></div>
            </div>

            <div className="mt-6 rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-portfolio-dark md:mt-4">
              <div className="scroll-mt-24"></div>
              <ContactInfo />
            </div>
          </motion.div>

          {/* Timeline Section */}
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              ref={timelineRef}
              className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-portfolio-dark"
            >
              <h3 className="font-nunito mb-6 text-2xl font-bold text-portfolio-primary dark:text-portfolio-lighter md:mb-4">
                {t('about.timelineTitle')}
              </h3>
              <div className="relative">
                <div
                  ref={timelineContainerRef}
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isTimelineExpanded ? 'max-h-[10000px]' : 'max-h-[400px] md:max-h-[1050px]'
                  }`}
                  style={
                    !isTimelineExpanded && timelineMaxHeight !== null
                      ? { maxHeight: `${timelineMaxHeight}px` }
                      : undefined
                  }
                >
                  <Timeline />
                </div>
                {!isTimelineExpanded && (
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-portfolio-dark" />
                )}
              </div>
              <button
                onClick={() => {
                  if (isTimelineExpanded) {
                    timelineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Keep guard active during collapse animation, then recompute
                    setIsTimelineExpanded(false);
                    setTimeout(() => {
                      expandedRef.current = false;
                      requestAnimationFrame(() => computeHeightRef.current());
                    }, 600);
                  } else {
                    expandedRef.current = true;
                    setIsTimelineExpanded(true);
                  }
                }}
                className="font-nunito mt-4 w-full rounded-full px-4 py-2 text-center font-medium text-portfolio-primary transition-colors duration-300 hover:bg-portfolio-primary/10 dark:text-portfolio-lighter dark:hover:bg-portfolio-lighter/10"
              >
                {isTimelineExpanded ? t('about.hideTimeline') : t('about.showTimeline')}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Back to Top Button */}
        <div className="mt-16 flex justify-center md:mt-8">
          <a
            href="#home"
            className="font-nunito flex items-center rounded-full bg-portfolio-primary px-6 py-3 font-medium text-white shadow-md transition-all duration-300 hover:bg-portfolio-primary/80 hover:shadow-lg"
          >
            <i className="fas fa-arrow-up mr-2"></i> {t('ui.backToTop')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
