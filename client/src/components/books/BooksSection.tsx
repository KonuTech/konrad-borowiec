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
    <section id="books" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <SectionTitle>
          Books <span className="bg-gradient-to-r from-ghibli-blue to-ghibli-purple bg-clip-text text-transparent">I've Read</span>
        </SectionTitle>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ghibli-purple"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">Failed to load books</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {books.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <a 
                href="#"
                className="inline-flex items-center font-nunito font-bold text-ghibli-purple dark:text-ghibli-lightPink hover:text-ghibli-pink dark:hover:text-ghibli-pink transition-colors duration-300"
              >
                See My Complete Reading List <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BooksSection;
