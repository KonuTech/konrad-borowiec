import { FC } from 'react';
import { motion } from 'framer-motion';
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
      stars.push(
        <motion.i 
          key={`full-${i}`} 
          className="fas fa-star text-yellow-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.1 * i,
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <motion.i 
          key="half" 
          className="fas fa-star-half-alt text-yellow-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.1 * fullStars,
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        />
      );
    }
    
    for (let i = 0; i < 5 - fullStars - (hasHalfStar ? 1 : 0); i++) {
      stars.push(
        <motion.i 
          key={`empty-${i}`} 
          className="far fa-star text-yellow-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.1 * (fullStars + (hasHalfStar ? 1 : 0) + i),
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        />
      );
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
        return "bg-ghibli-lightGreen text-ghibli-green";
      case "history":
        return "bg-ghibli-yellow/70 text-amber-700";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  // Random decorative elements for the card corners
  const decorativeElements = [
    "after:absolute after:top-0 after:right-0 after:w-10 after:h-10 after:bg-ghibli-lightBlue/40 after:rounded-bl-xl after:-z-0",
    "after:absolute after:top-0 after:left-0 after:w-10 after:h-10 after:bg-ghibli-lightPink/40 after:rounded-br-xl after:-z-0",
    "after:absolute after:bottom-0 after:right-0 after:w-10 after:h-10 after:bg-ghibli-lightGreen/40 after:rounded-tl-xl after:-z-0",
    "after:absolute after:bottom-0 after:left-0 after:w-10 after:h-10 after:bg-ghibli-yellow/40 after:rounded-tr-xl after:-z-0"
  ];

  return (
    <div className="book-card h-80">
      <motion.div 
        className={`book-card-inner relative w-full h-full rounded-xl ${decorativeElements[Math.floor(Math.random() * decorativeElements.length)]}`}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {/* Card Front */}
        <div className="book-card-front absolute w-full h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col z-10">
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-ghibli-lightBlue/30 border-r-transparent z-10"></div>
          
          <div className="relative h-56 overflow-hidden">
            <img 
              src={book.coverUrl || ''} 
              alt={book.title} 
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="font-nunito font-bold text-lg text-white">{book.title}</h3>
              <p className="text-sm text-gray-200">{book.author}</p>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex gap-0.5">
              {renderRating(book.rating)}
            </div>
            {book.genre && (
              <span className={`text-xs font-medium ${getGenreColors(book.genre)} px-3 py-1 rounded-full shadow-sm`}>
                {book.genre}
              </span>
            )}
          </div>
        </div>
        
        {/* Card Back */}
        <div className="book-card-back absolute w-full h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg p-6 flex flex-col z-10">
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-ghibli-lightPink rounded-full opacity-20"></div>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-ghibli-lightBlue rounded-full opacity-20"></div>
          
          <h3 className="font-nunito font-bold text-lg mb-2 text-ghibli-blue dark:text-ghibli-lightBlue">{book.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
            {book.review}
          </p>
          <div className="bg-ghibli-lightPink/20 dark:bg-ghibli-pink/10 p-3 rounded-lg">
            <p className="text-sm font-medium text-ghibli-pink dark:text-ghibli-lightPink mb-1">My Takeaway:</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 italic">
              "The idea that tiny changes compound over time completely changed my approach to personal development."
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookCard;
