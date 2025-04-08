import React, { useEffect } from 'react';

interface PreloadProps {
  resources?: string[];
  modules?: (() => Promise<any>)[];
}

export const Preload: React.FC<PreloadProps> = ({ resources = [], modules = [] }) => {
  useEffect(() => {
    // Preload resources (images, fonts, etc.)
    resources.forEach(resource => {
      if (resource.endsWith('.jpg') || resource.endsWith('.png') || resource.endsWith('.webp') || resource.endsWith('.svg')) {
        const img = new Image();
        img.src = resource;
      } else if (resource.endsWith('.css')) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
      } else if (resource.endsWith('.js')) {
        const script = document.createElement('link');
        script.rel = 'preload';
        script.as = 'script';
        script.href = resource;
        document.head.appendChild(script);
      } else if (resource.endsWith('.woff2') || resource.endsWith('.woff') || resource.endsWith('.ttf')) {
        const font = document.createElement('link');
        font.rel = 'preload';
        font.as = 'font';
        font.href = resource;
        font.crossOrigin = 'anonymous';
        document.head.appendChild(font);
      }
    });

    // Preload modules
    modules.forEach(moduleLoader => {
      moduleLoader().catch(() => {
        // Silently catch errors - this is just preloading
      });
    });
  }, [resources, modules]);

  return null;
};

export default Preload;
