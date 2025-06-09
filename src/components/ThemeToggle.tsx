import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isDark 
          ? 'bg-gray-600/80 focus:ring-rose-300/80' 
          : 'bg-rose-300/80 focus:ring-indigo-400/80'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full transition-transform duration-300 flex items-center justify-center ${
          isDark 
            ? 'translate-x-6 bg-rose-300/90 shadow-md' 
            : 'translate-x-1 bg-white/90 shadow-sm'
        }`}
      >
        {/* Sun icon - shows in LIGHT mode (when toggle is on the left) */}
        {!isDark && <Sun className="h-3 w-3 text-rose-500" />}
        {/* Moon icon - shows in DARK mode (when toggle is on the right) */}
        {isDark && <Moon className="h-3 w-3 text-gray-100" />}
      </span>
    </button>
  );
};

export default ThemeToggle;