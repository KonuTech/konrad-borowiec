import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";

// Real motorcycle images - just a starter set, we'll load all dynamically
const realMotorcycleImages = [
  "/images/motorcycles/motorcycle-mountain-road.jpg",
  "/images/motorcycles/motorcycle-camping.jpg",
  "/images/motorcycles/mountain-fjord-view.jpg",
  "/images/motorcycles/beach-sunset.jpg",
  "/images/motorcycles/mountain-valley-river.jpg",
  "/images/motorcycles/castle-lake-view.jpg",
  "/images/motorcycles/cruise-ship-fjord.jpg",
  "/images/motorcycles/mountain-fjord-overlook.jpg",
  "/images/motorcycles/highland-lake-view.jpg",
  "/images/motorcycles/highland-valley.jpg",
  "/images/motorcycles/highland-plain.jpg",
  "/images/motorcycles/mountain-cliff-road.jpg",
  "/images/motorcycles/coastal-road-view.jpg",
  "/images/motorcycles/ferry-motorcycles.jpg",
  "/images/motorcycles/alpine-mountain-view.jpg",
  "/images/motorcycles/mountain-restaurant.jpg",
  "/images/motorcycles/sunset-coastal-ride.jpg",
  "/images/motorcycles/venice-canal.jpg",
  "/images/motorcycles/blue-motorcycle-mountains.jpg",
  "/images/motorcycles/alpine-valley-view.jpg",
  "/images/motorcycles/camping-with-motorcycle.jpg",
  "/images/motorcycles/ferry-motorcycle-deck.jpg",
  "/images/motorcycles/IMG_20220708_094645.jpg",
  "/images/motorcycles/IMG_20220708_162848.jpg",
  "/images/motorcycles/IMG_20220713_172632.jpg",
  "/images/motorcycles/IMG_20220713_180355.jpg",
  "/images/motorcycles/IMG_20220717_144202.jpg",
  "/images/motorcycles/IMG_20240506_101431.jpg",
  "/images/motorcycles/IMG_20240506_102354.jpg",
  "/images/motorcycles/IMG_20240506_143240.jpg",
  "/images/motorcycles/IMG_20240506_182721.jpg",
  "/images/motorcycles/IMG_20240509_131509.jpg",
  "/images/motorcycles/IMG_20240509_191420.jpg",
  "/images/motorcycles/IMG_20240515_171651.jpg",
  "/images/motorcycles/alto-de-velefique-sign.jpg",
  "/images/motorcycles/blue-motorcycle-mountain-pass.jpg",
  "/images/motorcycles/blue-motorcycles-parked.jpg",
  "/images/motorcycles/cabo-da-roca-sign.jpg",
  "/images/motorcycles/canyon-walkway-bridge.jpg",
  "/images/motorcycles/castle-mountain-cliff.jpg",
  "/images/motorcycles/col-de-iseran-sign.jpg",
  "/images/motorcycles/collada-de-toses-sign.jpg",
  "/images/motorcycles/desert-mountain-road.jpg",
  "/images/motorcycles/golden-fields-landscape.jpg",
  "/images/motorcycles/motorcycle-by-river.jpg",
  "/images/motorcycles/motorcycle-country-road.jpg",
  "/images/motorcycles/motorcycle-ferry-port.jpg",
  "/images/motorcycles/motorcycles-mountain-road-signs.jpg",
];

// Fallback motorcycle images
const fallbackMotorcycleImages = [
  "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1525160354320-d8e92641c563?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  "https://images.unsplash.com/photo-1571646750134-88aa82a0154c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80",
  "https://images.unsplash.com/photo-1508357710528-af67c8d478a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1622185135505-2d795003994a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
];

// Cycling image
const cyclingImages = ["/images/cycling/IMG_20220713_171341.jpg"];

