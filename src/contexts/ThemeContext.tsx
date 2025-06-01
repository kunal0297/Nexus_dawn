import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isCosmicMode: boolean;
  toggleCosmicMode: () => void;
  cosmicLevel: number;
  setCosmicLevel: (level: number) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [isCosmicMode, setIsCosmicMode] = useState(false);
  const [cosmicLevel, setCosmicLevel] = useState(0);

  useEffect(() => {
    // Apply theme class to body
    document.body.classList.toggle('cosmic-mode', isCosmicMode);
  }, [isCosmicMode]);

  const toggleCosmicMode = () => {
    setIsCosmicMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        isCosmicMode,
        toggleCosmicMode,
        cosmicLevel,
        setCosmicLevel
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}; 