import React, { useState, useEffect } from 'react';

interface ReadingProgressBarProps {
  target?: string; // CSS selector for the content to track
  className?: string;
}

const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({ 
  target = 'article', 
  className = '' 
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateProgress = () => {
      const targetElement = document.querySelector(target);
      if (!targetElement) return;

      const rect = targetElement.getBoundingClientRect();
      const elementHeight = targetElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      
      // Start showing progress when user starts reading (scrolled past header)
      const startOffset = Math.max(0, rect.top);
      const endOffset = rect.bottom - viewportHeight;
      
      if (startOffset <= 0 && endOffset > 0) {
        // User is reading the article
        setIsVisible(true);
        const scrolled = Math.abs(startOffset);
        const totalScrollable = elementHeight - viewportHeight + Math.abs(rect.top);
        const progressPercentage = Math.min(100, Math.max(0, (scrolled / totalScrollable) * 100));
        setProgress(progressPercentage);
      } else if (startOffset > 0) {
        // User hasn't reached the article yet
        setIsVisible(false);
        setProgress(0);
      } else {
        // User has scrolled past the article
        setIsVisible(true);
        setProgress(100);
      }
    };

    const handleScroll = () => {
      requestAnimationFrame(calculateProgress);
    };

    // Calculate initial progress
    calculateProgress();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateProgress);
    };
  }, [target]);

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      {/* Background bar */}
      <div className="h-1 bg-gray-200">
        {/* Progress bar */}
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-150 ease-out shadow-sm"
          style={{ 
            width: `${progress}%`,
            boxShadow: progress > 0 ? '0 0 10px rgba(59, 130, 246, 0.5)' : 'none'
          }}
        />
      </div>
      
      {/* Optional progress text */}
      {progress > 0 && progress < 100 && (
        <div className="absolute top-2 right-4 text-xs text-gray-500 bg-white px-2 py-1 rounded-full shadow-sm">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

export default ReadingProgressBar;
