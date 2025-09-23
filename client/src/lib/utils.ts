import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to readable string
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Generate stars for ratings
export function generateStarRating(rating: number): Array<'full' | 'half' | 'empty'> {
  const stars: Array<'full' | 'half' | 'empty'> = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push('full');
  }
  
  // Add half star if needed
  if (hasHalfStar) {
    stars.push('half');
  }
  
  // Fill the rest with empty stars
  while (stars.length < 5) {
    stars.push('empty');
  }
  
  return stars;
}

// Get book genre color class
export function getGenreColorClass(genre: string | null | undefined): string {
  if (!genre) return "bg-gray-200 text-gray-800";
  
  const lowerGenre = genre.toLowerCase();
  
  switch (lowerGenre) {
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
}
