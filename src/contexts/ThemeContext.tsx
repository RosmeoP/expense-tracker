import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('light');
  const [isDark, setIsDark] = useState(false);

  // Apply theme using CSS custom properties
  const applyTheme = (themeName: Theme) => {
    const root = document.documentElement;
    
    let shouldBeDark = false;
    if (themeName === 'dark') {
      shouldBeDark = true;
    } else if (themeName === 'system') {
      shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      // Apply dark theme colors
      root.style.setProperty('--bg-primary', '#0f172a');
      root.style.setProperty('--bg-secondary', '#1e293b');
      root.style.setProperty('--bg-card', '#1e293b');
      root.style.setProperty('--text-primary', '#f1f5f9');
      root.style.setProperty('--text-secondary', '#cbd5e1');
      root.style.setProperty('--border-color', '#334155');
      root.style.setProperty('--sidebar-bg', '#1e293b');
      root.style.setProperty('--sidebar-text', '#cbd5e1');
      root.style.setProperty('--sidebar-active', '#3b82f6');
      root.classList.add('theme-dark');
      root.classList.remove('theme-light');
    } else {
      root.style.setProperty('--bg-primary', '#f8fafc');
      root.style.setProperty('--bg-secondary', '#ffffff');
      root.style.setProperty('--bg-card', '#ffffff');
      root.style.setProperty('--text-primary', '#0f172a');
      root.style.setProperty('--text-secondary', '#475569');
      root.style.setProperty('--border-color', '#e2e8f0');
      root.style.setProperty('--sidebar-bg', '#ffffff');
      root.style.setProperty('--sidebar-text', '#334155');
      root.style.setProperty('--sidebar-active', '#3b82f6');
      root.classList.add('theme-light');
      root.classList.remove('theme-dark');
    }
    
    document.body.style.backgroundColor = shouldBeDark ? '#0f172a' : '#f8fafc';
  };

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const initialTheme = savedTheme || 'light';
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  // Handle theme changes
  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  // Listen for system theme changes
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
        isDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
