import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code, Brain, User, Menu, X, Home, BarChart3 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode = false, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Coding Practice', href: '/coding', icon: Code },
    { name: 'Mock Interview', href: '/interview', icon: Brain },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg border-b border-rose-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-rose-400 to-indigo-400 p-2 rounded-lg shadow-md">
              <Code className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-heading font-semibold bg-gradient-to-r from-rose-500 to-indigo-500 bg-clip-text text-transparent">
              Prepify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-sans font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-rose-600 bg-rose-50'
                      : 'text-gray-700 hover:text-rose-600 hover:bg-rose-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side - Auth Buttons, Theme Toggle, and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-sans font-medium transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-rose-400 to-indigo-400 text-slate-800 px-4 py-2 rounded-md text-sm font-sans font-medium hover:from-rose-500 hover:to-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </div>

            {/* Theme Toggle - Always visible */}
            {onToggleTheme && (
              <ThemeToggle isDark={isDarkMode} onToggle={onToggleTheme} />
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-rose-200">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-sans font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-rose-600 bg-rose-50'
                        : 'text-gray-700 hover:text-rose-600 hover:bg-rose-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-rose-200 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-base font-sans font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-base font-sans font-medium bg-gradient-to-r from-rose-400 to-indigo-400 text-slate-800 rounded-md hover:from-rose-500 hover:to-indigo-500 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;