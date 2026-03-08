import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyCarouselProps {
  images: string[];
  autoPlay?: boolean;
  className?: string;
}

export const PropertyCarousel = ({ images, autoPlay = false, className = "" }: PropertyCarouselProps) => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % Math.max(images.length, 1));
  }, [images.length]);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % Math.max(images.length, 1));
  };

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, [autoPlay, images.length, next]);

  if (!images.length) {
    return (
      <div className={`bg-muted flex items-center justify-center aspect-video ${className}`}>
        <span className="text-muted-foreground text-sm">No image</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <div className="aspect-video w-full">
        <img
          src={images[current]}
          alt={`Property image ${current + 1}`}
          className="w-full h-full object-cover transition-all duration-500"
        />
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={20} className="text-foreground" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={20} className="text-foreground" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-primary-foreground" : "bg-primary-foreground/40"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
