import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import BookCard from './BookCard';
import { Book } from '@shared/schema';
import { useState } from 'react';

const BooksSection = () => {
  const { data: books = [], isLoading, error } = useQuery<Book[]>({
    queryKey: ['/api/books'],
  });
  
  const [showToRead, setShowToRead] = useState(false);

  // Filter books by status
  const readBooks = books.filter(book => book.status === 'read' || !book.status);
  const toReadBooks = books.filter(book => book.status === 'to-read');

  // Sort books alphabetically by title
  const sortedReadBooks = [...readBooks].sort((a, b) => 
    a.title.localeCompare(b.title)
  );
  
  const sortedToReadBooks = [...toReadBooks].sort((a, b) => 
    a.title.localeCompare(b.title)
  );

  // Display books based on the selected tab
  const booksToDisplay = showToRead ? sortedToReadBooks : sortedReadBooks;

  return (
    <section id="books" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <SectionTitle>
          My <span className="bg-gradient-to-r from-ghibli-blue to-ghibli-purple bg-clip-text text-transparent">Book Collection</span>
        </SectionTitle>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ghibli-purple"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">Failed to load books</div>
        ) : (
          <>
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-md bg-white dark:bg-gray-800 p-1 shadow-md">
                <button
                  onClick={() => setShowToRead(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    !showToRead 
                      ? 'bg-ghibli-purple text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Books Read or Reading
                </button>
                <button
                  onClick={() => setShowToRead(true)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    showToRead 
                      ? 'bg-ghibli-pink text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Books To Read
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {booksToDisplay.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * Math.min(index, 9) }}
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <a 
                href="#top"
                className="inline-flex items-center font-nunito font-bold text-ghibli-purple dark:text-ghibli-lightPink hover:text-ghibli-pink dark:hover:text-ghibli-pink transition-colors duration-300"
              >
                Back to Top <i className="fas fa-arrow-up ml-2"></i>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BooksSection;
