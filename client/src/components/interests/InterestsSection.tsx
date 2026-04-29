import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import { api } from '@/lib/staticApi';

const InterestsSection: FC = () => {
  const [activeMotorcycleIndex, setActiveMotorcycleIndex] = useState(0);
  const [activeCyclingIndex, setActiveCyclingIndex] = useState(0);
  const [motorcycleImages, setMotorcycleImages] = useState<string[]>([]);
  const [cyclingImages, setCyclingImages] = useState<string[]>([]);
  const [activeGallery, setActiveGallery] = useState<'motorcycle' | 'cycling'>('motorcycle');

  // Load images from static data
  useEffect(() => {
    const loadImages = async () => {
      try {
        const [motorcycleData, cyclingData] = await Promise.all([
          api.images.getMotorcycle(),
          api.images.getCycling(),
        ]);

        setMotorcycleImages(motorcycleData);
        setCyclingImages(cyclingData);
      } catch (error) {
        console.error('Failed to load images:', error);
      }
    };

    loadImages();
  }, []);

  return (
    <section
      id="interests"
      className="bg-portfolio-lightest pb-6 pt-20 dark:bg-portfolio-darker md:pb-4 md:pt-14"
    >
      <div className="container mx-auto px-4">
        <SectionTitle>
          My{' '}
          <span className="bg-gradient-to-r from-portfolio-primary to-portfolio-accent bg-clip-text text-transparent">
            Interests and Hobbies
          </span>
        </SectionTitle>

        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-6 md:grid-cols-2 md:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 md:flex md:flex-col md:justify-between md:space-y-4"
          >
            <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-portfolio-dark">
              <h3 className="font-nunito mb-4 text-xl font-bold text-portfolio-primary dark:text-portfolio-lighter">
                Motorcycle Road Trips
              </h3>
              <p className="mb-4 text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                I'm passionate about exploring the world on two wheels. Motorcycle road trips offer
                me the perfect blend of adventure, freedom, and connection with nature. From winding
                mountain roads to coastal highways, each journey brings new perspectives and
                unforgettable experiences.
              </p>
              <p className="text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                Browse through my photo gallery from recent motorcycle journeys across beautiful
                landscapes, mountain roads, and coastal routes!
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-portfolio-dark">
              <h3 className="font-nunito mb-4 text-xl font-bold text-portfolio-primary dark:text-portfolio-lighter">
                Cycling
              </h3>
              <p className="mb-4 text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                Cycling is another passion of mine that allows me to stay active while exploring
                beautiful landscapes. Whether it's a quick ride through local trails or a day-long
                excursion in the countryside, cycling provides both physical exercise and mental
                refreshment.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-portfolio-dark">
              <h3 className="font-nunito mb-4 text-xl font-bold text-portfolio-primary dark:text-portfolio-lighter">
                Analytics Engineering & Technology
              </h3>
              <p className="mb-4 text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                Beyond my professional work, I'm deeply interested in the advancements in data
                engineering and analytics engineering. I enjoy working with modern data platforms,
                exploring new tools for data modeling and transformation, optimizing data pipelines,
                and experimenting with ways to make data more reliable, scalable, and actionable. I
                also keep up with the latest trends in cloud data infrastructure, ELT/ETL processes,
                and visualization techniques to stay current in the field.
              </p>
              <p className="text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                My technical reading list reflects this passion, as I constantly seek to expand my
                knowledge and skills in these rapidly evolving areas.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-portfolio-dark">
              <h3 className="font-nunito mb-4 text-xl font-bold text-portfolio-primary dark:text-portfolio-lighter">
                History, Architecture & Economics
              </h3>
              <p className="mb-4 text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                I have a profound interest in history, architecture, and economics, which greatly
                influences how I explore the world. Learning about different civilizations, their
                architectural achievements, and economic systems helps me understand the evolution
                of human society and culture.
              </p>
              <p className="text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                These interests are actually the driving forces behind my motorcycle road trips and
                cycling adventures. They allow me to directly experience historical sites,
                appreciate diverse architectural styles, and observe economic differences across
                regions—creating a deeper connection with the places I visit.
              </p>
            </div>

            <div className="mt-6 rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-portfolio-dark">
              <h3 className="font-nunito mb-4 text-xl font-bold text-portfolio-primary dark:text-portfolio-lighter">
                Financial Markets
              </h3>
              <p className="mb-4 text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                My journey in financial markets reflects a thoughtful, long-term investment approach
                rather than short-term trading. Starting a few years ago, I built a foundation with
                conservative instruments like anti-inflation bonds and ETFs, gradually expanding
                into dividend-generating Polish equities.
              </p>
              <p className="mb-4 text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                Currently, I maintain a diversified portfolio across both Polish and U.S. markets,
                applying a systematic investment strategy that has yielded satisfactory results.
                This hands-on experience has provided valuable insights into market dynamics and
                investment principles.
              </p>
              <p className="text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                For those interested in building their investment knowledge, particularly Polish
                speakers, I recommend{' '}
                <a
                  href="https://inwestomat.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-portfolio-primary transition-colors hover:text-portfolio-accent"
                >
                  inwestomat.eu
                </a>
                - an exceptional resource that offers university-caliber financial education in an
                accessible format.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 md:space-y-4"
          >
            {/* Combined Gallery with Tabs */}
            <div className="rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg dark:bg-portfolio-dark">
              <div className="mb-4 flex border-b border-portfolio-lightest dark:border-portfolio-dark">
                <button
                  className={`font-nunito px-4 py-2 font-medium transition-all ${
                    activeGallery === 'motorcycle'
                      ? 'border-b-2 border-portfolio-primary text-portfolio-primary'
                      : 'text-portfolio-muted hover:text-portfolio-primary'
                  }`}
                  onClick={() => setActiveGallery('motorcycle')}
                >
                  Motorcycle Gallery
                </button>
                <button
                  className={`font-nunito px-4 py-2 font-medium transition-all ${
                    activeGallery === 'cycling'
                      ? 'border-b-2 border-portfolio-primary text-portfolio-primary'
                      : 'text-portfolio-muted hover:text-portfolio-primary'
                  }`}
                  onClick={() => setActiveGallery('cycling')}
                >
                  Cycling Gallery
                </button>
              </div>

              {activeGallery === 'motorcycle' ? (
                <>
                  <div
                    className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg"
                    style={{ aspectRatio: '16/9' }}
                  >
                    <img
                      src={motorcycleImages[activeMotorcycleIndex]}
                      alt="Motorcycle road trip"
                      className="h-full w-full transform object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-6 gap-2">
                    {motorcycleImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveMotorcycleIndex(index)}
                        className={`overflow-hidden rounded-md transition-all ${activeMotorcycleIndex === index ? 'ring-2 ring-portfolio-primary' : 'opacity-70 hover:opacity-100'}`}
                      >
                        <img
                          src={image}
                          alt={`Motorcycle thumbnail ${index + 1}`}
                          className="aspect-square h-full w-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg"
                    style={{ aspectRatio: '16/9' }}
                  >
                    <img
                      src={cyclingImages[activeCyclingIndex]}
                      alt="Cycling adventure"
                      className="h-full w-full transform object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-6 gap-2">
                    {cyclingImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveCyclingIndex(index)}
                        className={`overflow-hidden rounded-md transition-all ${activeCyclingIndex === index ? 'ring-2 ring-portfolio-primary' : 'opacity-70 hover:opacity-100'}`}
                      >
                        <img
                          src={image}
                          alt={`Cycling thumbnail ${index + 1}`}
                          className="aspect-square h-full w-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Back to Top Button */}
        <div className="mt-8 text-center md:mt-4">
          <a
            href="#home"
            className="font-nunito inline-flex items-center font-bold text-portfolio-primary transition-colors duration-300 hover:text-portfolio-dark dark:text-portfolio-lighter dark:hover:text-white"
          >
            Back to Top <i className="fas fa-arrow-up ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InterestsSection;
