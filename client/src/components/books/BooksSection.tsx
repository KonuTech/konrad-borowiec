import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionTitle from '@/components/ui/SectionTitle';
import BookCard from './BookCard';
import { Book } from '@shared/types';
import { api } from '@/lib/staticApi';

const BooksSection = () => {
  const { t } = useTranslation();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showToRead, setShowToRead] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setIsLoading(true);
        const data = await api.books.getAll();
        setBooks(data);
        setError(null);
      } catch (err) {
        setError('Failed to load books');
        console.error('Error loading books:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  // Filter books by status
  const readBooks = books.filter((book) => book.status === 'read' || !book.status);
  const toReadBooks = books.filter((book) => book.status === 'to-read');

  // Sort books alphabetically by title
  const sortedReadBooks = [...readBooks].sort((a, b) => a.title.localeCompare(b.title));

  const sortedToReadBooks = toReadBooks;

  // Display books based on the selected tab
  const booksToDisplay = showToRead ? sortedToReadBooks : sortedReadBooks;

  return (
    <section id="books" className="bg-portfolio-lightest py-20 dark:bg-portfolio-darker md:py-14">
      <div className="container mx-auto px-4">
        <SectionTitle>
          {t('books.headingPrefix')} <span className="gradient-text">{t('books.title')}</span>
        </SectionTitle>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-portfolio-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{t('books.noBooks')}</div>
        ) : (
          <>
            <div className="mb-8 flex justify-center">
              <div className="inline-flex rounded-md bg-white p-1 shadow-md dark:bg-portfolio-dark">
                <button
                  onClick={() => setShowToRead(false)}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    !showToRead
                      ? 'bg-portfolio-primary text-white'
                      : 'text-portfolio-text hover:bg-portfolio-lightest dark:text-portfolio-lighter dark:hover:bg-portfolio-darker'
                  }`}
                >
                  {t('books.read')}
                </button>
                <button
                  onClick={() => setShowToRead(true)}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    showToRead
                      ? 'bg-portfolio-primary text-white'
                      : 'text-portfolio-text hover:bg-portfolio-lightest dark:text-portfolio-lighter dark:hover:bg-portfolio-darker'
                  }`}
                >
                  {t('books.toRead')}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

            <div className="mt-12 text-center md:mt-8">
              <a
                href="#top"
                className="font-nunito inline-flex items-center font-bold text-portfolio-primary transition-colors duration-300 hover:text-portfolio-dark dark:text-portfolio-lighter dark:hover:text-white"
              >
                {t('ui.backToTop')} <i className="fas fa-arrow-up ml-2"></i>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BooksSection;
