import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Brain, Target, Users, ArrowRight, CheckCircle, Star } from 'lucide-react';

interface HomeProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Home: React.FC<HomeProps> = ({ isDarkMode, onToggleTheme }) => {
  const features = [
    {
      icon: Code,
      title: 'Coding Practice',
      description: 'Solve algorithmic problems with our interactive code editor and instant feedback.',
      color: isDarkMode ? 'from-rose-300 to-rose-400' : 'from-rose-400 to-rose-500'
    },
    {
      icon: Brain,
      title: 'Mock Interviews',
      description: 'Practice with AI-powered mock interviews tailored to your target companies.',
      color: isDarkMode ? 'from-indigo-300 to-indigo-400' : 'from-indigo-400 to-indigo-500'
    },
    {
      icon: Target,
      title: 'Skill Assessment',
      description: 'Track your progress and identify areas for improvement with detailed analytics.',
      color: isDarkMode ? 'from-rose-300 to-indigo-300' : 'from-rose-400 to-indigo-400'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with other job seekers and share interview experiences.',
      color: isDarkMode ? 'from-indigo-300 to-rose-300' : 'from-indigo-400 to-rose-400'
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
    background: isDarkMode ? 'bg-gray-900' : 'bg-orange-50',
    cardBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    textPrimary: isDarkMode ? 'text-gray-100' : 'text-gray-800',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    border: isDarkMode ? 'border-gray-700' : 'border-rose-200',
    heroBg: isDarkMode ? 'bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900' : 'bg-gradient-to-br from-orange-50 via-rose-50 to-purple-50',
    statsBg: isDarkMode ? 'bg-gradient-to-r from-rose-400 to-indigo-400' : 'bg-gradient-to-r from-rose-400 to-indigo-400',
    sectionBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    testimonialsBg: isDarkMode ? 'bg-gray-900' : 'bg-orange-50'
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background}`}>
      {/* Hero Section */}
      <section className={`relative ${themeClasses.heroBg} py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className={`text-4xl md:text-6xl font-bold ${themeClasses.textPrimary} mb-6 transition-colors duration-300`}>
              Master Your{' '}
              <span className={`bg-gradient-to-r ${isDarkMode ? 'from-rose-300 to-indigo-300' : 'from-rose-500 to-indigo-500'} bg-clip-text text-transparent`}>
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
                className={`${isDarkMode 
                  ? 'bg-gradient-to-r from-rose-400 to-rose-500 text-gray-100 hover:from-rose-300 hover:to-rose-400' 
                  : 'bg-gradient-to-r from-rose-400 to-rose-500 text-slate-800 hover:from-rose-500 hover:to-rose-600'
                } px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
              >
                Start Preparing Now
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/dashboard"
                className={`border-2 ${isDarkMode 
                  ? 'border-indigo-400 text-indigo-300 hover:border-indigo-300 hover:text-indigo-200 hover:bg-indigo-400/10' 
                  : 'border-indigo-400 text-indigo-500 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50'
                } px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200`}
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
                  className={`${themeClasses.cardBg} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border ${themeClasses.border} hover:border-rose-300`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-6 shadow-md`}>
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
            <div className="transform hover:scale-105 transition-transform duration-200">
              <div className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">10,000+</div>
              <div className="text-xl opacity-90">Students Prepared</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-200">
              <div className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">500+</div>
              <div className="text-xl opacity-90">Coding Problems</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-200">
              <div className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">95%</div>
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
                className={`${themeClasses.cardBg} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border ${themeClasses.border} hover:border-indigo-300 transform hover:-translate-y-1`}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-rose-400 fill-current" />
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
            className={`${isDarkMode 
              ? 'bg-gradient-to-r from-rose-400 to-rose-500 text-gray-100 hover:from-rose-300 hover:to-rose-400' 
              : 'bg-gradient-to-r from-rose-400 to-rose-500 text-slate-800 hover:from-rose-500 hover:to-rose-600'
            } px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center`}
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