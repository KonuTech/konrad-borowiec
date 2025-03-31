import { FC } from 'react';
import { Book } from '@shared/schema';

interface BookCardProps {
  book: Book;
}

const BookCard: FC<BookCardProps> = ({ book }) => {
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
    if (!genre) return "bg-gray-200 text-gray-800";
    
    switch (genre.toLowerCase()) {
      case "self-improvement":
        return "bg-ghibli-lightPink text-ghibli-pink";
      case "sci-fi":
        return "bg-ghibli-lightBlue text-ghibli-blue";
      case "programming":
        return "bg-ghibli-purple/20 text-ghibli-purple";
      case "history":
        return "bg-ghibli-peach/50 text-amber-700";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="book-card h-80">
      <div className="book-card-inner relative w-full h-full">
        {/* Card Front */}
        <div className="book-card-front absolute w-full h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md flex flex-col">
          <div className="relative h-56 overflow-hidden">
            <img 
              src={book.coverUrl || ''} 
              alt={book.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="font-nunito font-bold text-lg text-white">{book.title}</h3>
              <p className="text-sm text-gray-200">{book.author}</p>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex">
              {renderRating(book.rating)}
            </div>
            {book.genre && (
              <span className={`text-xs ${getGenreColors(book.genre)} px-2 py-1 rounded-full`}>
                {book.genre}
              </span>
            )}
          </div>
        </div>
        
        {/* Card Back */}
        <div className="book-card-back absolute w-full h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md p-6 flex flex-col">
          <h3 className="font-nunito font-bold text-lg mb-2">{book.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
            {book.review}
          </p>
          <div>
            <p className="text-sm font-medium text-ghibli-purple dark:text-ghibli-lightPink mb-1">My Takeaway:</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 italic">
              "The idea that tiny changes compound over time completely changed my approach to personal development."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
