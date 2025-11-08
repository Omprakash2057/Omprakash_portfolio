import React, { createContext, useContext, useState, useEffect } from 'react';

const OceanThemeContext = createContext();

export const useOceanTheme = () => {
  const context = useContext(OceanThemeContext);
  if (!context) {
    throw new Error('useOceanTheme must be used within an OceanThemeProvider');
  }
  return context;
};

export const OceanThemeProvider = ({ children }) => {
  const [isUnderwater, setIsUnderwater] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDiving, setIsDiving] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const progress = scrollY / (documentHeight - windowHeight);
      setScrollProgress(progress);
      
      // Trigger underwater mode after 30% scroll
      if (progress > 0.3 && !isUnderwater) {
        setIsDiving(true);
        setTimeout(() => {
          setIsUnderwater(true);
          setIsDiving(false);
        }, 1500); // Animation duration
      } else if (progress <= 0.2 && isUnderwater) {
        setIsUnderwater(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isUnderwater]);

  const value = {
    isUnderwater,
    setIsUnderwater,
    scrollProgress,
    isDiving,
    setIsDiving,
  };

  return (
    <OceanThemeContext.Provider value={value}>
      {children}
    </OceanThemeContext.Provider>
  );
};