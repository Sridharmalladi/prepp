import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Brain, Target, Users, ArrowRight, CheckCircle, Star } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const features = [
    {
      icon: Code,
      title: 'Coding Practice',
      description: 'Solve algorithmic problems with our interactive code editor and instant feedback.',
      color: isDarkMode ? 'from-blue-400 to-cyan-400' : 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: 'Mock Interviews',
      description: 'Practice with AI-powered mock interviews tailored to your target companies.',
      color: isDarkMode ? 'from-purple-400 to-pink-400' : 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Skill Assessment',
      description: 'Track your progress and identify areas for improvement with detailed analytics.',
      color: isDarkMode ? 'from-green-400 to-emerald-400' : 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with other job seekers and share interview experiences.',
      color: isDarkMode ? 'from-orange-400 to-red-400' : 'from-orange-500 to-red-500'
    }
  ];

  // Get testimonials from localStorage or use default ones
  const getTestimonials = () => {
    const savedFeedback = localStorage.getItem('userFeedback');
    const userFeedback = savedFeedback ? JSON.parse(savedFeedback) : [];
    
    const defaultTestimonials = [
      {
        name: 'Sarah Chen',
        role: 'Software Engineer at Google',
        content: 'Prepify helped me land my dream job! The mock interviews were incredibly realistic.',
        rating: 5
      },
      {
        name: 'Michael Rodriguez',
        role: 'Full Stack Developer at Meta',
        content: 'The coding challenges perfectly prepared me for technical interviews.',
        rating: 5
      },
      {
        name: 'Emily Johnson',
        role: 'Data Scientist at Netflix',
        content: 'Amazing platform with comprehensive preparation materials.',
        rating: 5
      }
    ];

    // Combine user feedback with default testimonials, prioritizing user feedback
    return [...userFeedback, ...defaultTestimonials].slice(0, 6);
  };

  const testimonials = getTestimonials();

  const themeClasses = {
    background: isDarkMode ? 'bg-slate-900' : 'bg-gray-100',
    cardBg: isDarkMode ? 'bg-slate-800' : 'bg-white',
    textPrimary: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-slate-300' : 'text-gray-600',
    border: isDarkMode ? 'border-slate-700' : 'border-gray-100',
    heroBg: isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
    statsBg: isDarkMode ? 'bg-gradient-to-r from-slate-800 to-slate-700' : 'bg-gradient-to-r from-blue-600 to-purple-600',
    sectionBg: isDarkMode ? 'bg-slate-800' : 'bg-white',
    testimonialsBg: isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background} relative`}>
      {/* Theme Toggle - Fixed position with proper z-index */}
      <div className="fixed top-20 right-4 z-[100]">
        <div className={`p-3 rounded-full shadow-lg backdrop-blur-sm ${themeClasses.cardBg} ${themeClasses.border} border transition-all duration-300`}>
          <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} />
        </div>
      </div>

      {/* Hero Section */}
      <section className={`relative ${themeClasses.heroBg} py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className={`text-4xl md:text-6xl font-bold ${themeClasses.textPrimary} mb-6 transition-colors duration-300`}>
              Master Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Interview Skills
              </span>
            </h1>
            <p className={`text-xl ${themeClasses.textSecondary} mb-8 max-w-3xl mx-auto transition-colors duration-300`}>
              Comprehensive interview preparation platform with coding challenges, mock interviews, 
              and personalized feedback to help you land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Preparing Now
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/dashboard"
                className={`border-2 ${isDarkMode ? 'border-slate-600 text-slate-300 hover:border-blue-500 hover:text-blue-400' : 'border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'} px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200`}
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${themeClasses.sectionBg} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.textPrimary} mb-4 transition-colors duration-300`}>
              Everything You Need to Succeed
            </h2>
            <p className={`text-xl ${themeClasses.textSecondary} max-w-2xl mx-auto transition-colors duration-300`}>
              Our comprehensive platform provides all the tools and resources you need to ace your interviews.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`${themeClasses.cardBg} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border ${themeClasses.border}`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className={`text-xl font-semibold ${themeClasses.textPrimary} mb-3 transition-colors duration-300`}>{feature.title}</h3>
                  <p className={`${themeClasses.textSecondary} transition-colors duration-300`}>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${themeClasses.statsBg} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
              <div className="text-xl opacity-90">Students Prepared</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-xl opacity-90">Coding Problems</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
              <div className="text-xl opacity-90">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${themeClasses.testimonialsBg} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.textPrimary} mb-4 transition-colors duration-300`}>
              Success Stories
            </h2>
            <p className={`text-xl ${themeClasses.textSecondary} transition-colors duration-300`}>
              Hear from our students who landed their dream jobs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`${themeClasses.cardBg} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border ${themeClasses.border}`}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className={`${themeClasses.textSecondary} mb-6 italic transition-colors duration-300`}>"{testimonial.content}"</p>
                <div>
                  <div className={`font-semibold ${themeClasses.textPrimary} transition-colors duration-300`}>{testimonial.name}</div>
                  <div className={`text-sm ${themeClasses.textSecondary} transition-colors duration-300`}>{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${themeClasses.sectionBg} transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.textPrimary} mb-6 transition-colors duration-300`}>
            Ready to Land Your Dream Job?
          </h2>
          <p className={`text-xl ${themeClasses.textSecondary} mb-8 transition-colors duration-300`}>
            Join thousands of successful candidates who used Prepify to ace their interviews.
          </p>
          <Link
            to="/register"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center"
          >
            Get Started for Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;