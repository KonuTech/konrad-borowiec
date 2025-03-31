import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

// Sample motorcycle images
const motorcycleImages = [
  "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1525160354320-d8e92641c563?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  "https://images.unsplash.com/photo-1571646750134-88aa82a0154c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80",
  "https://images.unsplash.com/photo-1508357710528-af67c8d478a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1622185135505-2d795003994a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
];

const InterestsSection: FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <section id="interests" className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle>
          My <span className="bg-gradient-to-r from-ghibli-blue to-ghibli-purple bg-clip-text text-transparent">Interests</span>
        </SectionTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="font-nunito font-bold text-xl mb-4 text-ghibli-purple dark:text-ghibli-lightPink">Motorcycle Road Trips</h3>
              <p className="mb-4">
                I'm passionate about exploring the world on two wheels. Motorcycle road trips offer me the perfect blend of adventure, freedom, and connection with nature. 
                From winding mountain roads to coastal highways, each journey brings new perspectives and unforgettable experiences.
              </p>
              <p>
                I plan to add photos from my personal road trip adventures soon. In the meantime, enjoy this gallery of motorcycle journey inspiration!
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="font-nunito font-bold text-xl mb-4 text-ghibli-purple dark:text-ghibli-lightPink">Data Science & Technology</h3>
              <p className="mb-4">
                Beyond my professional work, I'm deeply interested in the advancements in data science, machine learning, and artificial intelligence. 
                I enjoy exploring new tools and technologies, experimenting with data visualization, and staying current with the latest developments in the field.
              </p>
              <p>
                My technical reading list reflects this passion, as I constantly seek to expand my knowledge and skills in these rapidly evolving areas.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="overflow-hidden rounded-lg aspect-w-16 aspect-h-9" style={{ aspectRatio: '16/9' }}>
                <img 
                  src={motorcycleImages[activeImageIndex]} 
                  alt="Motorcycle road trip" 
                  className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div className="mt-4 grid grid-cols-6 gap-2">
                {motorcycleImages.map((image, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`overflow-hidden rounded-md transition-all ${activeImageIndex === index ? 'ring-2 ring-ghibli-purple' : 'opacity-70 hover:opacity-100'}`}
                  >
                    <img 
                      src={image} 
                      alt={`Thumbnail ${index + 1}`} 
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