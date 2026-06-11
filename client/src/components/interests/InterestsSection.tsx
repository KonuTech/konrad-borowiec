import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionTitle from '@/components/ui/SectionTitle';
import { api } from '@/lib/staticApi';

// Auto-rotate the gallery to a new random photo on this cadence.
const GALLERY_ROTATE_MS = 5000;

// Random index in [0, length), avoiding `exclude` so the photo visibly changes.
const pickRandomIndex = (length: number, exclude: number): number => {
  if (length <= 1) return 0;
  let index = exclude;
  while (index === exclude) {
    index = Math.floor(Math.random() * length);
  }
  return index;
};

const InterestsSection: FC = () => {
  const { t, i18n } = useTranslation();
  const [activeMotorcycleIndex, setActiveMotorcycleIndex] = useState(0);
  const [activeCyclingIndex, setActiveCyclingIndex] = useState(0);
  const [motorcycleImages, setMotorcycleImages] = useState<string[]>([]);
  const [cyclingImages, setCyclingImages] = useState<string[]>([]);
  const [activeGallery, setActiveGallery] = useState<'motorcycle' | 'cycling'>('motorcycle');
  const [isGalleryPaused, setIsGalleryPaused] = useState(false);

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

  // Auto-rotate the right-hand gallery every few seconds: pick a random gallery
  // (Motorcycling / Cycling) and a random photo within it. Pauses on hover.
  useEffect(() => {
    if (isGalleryPaused) return;

    const galleries: ('motorcycle' | 'cycling')[] = [];
    if (motorcycleImages.length > 0) galleries.push('motorcycle');
    if (cyclingImages.length > 0) galleries.push('cycling');
    if (galleries.length === 0) return;

    const timer = setInterval(() => {
      const gallery = galleries[Math.floor(Math.random() * galleries.length)];
      setActiveGallery(gallery);
      if (gallery === 'motorcycle') {
        setActiveMotorcycleIndex((prev) => pickRandomIndex(motorcycleImages.length, prev));
      } else {
        setActiveCyclingIndex((prev) => pickRandomIndex(cyclingImages.length, prev));
      }
    }, GALLERY_ROTATE_MS);

    return () => clearInterval(timer);
  }, [isGalleryPaused, motorcycleImages.length, cyclingImages.length]);

  return (
    <section
      id="interests"
      className="bg-portfolio-lightest pb-6 pt-20 dark:bg-portfolio-darker md:pb-4 md:pt-14"
    >
      <div className="container mx-auto px-4">
        <SectionTitle>
          {i18n.language === 'en' ? (
            <>
              My{' '}
              <span className="bg-gradient-to-r from-portfolio-primary to-portfolio-accent bg-clip-text text-transparent">
                {t('interests.title')}
              </span>
            </>
          ) : (
            <>
              {t('interests.headingPrefix')}{' '}
              <span className="bg-gradient-to-r from-portfolio-primary to-portfolio-accent bg-clip-text text-transparent">
                {t('interests.title')}
              </span>
            </>
          )}
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
                {t('interests.categories.motorcycling')}
              </h3>
              <p className="mb-4 text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                {t('interests.motorcycling.description1')}
              </p>
              <p className="text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                {t('interests.motorcycling.description2')}
              </p>
              <p className="text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                {t('interests.motorcycling.description3')}
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-portfolio-dark">
              <h3 className="font-nunito mb-4 text-xl font-bold text-portfolio-primary dark:text-portfolio-lighter">
                {t('interests.categories.cycling')}
              </h3>
              <p className="mb-4 text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                {t('interests.cycling.description1')}
              </p>
              <p className="text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                {t('interests.cycling.description2')}
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-portfolio-dark">
              <h3 className="font-nunito mb-4 text-xl font-bold text-portfolio-primary dark:text-portfolio-lighter">
                {t('interests.categories.photography')}
              </h3>
              <p className="mb-4 text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                {t('interests.photography.description1')}
              </p>
              <p className="text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                {t('interests.photography.description2')}
              </p>
              <p className="text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                {t('interests.photography.description3')}
              </p>
              <p className="text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                {t('interests.photography.description4')}
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-portfolio-dark">
              <h3 className="font-nunito mb-4 text-xl font-bold text-portfolio-primary dark:text-portfolio-lighter">
                {t('interests.categories.history')}
              </h3>
              <p className="mb-4 text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                {t('interests.history.description1')}
              </p>
              <p className="text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                {t('interests.history.description2')}
              </p>
              <p className="text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                {t('interests.history.description3')}
              </p>
            </div>

            <div className="mt-6 rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-portfolio-dark">
              <h3 className="font-nunito mb-4 text-xl font-bold text-portfolio-primary dark:text-portfolio-lighter">
                {t('interests.categories.financial')}
              </h3>
              <p className="mb-4 text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                {t('interests.financial.description1')}
              </p>
              <p className="mb-4 text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                {t('interests.financial.description2')}
              </p>
              <p className="mb-4 text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                {t('interests.financial.description3')}
              </p>
              <p className="text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                {t('interests.financial.description4')}
              </p>
              <p className="text-justify text-portfolio-text dark:text-portfolio-lighter/90">
                {t('interests.financial.description5')}{' '}
                <a
                  href="https://inwestomat.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-portfolio-primary transition-colors hover:text-portfolio-accent"
                >
                  {t('interests.financial.recommendation')}
                </a>
                {t('interests.financial.recommendationDesc')}
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
            {/* Combined Gallery with Tabs (auto-rotates; pauses on hover) */}
            <div
              className="rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg dark:bg-portfolio-dark"
              onMouseEnter={() => setIsGalleryPaused(true)}
              onMouseLeave={() => setIsGalleryPaused(false)}
            >
              <div className="mb-4 flex border-b border-portfolio-lightest dark:border-portfolio-dark">
                <button
                  className={`font-nunito px-4 py-2 font-medium transition-all ${
                    activeGallery === 'motorcycle'
                      ? 'border-b-2 border-portfolio-primary text-portfolio-primary'
                      : 'text-portfolio-muted hover:text-portfolio-primary'
                  }`}
                  onClick={() => setActiveGallery('motorcycle')}
                >
                  {t('interests.categories.motorcycling')}
                </button>
                <button
                  className={`font-nunito px-4 py-2 font-medium transition-all ${
                    activeGallery === 'cycling'
                      ? 'border-b-2 border-portfolio-primary text-portfolio-primary'
                      : 'text-portfolio-muted hover:text-portfolio-primary'
                  }`}
                  onClick={() => setActiveGallery('cycling')}
                >
                  {t('interests.categories.cycling')}
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
            {t('ui.backToTop')} <i className="fas fa-arrow-up ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InterestsSection;
