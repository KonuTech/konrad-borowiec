import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

// Real motorcycle images
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
  "/images/motorcycles/coastal-cliff-flowers.jpg",
];

// Fallback motorcycle images
const fallbackMotorcycleImages = [
  "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1525160354320-d8e92641c563?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  "https://images.unsplash.com/photo-1571646750134-88aa82a0154c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80",
  "https://images.unsplash.com/photo-1508357710528-af67c8d478a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1622185135505-2d795003994a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
];

// Sample cycling images
const cyclingImages = [
  "https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1605913156738-0d7f5e7a45fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  "https://images.unsplash.com/photo-1501147830916-ce44a6359892?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
];

const InterestsSection: FC = () => {
  const [activeMotorcycleIndex, setActiveMotorcycleIndex] = useState(0);
  const [activeCyclingIndex, setActiveCyclingIndex] = useState(0);
  const [motorcycleImages, setMotorcycleImages] = useState<string[]>(fallbackMotorcycleImages);
  
  // Check if real motorcycle images exist and use them
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      // Image exists, use real images
      setMotorcycleImages(realMotorcycleImages);
    };
    img.onerror = () => {
      // Image doesn't exist, keep fallback images
      console.log("Using fallback motorcycle images");
    };
    // Check if the first real image exists
    img.src = realMotorcycleImages[0];
    
    // Initialize motorcycle image processing on first load
    fetch('/api/process-motorcycle-images', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success && data.images && data.images.length > 0) {
          setMotorcycleImages(data.images);
        }
      })
      .catch(error => console.error('Error processing motorcycle images:', error));
  }, []);
  
  return (
    <section id="interests" className="py-20 bg-portfolio-lightest dark:bg-portfolio-darker">
      <div className="container mx-auto px-4">
        <SectionTitle>
          My <span className="bg-gradient-to-r from-portfolio-primary to-portfolio-accent bg-clip-text text-transparent">Interests and Hobbies</span>
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
              <h3 className="font-nunito font-bold text-xl mb-4 text-portfolio-primary dark:text-portfolio-lighter">Motorcycle Road Trips</h3>
              <p className="mb-4 text-portfolio-text dark:text-portfolio-lighter/90">
                I'm passionate about exploring the world on two wheels. Motorcycle road trips offer me the perfect blend of adventure, freedom, and connection with nature. 
                From winding mountain roads to coastal highways, each journey brings new perspectives and unforgettable experiences.
              </p>
              <p className="text-portfolio-text dark:text-portfolio-lighter/90">
                Browse through my photo gallery from recent motorcycle journeys across beautiful landscapes, mountain roads, and coastal routes!
              </p>
            </div>
            
            <div className="bg-white dark:bg-portfolio-dark p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-nunito font-bold text-xl mb-4 text-portfolio-primary dark:text-portfolio-lighter">Cycling Adventures</h3>
              <p className="mb-4 text-portfolio-text dark:text-portfolio-lighter/90">
                Cycling is another passion of mine that allows me to stay active while exploring beautiful landscapes. Whether it's a quick ride through local trails or a day-long excursion in the countryside, cycling provides both physical exercise and mental refreshment.
              </p>
              <p className="text-portfolio-text dark:text-portfolio-lighter/90">
                I enjoy both road cycling and mountain biking, each offering unique experiences and challenges. The slideshow below captures some inspiring cycling moments!
              </p>
            </div>
            
            <div className="bg-white dark:bg-portfolio-dark p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-nunito font-bold text-xl mb-4 text-portfolio-primary dark:text-portfolio-lighter">Data Science & Technology</h3>
              <p className="mb-4 text-portfolio-text dark:text-portfolio-lighter/90">
                Beyond my professional work, I'm deeply interested in the advancements in data science, machine learning, and artificial intelligence. 
                I enjoy exploring new tools and technologies, experimenting with data visualization, and staying current with the latest developments in the field.
              </p>
              <p className="text-portfolio-text dark:text-portfolio-lighter/90">
                My technical reading list reflects this passion, as I constantly seek to expand my knowledge and skills in these rapidly evolving areas.
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
            {/* Motorcycle Gallery */}
            <div className="bg-white dark:bg-portfolio-dark p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h4 className="font-nunito font-semibold text-lg mb-3 text-portfolio-primary dark:text-portfolio-lighter">Motorcycle Gallery</h4>
              <div className="overflow-hidden rounded-lg aspect-w-16 aspect-h-9" style={{ aspectRatio: '16/9' }}>
                <img 
                  src={motorcycleImages[activeMotorcycleIndex]} 
                  alt="Motorcycle road trip" 
                  className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-105"
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
                      className="aspect-square object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Cycling Gallery */}
            <div className="bg-white dark:bg-portfolio-dark p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h4 className="font-nunito font-semibold text-lg mb-3 text-portfolio-primary dark:text-portfolio-lighter">Cycling Gallery</h4>
              <div className="overflow-hidden rounded-lg aspect-w-16 aspect-h-9" style={{ aspectRatio: '16/9' }}>
                <img 
                  src={cyclingImages[activeCyclingIndex]} 
                  alt="Cycling adventure" 
                  className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-105"
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
                      className="aspect-square object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InterestsSection;