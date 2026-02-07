import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start exit animation after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Actual unmount trigger
      setTimeout(onComplete, 500); 
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="animate-slide-up flex flex-col items-center">
        <div className="h-24 w-24 border-4 border-emerald-800 flex items-center justify-center rounded-full mb-4 shadow-xl bg-white">
          <span className="font-mono text-4xl font-bold text-emerald-800 tracking-tighter">AJ</span>
        </div>
        <h1 className="font-mono text-emerald-900 text-lg tracking-widest uppercase mt-2">Paisagismo</h1>
      </div>
    </div>
  );
};