import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  direction?: "left" | "right" | "up";
  delay?: number;
  className?: string;
}

export const ScrollAnimation = ({ children, direction = "left", delay = 0, className = "" }: ScrollAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const animClass = direction === "left" ? "animate-slide-in-left" : direction === "right" ? "animate-slide-in-right" : "animate-slide-in-up";

  return (
    <div ref={ref} className={`${isVisible ? animClass : "opacity-0"} ${className}`}>
      {children}
    </div>
  );
};
