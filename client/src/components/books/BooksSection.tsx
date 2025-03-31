import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import BookCard from './BookCard';
import { Book } from '@shared/schema';

const BooksSection = () => {
  const { data: books = [], isLoading, error } = useQuery<Book[]>({
    queryKey: ['/api/books'],
  });

  return (
    <section id="books" className="py-20 relative overflow-hidden bg-gradient-to-b from-ghibli-lightPink/10 to-white dark:from-ghibli-pink/10 dark:to-gray-900">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-[url('https://images.unsplash.com/photo-1533736405784-196c5c4852f1?q=80&w=2070&auto=format&fit=crop')] bg-repeat-x bg-cover opacity-10"></div>
      
      {/* Large decorative shapes */}
      <motion.div 
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-ghibli-lightPink/20 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-ghibli-lightBlue/20 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle>
          Books <span className="bg-gradient-to-r from-ghibli-blue via-ghibli-purple to-ghibli-pink bg-clip-text text-transparent">I've Read</span>
        </SectionTitle>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-ghibli-lightPink border-t-ghibli-pink"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-8 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <i className="fas fa-exclamation-circle text-3xl mb-4"></i>
            <p>Failed to load books</p>
          </div>
        ) : (
          <>
            {/* Small floating decorations */}
            <motion.div 
              className="absolute top-20 right-10 w-10 h-10"
              animate={{ y: [0, -15, 0], rotate: 360 }}
              transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 8, repeat: Infinity, ease: "linear" } }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-ghibli-lightPink">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
              </svg>
            </motion.div>
          
            <motion.div 
              className="absolute bottom-10 left-10 w-8 h-8"
              animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-ghibli-lightBlue">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="currentColor" />
              </svg>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {books.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.1 * index,
                    ease: "easeOut"
                  }}
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a 
                href="#"
                className="inline-flex items-center font-nunito font-bold text-ghibli-pink dark:text-ghibli-lightPink hover:text-ghibli-blue dark:hover:text-ghibli-lightBlue transition-colors duration-300 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-xl transform hover:-translate-y-1"
              >
                See My Complete Reading List <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default BooksSection;
