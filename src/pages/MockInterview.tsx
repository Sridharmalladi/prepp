import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Play, Video, Mic, Calendar, Clock, Star, Users, Sparkles } from 'lucide-react';
import FeedbackModal from '../components/FeedbackModal';

const MockInterview = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('technical');
  const [selectedCompany, setSelectedCompany] = useState('Google');
  const [selectedLevel, setSelectedLevel] = useState('Mid Level (3-5 years)');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const interviewTypes = [
    {
      id: 'technical',
      title: 'Technical Interview',
      description: 'Coding problems and system design questions',
      duration: '45-60 minutes',
      difficulty: 'Medium to Hard',
      icon: Brain,
      color: 'from-rose-400/80 to-rose-500/80'
    },
    {
      id: 'behavioral',
      title: 'Behavioral Interview',
      description: 'Situational questions and soft skills assessment',
      duration: '30-45 minutes',
      difficulty: 'Easy to Medium',
      icon: Users,
      color: 'from-indigo-400/80 to-indigo-500/80'
    },
    {
      id: 'system-design',
      title: 'System Design',
      description: 'Architecture and scalability discussions',
      duration: '60-90 minutes',
      difficulty: 'Hard',
      icon: Video,
      color: 'from-rose-400/80 to-rose-500/80'
    }
  ];

  const companies = ['Google', 'Meta', 'Amazon', 'Apple', 'Netflix', 'Microsoft', 'Uber', 'Airbnb'];
  const experienceLevels = ['Entry Level (0-2 years)', 'Mid Level (3-5 years)', 'Senior Level (6+ years)'];

  const recentInterviews = [
    {
      type: 'Technical',
      company: 'Google',
      date: '2 days ago',
      score: 85,
      feedback: 'Strong problem-solving skills, good communication',
      canLeaveFeedback: true
    },
    {
      type: 'Behavioral',
      company: 'Meta',
      date: '1 week ago',
      score: 92,
      feedback: 'Excellent examples, clear structure in responses',
      canLeaveFeedback: true
    },
    {
      type: 'System Design',
      company: 'Amazon',
      date: '2 weeks ago',
      score: 78,
      feedback: 'Good high-level design, could improve on scalability details',
      canLeaveFeedback: true
    }
  ];

  const upcomingInterviews = [
    {
      type: 'Technical',
      company: 'Netflix',
      date: 'Tomorrow',
      time: '2:00 PM'
    },
    {
      type: 'Behavioral',
      company: 'Apple',
      date: 'Friday',
      time: '10:00 AM'
    }
  ];

  const startInterview = () => {
    setIsGenerating(true);
    
    // Navigate to interview session with parameters
    setTimeout(() => {
      navigate('/interview-session', {
        state: {
          type: selectedType,
          company: selectedCompany,
          experienceLevel: selectedLevel
        }
      });
    }, 1500);
  };

  const handleFeedbackSubmit = (feedback: { rating: number; comment: string; name: string; role: string }) => {
    // Save feedback to localStorage
    const existingFeedback = localStorage.getItem('userFeedback');
    const feedbackArray = existingFeedback ? JSON.parse(existingFeedback) : [];
    
    const newFeedback = {
      name: feedback.name,
      role: feedback.role,
      content: feedback.comment,
      rating: feedback.rating,
      date: new Date().toISOString()
    };
    
    feedbackArray.unshift(newFeedback); // Add to beginning of array
    localStorage.setItem('userFeedback', JSON.stringify(feedbackArray));
    
    // Show success message or update UI as needed
    alert('Thank you for your feedback! It will appear on our homepage.');
  };

  return (
    <div className="min-h-screen bg-orange-50/60 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-800 mb-2">Mock Interviews</h1>
          <p className="text-gray-600 font-sans">Practice with AI-powered interviews tailored to top tech companies</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-heading font-bold text-gray-800">8</div>
                <div className="text-sm text-gray-600 font-sans">Interviews Completed</div>
              </div>
              <Brain className="h-8 w-8 text-rose-600" />
            </div>
          </div>
          
          <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-heading font-bold text-gray-800">85%</div>
                <div className="text-sm text-gray-600 font-sans">Average Score</div>
              </div>
              <Star className="h-8 w-8 text-rose-600" />
            </div>
          </div>
          
          <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-heading font-bold text-gray-800">12h</div>
                <div className="text-sm text-gray-600 font-sans">Practice Time</div>
              </div>
              <Clock className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          
          <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-heading font-bold text-gray-800">2</div>
                <div className="text-sm text-gray-600 font-sans">Upcoming</div>
              </div>
              <Calendar className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interview Setup */}
          <div className="lg:col-span-2">
            {/* AI Interview Generator */}
            <div className="bg-gradient-to-r from-rose-400/80 to-indigo-400/80 p-6 rounded-xl shadow-lg mb-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-2 flex items-center">
                    <Sparkles className="h-6 w-6 mr-2" />
                    AI-Powered Interview Generator
                  </h2>
                  <p className="font-sans opacity-90">Generate personalized interview questions based on company and role</p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 p-6 rounded-xl shadow-lg mb-8 border border-rose-200/60">
              <h2 className="text-xl font-heading font-semibold text-gray-800 mb-6">Start New Interview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {interviewTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedType === type.id
                          ? 'border-rose-400 bg-rose-50/80'
                          : 'border-rose-200/60 hover:border-rose-300/80'
                      }`}
                    >
                      <div className={`w-10 h-10 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center mb-3 shadow-md`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="font-heading font-semibold text-gray-800 mb-1">{type.title}</h3>
                      <p className="text-sm text-gray-600 mb-2 font-sans">{type.description}</p>
                      <div className="text-xs text-gray-500 font-sans">
                        <div>Duration: {type.duration}</div>
                        <div>Difficulty: {type.difficulty}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-rose-200/60 pt-6">
                <h3 className="font-heading font-semibold text-gray-800 mb-4">Interview Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-sans font-medium text-gray-700 mb-2">Company Focus</label>
                    <select 
                      value={selectedCompany}
                      onChange={(e) => setSelectedCompany(e.target.value)}
                      className="w-full border border-rose-200/60 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-400 focus:border-transparent font-sans"
                    >
                      {companies.map(company => (
                        <option key={company} value={company}>{company}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-sans font-medium text-gray-700 mb-2">Experience Level</label>
                    <select 
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-full border border-rose-200/60 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-400 focus:border-transparent font-sans"
                    >
                      {experienceLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button 
                  onClick={startInterview}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-rose-400/80 to-indigo-400/80 text-slate-800 py-3 rounded-lg font-sans font-semibold hover:from-rose-500/80 hover:to-indigo-500/80 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-800"></div>
                      <span>Generating Interview...</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" />
                      <span>Start Interview</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Recent Interviews */}
            <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
              <h2 className="text-xl font-heading font-semibold text-gray-800 mb-6">Recent Interviews</h2>
              <div className="space-y-4">
                {recentInterviews.map((interview, index) => (
                  <div key={index} className="p-4 bg-rose-50/80 rounded-lg border border-rose-200/60">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-heading font-semibold text-gray-800">{interview.type} - {interview.company}</h3>
                        <p className="text-sm text-gray-600 font-sans">{interview.date}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-heading font-bold ${
                          interview.score >= 90 ? 'text-rose-600' :
                          interview.score >= 80 ? 'text-indigo-600' :
                          interview.score >= 70 ? 'text-rose-600' : 'text-red-600'
                        }`}>
                          {interview.score}%
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 font-sans">{interview.feedback}</p>
                    {interview.canLeaveFeedback && (
                      <button
                        onClick={() => setShowFeedbackModal(true)}
                        className="text-sm bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors duration-200 font-sans"
                      >
                        Leave Feedback
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Interviews */}
            <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
              <h2 className="text-xl font-heading font-semibold text-gray-800 mb-4">Upcoming</h2>
              <div className="space-y-3">
                {upcomingInterviews.map((interview, index) => (
                  <div key={index} className="p-3 bg-indigo-50/80 rounded-lg border border-indigo-200/60">
                    <div className="font-heading font-medium text-gray-800">{interview.type}</div>
                    <div className="text-sm text-gray-600 font-sans">{interview.company}</div>
                    <div className="text-sm text-indigo-600 font-sans font-medium">{interview.date} at {interview.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
              <h2 className="text-xl font-heading font-semibold text-gray-800 mb-4">Interview Tips</h2>
              <div className="space-y-3 text-sm text-gray-600 font-sans">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-rose-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Practice explaining your thought process out loud</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-rose-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Ask clarifying questions before starting to code</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-rose-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Test your solution with edge cases</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-rose-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Discuss time and space complexity</p>
                </div>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
              <h2 className="text-xl font-heading font-semibold text-gray-800 mb-4">Performance Insights</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1 font-sans">
                    <span>Problem Solving</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-rose-200/60 rounded-full h-2">
                    <div className="bg-gradient-to-r from-rose-400/80 to-rose-500/80 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1 font-sans">
                    <span>Communication</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full bg-rose-200/60 rounded-full h-2">
                    <div className="bg-gradient-to-r from-indigo-400/80 to-indigo-500/80 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1 font-sans">
                    <span>Code Quality</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-rose-200/60 rounded-full h-2">
                    <div className="bg-gradient-to-r from-rose-400/80 to-rose-500/80 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Modal */}
        <FeedbackModal
          isOpen={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
          onSubmit={handleFeedbackSubmit}
        />
      </div>
    </div>
  );
};

export default MockInterview;