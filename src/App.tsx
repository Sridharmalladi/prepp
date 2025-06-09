import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CodingPractice from './pages/CodingPractice';
import CodingProblemSolver from './pages/CodingProblemSolver';
import MockInterview from './pages/MockInterview';
import InterviewSession from './pages/InterviewSession';
import InterviewResults from './pages/InterviewResults';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // Only show theme toggle on home page
  const showThemeToggle = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isDarkMode={isDarkMode} 
        onToggleTheme={showThemeToggle ? toggleTheme : undefined} 
      />
      <main>
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/coding" element={<CodingPractice />} />
          <Route path="/coding-problem" element={<CodingProblemSolver />} />
          <Route path="/interview" element={<MockInterview />} />
          <Route path="/interview-session" element={<InterviewSession />} />
          <Route path="/interview-results" element={<InterviewResults />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;