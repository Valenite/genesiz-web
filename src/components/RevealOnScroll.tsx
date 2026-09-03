import React, { useEffect, useRef, useState } from 'react';

export type AnimationVariant = 
  | 'fade-up' 
  | 'swipe-left' 
  | 'swipe-right' 
  | '3d-dock' 
  | 'zoom-in';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  variant?: AnimationVariant;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ 
  children, 
  className = '', 
  delayMs = 0,
  variant = 'fade-up'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const getVariantStyles = () => {
    switch (variant) {
      case 'swipe-left':
        return isVisible
          ? 'opacity-100 translate-x-0 rotate-0 scale-100 filter-none'
          : 'opacity-0 -translate-x-16 -rotate-2 scale-95 filter blur-[1px]';

      case 'swipe-right':
        return isVisible
          ? 'opacity-100 translate-x-0 rotate-0 scale-100 filter-none'
          : 'opacity-0 translate-x-16 rotate-2 scale-95 filter blur-[1px]';

      case '3d-dock':
        return isVisible
          ? 'opacity-100 [transform:perspective(1000px)_rotateX(0deg)_translateY(0)] scale-100 filter-none'
          : 'opacity-0 [transform:perspective(1000px)_rotateX(22deg)_translateY(45px)] scale-90 filter blur-[2px]';

      case 'zoom-in':
        return isVisible
          ? 'opacity-100 scale-100 filter-none'
          : 'opacity-0 scale-85 filter blur-[2px]';

      case 'fade-up':
      default:
        return isVisible
          ? 'opacity-100 translate-y-0 filter-none'
          : 'opacity-0 translate-y-12 filter blur-[2px]';
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-all duration-800 cubic-bezier(0.16, 1, 0.3, 1) will-change-[transform,opacity,filter] ${getVariantStyles()} ${className}`}
    >
      {children}
    </div>
  );
};