const InterestsSection: FC = () => {
  const [activeMotorcycleIndex, setActiveMotorcycleIndex] = useState(0);
  const [activeCyclingIndex, setActiveCyclingIndex] = useState(0);
  const [motorcycleImages, setMotorcycleImages] = useState<string[]>(
    fallbackMotorcycleImages,
  );
  const [activeGallery, setActiveGallery] = useState<"motorcycle" | "cycling">(
    "motorcycle",
  );

  // Use the real images directly from the static files
  useEffect(() => {
    // Just set the motorcycle images directly
    setMotorcycleImages(realMotorcycleImages);
  }, []);

  return (
    <section
      id="interests"
      className="py-20 bg-portfolio-lightest dark:bg-portfolio-darker"
    >
      <div className="container mx-auto px-4">
        <SectionTitle>
          My{" "}
          <span className="bg-gradient-to-r from-portfolio-primary to-portfolio-accent bg-clip-text text-transparent">
            Interests and Hobbies
          </span>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-portfolio-dark p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-nunito font-bold text-xl mb-4 text-portfolio-primary dark:text-portfolio-lighter">
                Motorcycle Road Trips
              </h3>
              <p className="mb-4 text-portfolio-text dark:text-portfolio-lighter/90">
                I'm passionate about exploring the world on two wheels.
                Motorcycle road trips offer me the perfect blend of adventure,
                freedom, and connection with nature. From winding mountain roads
                to coastal highways, each journey brings new perspectives and
                unforgettable experiences.
              </p>
              <p className="text-portfolio-text dark:text-portfolio-lighter/90">
                Browse through my photo gallery from recent motorcycle journeys
                across beautiful landscapes, mountain roads, and coastal routes!
              </p>
            </div>

            <div className="bg-white dark:bg-portfolio-dark p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-nunito font-bold text-xl mb-4 text-portfolio-primary dark:text-portfolio-lighter">
                Cycling Adventures
              </h3>
              <p className="mb-4 text-portfolio-text dark:text-portfolio-lighter/90">
                Cycling is another passion of mine that allows me to stay active
                while exploring beautiful landscapes. Whether it's a quick ride
                through local trails or a day-long excursion in the countryside,
                cycling provides both physical exercise and mental refreshment.
              </p>
              <p className="text-portfolio-text dark:text-portfolio-lighter/90">
                I enjoy both road cycling and mountain biking, each offering
                unique experiences and challenges. The slideshow below captures
                some inspiring cycling moments!
              </p>
            </div>

            <div className="bg-white dark:bg-portfolio-dark p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-nunito font-bold text-xl mb-4 text-portfolio-primary dark:text-portfolio-lighter">
                Data Science & Technology
              </h3>
              <p className="mb-4 text-portfolio-text dark:text-portfolio-lighter/90">
                Beyond my professional work, I'm deeply interested in the
                advancements in data science, machine learning, and artificial
                intelligence. I enjoy exploring new tools and technologies,
                experimenting with data visualization, and staying current with
                the latest developments in the field.
              </p>
              <p className="text-portfolio-text dark:text-portfolio-lighter/90">
                My technical reading list reflects this passion, as I constantly
                seek to expand my knowledge and skills in these rapidly evolving
                areas.
              </p>
            </div>

            <div className="bg-white dark:bg-portfolio-dark p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-nunito font-bold text-xl mb-4 text-portfolio-primary dark:text-portfolio-lighter">
                History, Architecture & Economics
              </h3>
              <p className="mb-4 text-portfolio-text dark:text-portfolio-lighter/90">
                I have a profound interest in history, architecture, and
                economics, which greatly influences how I explore the world.
                Learning about different civilizations, their architectural
                achievements, and economic systems helps me understand the
                evolution of human society and culture.
              </p>
              <p className="text-portfolio-text dark:text-portfolio-lighter/90">
                These interests are actually the driving forces behind my
                motorcycle road trips and cycling adventures. They allow me to
                directly experience historical sites, appreciate diverse
                architectural styles, and observe economic differences across
                regions—creating a deeper connection with the places I visit.
              </p>
            </div>

            <div className="bg-white dark:bg-portfolio-dark p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow mt-6">
              <h3 className="font-nunito font-bold text-xl mb-4 text-portfolio-primary dark:text-portfolio-lighter">
                Financial Markets
              </h3>
              <p className="mb-4 text-portfolio-text dark:text-portfolio-lighter/90">
                My journey in financial markets reflects a thoughtful, long-term
                investment approach rather than short-term trading. Starting
                three years ago, I built a foundation with conservative
                instruments like anti-inflation bonds and ETFs, gradually
                expanding into dividend-generating Polish equities.
              </p>
              <p className="mb-4 text-portfolio-text dark:text-portfolio-lighter/90">
                Currently, I maintain a diversified portfolio across both Polish
                and U.S. markets, applying a systematic investment strategy that
                has yielded satisfactory results. This hands-on experience has
                provided valuable insights into market dynamics and investment
                principles.
              </p>
              <p className="text-portfolio-text dark:text-portfolio-lighter/90">
                For those interested in building their investment knowledge,
                particularly Polish speakers, I recommend{" "}
                <a
                  href="https://inwestomat.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-portfolio-primary hover:text-portfolio-accent transition-colors"
                >
                  inwestomat.eu
                </a>
                —an exceptional resource that offers university-caliber
                financial education in an accessible format.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Combined Gallery with Tabs */}
            <div className="bg-white dark:bg-portfolio-dark p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex border-b border-portfolio-lightest dark:border-portfolio-dark mb-4">
                <button
                  className={`py-2 px-4 font-nunito font-medium transition-all ${
                    activeGallery === "motorcycle"
                      ? "text-portfolio-primary border-b-2 border-portfolio-primary"
                      : "text-portfolio-muted hover:text-portfolio-primary"
                  }`}
                  onClick={() => setActiveGallery("motorcycle")}
                >
                  Motorcycle Gallery
                </button>
                <button
                  className={`py-2 px-4 font-nunito font-medium transition-all ${
                    activeGallery === "cycling"
                      ? "text-portfolio-primary border-b-2 border-portfolio-primary"
                      : "text-portfolio-muted hover:text-portfolio-primary"
                  }`}
                  onClick={() => setActiveGallery("cycling")}
                >
                  Cycling Gallery
                </button>
              </div>

              {activeGallery === "motorcycle" ? (
                <>
                  <div
                    className="overflow-hidden rounded-lg aspect-w-16 aspect-h-9"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <img
                      src={motorcycleImages[activeMotorcycleIndex]}
                      alt="Motorcycle road trip"
                      className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-6 gap-2">
                    {motorcycleImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveMotorcycleIndex(index)}
                        className={`overflow-hidden rounded-md transition-all ${activeMotorcycleIndex === index ? "ring-2 ring-portfolio-primary" : "opacity-70 hover:opacity-100"}`}
                      >
                        <img
                          src={image}
                          alt={`Motorcycle thumbnail ${index + 1}`}
                          className="aspect-square object-cover w-full h-full"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="overflow-hidden rounded-lg aspect-w-16 aspect-h-9"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <img
                      src={cyclingImages[activeCyclingIndex]}
                      alt="Cycling adventure"
                      className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-6 gap-2">
                    {cyclingImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveCyclingIndex(index)}
                        className={`overflow-hidden rounded-md transition-all ${activeCyclingIndex === index ? "ring-2 ring-portfolio-primary" : "opacity-70 hover:opacity-100"}`}
                      >
                        <img
                          src={image}
                          alt={`Cycling thumbnail ${index + 1}`}
                          className="aspect-square object-cover w-full h-full"
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
        <div className="text-center mt-16">
          <a
            href="#home"
            className="inline-flex items-center font-nunito font-bold text-portfolio-primary dark:text-portfolio-lighter hover:text-portfolio-dark dark:hover:text-white transition-colors duration-300"
          >
            Back to Top <i className="fas fa-arrow-up ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InterestsSection;
