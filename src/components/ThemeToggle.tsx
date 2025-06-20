import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1">
      <button
        onClick={() => setTheme('light')}
        className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors ${
          theme === 'light'
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
        aria-label="Light mode"
      >
        <Sun size={16} />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors ${
          theme === 'dark'
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
        aria-label="Dark mode"
      >
        <Moon size={16} />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors ${
          theme === 'system'
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
        aria-label="System mode"
      >
        <Monitor size={16} />
      </button>
    </div>
  );
}
