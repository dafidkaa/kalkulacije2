import React, { useState, useEffect, useRef } from 'react';

interface LazyLoadProps {
  children: React.ReactNode;
  height?: string;
  threshold?: number;
  placeholder?: React.ReactNode;
}

export const LazyLoad: React.FC<LazyLoadProps> = ({ 
  children, 
  height = 'auto', 
  threshold = 0.1,
  placeholder = <div className="animate-pulse bg-gray-200 rounded-lg" style={{ height: height !== 'auto' ? height : '200px' }}></div>
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: '100px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  useEffect(() => {
    if (isVisible) {
      // Add a small delay to simulate content loading
      const timer = setTimeout(() => {
        setHasLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div ref={ref} style={{ minHeight: height }}>
      {hasLoaded ? children : (isVisible ? <div className="transition-opacity duration-300 opacity-50">{children}</div> : placeholder)}
    </div>
  );
};

export default LazyLoad;
