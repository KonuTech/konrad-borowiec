import { useState, useEffect } from 'react';

interface UseOptimizedImageOptions {
  width?: number;
  format?: 'webp' | 'jpeg';
  quality?: number;
}

export const useOptimizedImage = (src: string, options: UseOptimizedImageOptions = {}) => {
  const [optimizedSrc, setOptimizedSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!src.startsWith('/assets/pictures/')) {
      setOptimizedSrc(src);
      return;
    }

    const { width, format, quality } = options;

    if (!width && !format && !quality) {
      setOptimizedSrc(src);
      return;
    }

    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (format) params.append('format', format);
    if (quality) params.append('q', quality.toString());

    const optimizedUrl = `${src}?${params.toString()}`;

    // Preload the optimized image to check if it loads successfully
    const img = new Image();
    img.onload = () => {
      setOptimizedSrc(optimizedUrl);
      setIsLoading(false);
    };
    img.onerror = () => {
      setError('Failed to load optimized image');
      setOptimizedSrc(src); // Fallback to original
      setIsLoading(false);
    };
    img.src = optimizedUrl;

  }, [src, options.width, options.format, options.quality]);

  return { src: optimizedSrc, isLoading, error };
};

export const useResponsiveImage = (src: string, breakpoints: { [key: string]: number } = {}) => {
  const [currentWidth, setCurrentWidth] = useState<number | undefined>();

  useEffect(() => {
    const updateWidth = () => {
      const width = window.innerWidth;
      const sortedBreakpoints = Object.entries(breakpoints)
        .sort(([,a], [,b]) => b - a);

      for (const [, breakpoint] of sortedBreakpoints) {
        if (width >= breakpoint) {
          setCurrentWidth(breakpoint);
          return;
        }
      }
      setCurrentWidth(undefined);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [breakpoints]);

  return useOptimizedImage(src, {
    width: currentWidth,
    format: 'webp'
  });
};