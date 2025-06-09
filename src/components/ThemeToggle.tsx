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
          ? 'bg-gray-700 focus:ring-pink-500' 
          : 'bg-gray-300 focus:ring-indigo-500'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full transition-transform duration-300 ${
          isDark 
            ? 'translate-x-6 bg-pink-400' 
            : 'translate-x-1 bg-white'
        }`}
      />
      {/* Sun icon - shows in LIGHT mode (left side) */}
      <span className={`absolute left-1 transition-opacity duration-300 ${!isDark ? 'opacity-100' : 'opacity-0'}`}>
        <Sun className="h-3 w-3 text-yellow-500" />
      </span>
      {/* Moon icon - shows in DARK mode (right side) */}
      <span className={`absolute right-1 transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
        <Moon className="h-3 w-3 text-gray-300" />
      </span>
    </button>
  );
};

export default ThemeToggle;