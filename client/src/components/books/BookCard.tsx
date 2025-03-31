import { FC } from 'react';
import { Book } from '@shared/schema';

interface BookCardProps {
  book: Book;
}

const BookCard: FC<BookCardProps> = ({ book }) => {
  const isToRead = book.status === 'to-read';
  
  const getGenreColors = (genre: string | null | undefined) => {
    if (!genre) return "bg-portfolio-lightest text-portfolio-text";
    
    switch (genre.toLowerCase()) {
      case "self-improvement":
        return "bg-portfolio-lighter text-portfolio-primary";
      case "sci-fi":
        return "bg-portfolio-lightest text-portfolio-primary";
      case "programming":
        return "bg-portfolio-primary/20 text-portfolio-primary";
      case "history":
        return "bg-portfolio-accent/20 text-portfolio-dark";
      default:
        return "bg-portfolio-lightest text-portfolio-text";
    }
  };

  return (
    <div className="book-card h-80">
      <div className="book-card-inner relative w-full h-full">
        {/* Card Front */}
        <div className="book-card-front absolute w-full h-full bg-white dark:bg-portfolio-darker rounded-xl overflow-hidden shadow-md flex flex-col">
          {/* Book Cover Image with To Read Badge */}
          <div className="relative h-44 overflow-hidden">
            <img 
              src={book.coverUrl || ''} 
              alt={book.title} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {isToRead && (
              <div className="absolute top-0 right-0 bg-portfolio-primary text-white text-xs px-2 py-1 m-2 rounded-full">
                To Read
              </div>
            )}
          </div>
          
          {/* Book Information Below Image */}
          <div className="p-4 flex flex-col flex-grow">
            <div className="flex-grow">
              <h3 className="font-nunito font-bold text-sm text-portfolio-dark dark:text-white line-clamp-2">{book.title}</h3>
              <p className="text-xs text-portfolio-text dark:text-gray-300 line-clamp-1 mt-1">{book.author}</p>
            </div>
            {book.genre && (
              <div className="flex justify-start mt-2">
                <span className={`text-xs ${getGenreColors(book.genre)} px-2 py-1 rounded-full`}>
                  {book.genre}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Card Back */}
        <div className="book-card-back absolute w-full h-full bg-white dark:bg-portfolio-darker rounded-xl overflow-hidden shadow-md p-6 flex flex-col">
          <h3 className="font-nunito font-bold text-lg mb-2 text-portfolio-dark dark:text-portfolio-lighter">{book.title}</h3>
          {isToRead ? (
            <div className="text-sm text-portfolio-text dark:text-portfolio-lighter mb-4 flex-grow flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-portfolio-lightest flex items-center justify-center mb-3">
                <i className="fas fa-book-reader text-portfolio-primary text-lg"></i>
              </div>
              <p className="text-center">
                This book is on my reading list! I'm looking forward to exploring it soon.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-portfolio-text dark:text-portfolio-lighter mb-4 flex-grow">
                {book.review || "I enjoyed this book and found it valuable for my professional development."}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
