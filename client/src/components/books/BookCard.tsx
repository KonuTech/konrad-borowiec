import { FC } from 'react';
import { Book } from '@shared/types';

interface BookCardProps {
  book: Book;
}

const BookCard: FC<BookCardProps> = ({ book }) => {
  const isToRead = book.status === 'to-read';

  const getGenreColors = (genre: string | null | undefined) => {
    if (!genre) return 'bg-portfolio-lightest text-portfolio-text';

    switch (genre.toLowerCase()) {
      case 'self-improvement':
        return 'bg-portfolio-lighter text-portfolio-primary';
      case 'sci-fi':
        return 'bg-portfolio-lightest text-portfolio-primary';
      case 'programming':
        return 'bg-portfolio-primary/20 text-portfolio-primary';
      case 'history':
        return 'bg-portfolio-accent/20 text-portfolio-dark';
      default:
        return 'bg-portfolio-lightest text-portfolio-text';
    }
  };

  return (
    <div className="book-card h-80">
      <div className="book-card-inner relative h-full w-full">
        {/* Card Front */}
        <div className="book-card-front absolute flex h-full w-full flex-col overflow-hidden rounded-xl bg-white shadow-md dark:bg-portfolio-darker">
          {/* Book Cover Image with To Read Badge */}
          <div className="relative h-44 overflow-hidden">
            <img
              src={book.coverUrl || ''}
              alt={book.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            {isToRead && (
              <div className="absolute right-0 top-0 m-2 rounded-full bg-portfolio-primary px-2 py-1 text-xs text-white">
                To Read
              </div>
            )}
          </div>

          {/* Book Information Below Image */}
          <div className="flex flex-grow flex-col p-4">
            <div className="flex-grow">
              <h3 className="font-nunito line-clamp-2 text-sm font-bold text-portfolio-dark dark:text-white">
                {book.title}
              </h3>
              <p className="mt-1 line-clamp-1 text-xs text-portfolio-text dark:text-gray-300">
                {book.author}
              </p>
            </div>
            {book.genre && (
              <div className="mt-2 flex justify-start">
                <span className={`text-xs ${getGenreColors(book.genre)} rounded-full px-2 py-1`}>
                  {book.genre}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Card Back */}
        <div className="book-card-back absolute flex h-full w-full flex-col overflow-hidden rounded-xl bg-white p-6 shadow-md dark:bg-portfolio-darker">
          <h3 className="font-nunito mb-2 text-lg font-bold text-portfolio-dark dark:text-portfolio-lighter">
            {book.title}
          </h3>
          {isToRead ? (
            <div className="mb-4 flex flex-grow flex-col items-center justify-center text-sm text-portfolio-text dark:text-portfolio-lighter">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-portfolio-lightest">
                <i className="fas fa-book-reader text-lg text-portfolio-primary"></i>
              </div>
              <p className="text-center">
                This book is on my reading list! I'm looking forward to exploring it soon.
              </p>
            </div>
          ) : (
            <>
              <p className="mb-4 flex-grow text-sm text-portfolio-text dark:text-portfolio-lighter">
                {book.review ||
                  'I enjoyed this book and found it valuable for my professional development.'}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
