import { FC } from 'react';
import { Book } from '@shared/schema';

interface BookCardProps {
  book: Book;
}

const BookCard: FC<BookCardProps> = ({ book }) => {
  const isToRead = book.status === 'to-read';
  
  // Generate star ratings
  const renderRating = (rating: number | null | undefined) => {
    if (!rating) return null;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star text-yellow-400"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-yellow-400"></i>);
    }
    
    for (let i = 0; i < 5 - fullStars - (hasHalfStar ? 1 : 0); i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-yellow-400"></i>);
    }
    
    return stars;
  };

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
          <div className="relative h-56 overflow-hidden">
            <img 
              src={book.coverUrl || ''} 
              alt={book.title} 
              className="w-full h-full object-cover"
            />
            {isToRead && (
              <div className="absolute top-0 right-0 bg-portfolio-primary text-white text-xs px-2 py-1 m-2 rounded-full">
                To Read
              </div>
            )}
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="font-nunito font-bold text-lg text-white">{book.title}</h3>
              <p className="text-sm text-gray-200">{book.author}</p>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex">
              {!isToRead ? renderRating(book.rating) : <span className="text-xs italic text-portfolio-muted">Not yet rated</span>}
            </div>
            {book.genre && (
              <span className={`text-xs ${getGenreColors(book.genre)} px-2 py-1 rounded-full`}>
                {book.genre}
              </span>
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
              {book.review && (
                <div>
                  <p className="text-sm font-medium text-portfolio-primary dark:text-portfolio-lighter mb-1">My Rating:</p>
                  <div className="flex">{renderRating(book.rating)}</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
