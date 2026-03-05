import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroCarouselProps {
  images: string[];
  autoplayInterval?: number;
  className?: string;
}

export const HeroCarousel = ({
  images,
  autoplayInterval = 4000,
  className = ''
}: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  useEffect(() => {
    if (isHovered || images.length <= 1) return;

    const interval = setInterval(goToNext, autoplayInterval);
    return () => clearInterval(interval);
  }, [isHovered, goToNext, autoplayInterval, images.length]);

  if (images.length === 0) return null;

  const slideVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      opacity: 0,
      scale: 0.95,
    })
  };

  return (
    <div
      className={`relative w-full max-w-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full max-w-full aspect-square overflow-hidden rounded-2xl sm:rounded-3xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Classroom scene ${currentIndex + 1}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.6, ease: 'easeInOut' },
              scale: { duration: 0.6, ease: 'easeInOut' }
            }}
            className="absolute inset-0 w-full h-full object-cover max-w-full"
            loading={currentIndex === 0 ? 'eager' : 'lazy'}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              aria-label="Previous slide"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 backdrop-blur-md bg-white/20 hover:bg-white/30 border border-white/40 text-white p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            <button
              onClick={goToNext}
              aria-label="Next slide"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 backdrop-blur-md bg-white/20 hover:bg-white/30 border border-white/40 text-white p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 sm:gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'bg-white w-6 sm:w-8 h-2 sm:h-2.5'
                      : 'bg-white/50 hover:bg-white/70 w-2 sm:w-2.5 h-2 sm:h-2.5'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
