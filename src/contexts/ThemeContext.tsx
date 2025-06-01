import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isCosmicMode: boolean;
  toggleCosmicMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isCosmicMode: false,
  toggleCosmicMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCosmicMode, setIsCosmicMode] = useState(() => {
    const saved = localStorage.getItem('cosmicMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('cosmicMode', JSON.stringify(isCosmicMode));
    if (isCosmicMode) {
      document.documentElement.classList.add('cosmic-mode');
    } else {
      document.documentElement.classList.remove('cosmic-mode');
    }
  }, [isCosmicMode]);

  const toggleCosmicMode = () => {
    setIsCosmicMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isCosmicMode, toggleCosmicMode }}>
      {children}
    </ThemeContext.Provider>
  );
}; 