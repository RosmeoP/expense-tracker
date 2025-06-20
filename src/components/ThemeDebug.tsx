import { useTheme } from '../contexts/ThemeContext';

export function ThemeDebug() {
  const { theme, isDark } = useTheme();
  
  return (
    <div className="fixed top-4 right-4 z-50 p-4 bg-red-500 text-white rounded-lg">
      <div>Theme: {theme}</div>
      <div>isDark: {isDark ? 'true' : 'false'}</div>
      <div>HTML classes: {document.documentElement.className}</div>
    </div>
  );
}
