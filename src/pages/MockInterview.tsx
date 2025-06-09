import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Play, Video, Mic, Calendar, Clock, Star, Users, BarChart3, TrendingUp, Award } from 'lucide-react';
import FeedbackModal from '../components/FeedbackModal';

interface InterviewHistory {
  id: string;
  type: string;
  company: string;
  experienceLevel: string;
  date: string;
  score: number;
  duration: number;
  feedback: string;
  questionsAnswered: number;
  totalQuestions: number;
}

interface InterviewStats {
  totalInterviews: number;
  averageScore: number;
  totalTime: number;
  bestScore: number;
  improvementRate: number;
  interviewsByType: {
    technical: number;
    behavioral: number;
    'system-design': number;
  };
  scoresByCompany: Record<string, number[]>;
}

const MockInterview = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('technical');
  const [selectedCompany, setSelectedCompany] = useState('Google');
  const [selectedLevel, setSelectedLevel] = useState('Mid Level (3-5 years)');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [interviewHistory, setInterviewHistory] = useState<InterviewHistory[]>([]);
  const [interviewStats, setInterviewStats] = useState<InterviewStats>({
    totalInterviews: 0,
    averageScore: 0,
    totalTime: 0,
    bestScore: 0,
    improvementRate: 0,
    interviewsByType: { technical: 0, behavioral: 0, 'system-design': 0 },
    scoresByCompany: {}
  });

  const interviewTypes = [
    {
      id: 'technical',
      title: 'Technical Interview',
      description: 'Coding problems, algorithms, and data structures',
      duration: '45-60 minutes',
      difficulty: 'Medium to Hard',
      icon: Brain,
      color: 'from-rose-400/80 to-rose-500/80',
      features: ['Live Coding', 'Algorithm Design', 'Code Review', 'Optimization']
    },
    {
      id: 'behavioral',
      title: 'Behavioral Interview',
      description: 'Situational questions and soft skills assessment',
      duration: '30-45 minutes',
      difficulty: 'Easy to Medium',
      icon: Users,
      color: 'from-indigo-400/80 to-indigo-500/80',
      features: ['STAR Method', 'Leadership', 'Teamwork', 'Problem Solving']
    },
    {
      id: 'system-design',
      title: 'System Design',
      description: 'Architecture, scalability, and system thinking',
      duration: '60-90 minutes',
      difficulty: 'Hard',
      icon: Video,
      color: 'from-rose-400/80 to-indigo-400/80',
      features: ['Architecture', 'Scalability', 'Trade-offs', 'Real-world Systems']
    }
  ];

  const companies = ['Google', 'Meta', 'Amazon', 'Apple', 'Netflix', 'Microsoft', 'Uber', 'Airbnb', 'Tesla', 'Spotify', 'Other'];
  const experienceLevels = ['Entry Level (0-2 years)', 'Mid Level (3-5 years)', 'Senior Level (6+ years)', 'Staff/Principal (8+ years)'];

  useEffect(() => {
    loadInterviewData();
  }, []);

  const loadInterviewData = () => {
    const savedHistory = localStorage.getItem('interviewHistory');
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      setInterviewHistory(history);
      calculateStats(history);
    } else {
      // Initialize with sample data
      const sampleHistory: InterviewHistory[] = [
        {
          id: '1',
          type: 'Technical',
          company: 'Google',
          experienceLevel: 'Mid Level (3-5 years)',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          score: 85,
          duration: 45,
          feedback: 'Strong problem-solving skills, good communication',
          questionsAnswered: 4,
          totalQuestions: 5
        },
        {
          id: '2',
          type: 'Behavioral',
          company: 'Meta',
          experienceLevel: 'Mid Level (3-5 years)',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          score: 92,
          duration: 35,
          feedback: 'Excellent examples, clear structure in responses',
          questionsAnswered: 6,
          totalQuestions: 6
        }
      ];
      setInterviewHistory(sampleHistory);
      calculateStats(sampleHistory);
    }
  };

  const calculateStats = (history: InterviewHistory[]) => {
    if (history.length === 0) {
      setInterviewStats({
        totalInterviews: 0,
        averageScore: 0,
        totalTime: 0,
        bestScore: 0,
        improvementRate: 0,
        interviewsByType: { technical: 0, behavioral: 0, 'system-design': 0 },
        scoresByCompany: {}
      });
      return;
    }

    const totalInterviews = history.length;
    const averageScore = Math.round(history.reduce((sum, interview) => sum + interview.score, 0) / totalInterviews);
    const totalTime = history.reduce((sum, interview) => sum + interview.duration, 0);
    const bestScore = Math.max(...history.map(interview => interview.score));

    // Calculate improvement rate (last 3 vs first 3 interviews)
    const recentInterviews = history.slice(-3);
    const earlyInterviews = history.slice(0, 3);
    const recentAvg = recentInterviews.reduce((sum, interview) => sum + interview.score, 0) / recentInterviews.length;
    const earlyAvg = earlyInterviews.reduce((sum, interview) => sum + interview.score, 0) / earlyInterviews.length;
    const improvementRate = Math.round(((recentAvg - earlyAvg) / earlyAvg) * 100);

    const interviewsByType = {
      technical: history.filter(interview => interview.type.toLowerCase() === 'technical').length,
      behavioral: history.filter(interview => interview.type.toLowerCase() === 'behavioral').length,
      'system-design': history.filter(interview => interview.type.toLowerCase().includes('system')).length
    };

    const scoresByCompany: Record<string, number[]> = {};
    history.forEach(interview => {
      if (!scoresByCompany[interview.company]) {
        scoresByCompany[interview.company] = [];
      }
      scoresByCompany[interview.company].push(interview.score);
    });

    setInterviewStats({
      totalInterviews,
      averageScore,
      totalTime,
      bestScore,
      improvementRate,
      interviewsByType,
      scoresByCompany
    });
  };

  const startInterview = () => {
    setIsGenerating(true);
    
    // Navigate to interview session with parameters
    setTimeout(() => {
      navigate('/interview-session', {
        state: {
          type: selectedType,
          company: selectedCompany,
          experienceLevel: selectedLevel,
          onComplete: addInterviewToHistory
        }
      });
    }, 1500);
  };

  const addInterviewToHistory = (interviewData: Omit<InterviewHistory, 'id'>) => {
    const newInterview: InterviewHistory = {
      ...interviewData,
      id: Date.now().toString()
    };
    
    const updatedHistory = [newInterview, ...interviewHistory];
    setInterviewHistory(updatedHistory);
    localStorage.setItem('interviewHistory', JSON.stringify(updatedHistory));
    calculateStats(updatedHistory);
  };

  const handleFeedbackSubmit = (feedback: { rating: number; comment: string; name: string; role: string }) => {
    const existingFeedback = localStorage.getItem('userFeedback');
    const feedbackArray = existingFeedback ? JSON.parse(existingFeedback) : [];
    
    const newFeedback = {
      name: feedback.name,
      role: feedback.role,
      content: feedback.comment,
      rating: feedback.rating,
      date: new Date().toISOString()
    };
    
    feedbackArray.unshift(newFeedback);
    localStorage.setItem('userFeedback', JSON.stringify(feedbackArray));
    
    alert('Thank you for your feedback! It will appear on our homepage.');
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-rose-600';
    if (score >= 80) return 'text-indigo-600';
    if (score >= 70) return 'text-rose-500';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-orange-50/60 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-800 mb-2">Mock Interviews</h1>
          <p className="text-gray-600 font-sans">Practice with AI-powered interviews tailored to top tech companies</p>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-heading font-bold text-gray-800">{interviewStats.totalInterviews}</div>
                <div className="text-sm text-gray-600 font-sans">Interviews Completed</div>
                <div className="text-xs text-rose-600 font-sans mt-1">
                  T:{interviewStats.interviewsByType.technical} B:{interviewStats.interviewsByType.behavioral} S:{interviewStats.interviewsByType['system-design']}
                </div>
              </div>
              <Brain className="h-8 w-8 text-rose-600" />
            </div>
          </div>
          
          <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-heading font-bold text-gray-800">{interviewStats.averageScore}%</div>
                <div className="text-sm text-gray-600 font-sans">Average Score</div>
                <div className="text-xs text-indigo-600 font-sans mt-1">
                  Best: {interviewStats.bestScore}%
                </div>
              </div>
              <Star className="h-8 w-8 text-rose-600" />
            </div>
          </div>
          
          <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-heading font-bold text-gray-800">{Math.round(interviewStats.totalTime / 60)}h</div>
                <div className="text-sm text-gray-600 font-sans">Practice Time</div>
                <div className="text-xs text-rose-600 font-sans mt-1">
                  {interviewStats.totalTime}min total
                </div>
              </div>
              <Clock className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          
          <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-heading font-bold text-gray-800">
                  {interviewStats.improvementRate > 0 ? '+' : ''}{interviewStats.improvementRate}%
                </div>
                <div className="text-sm text-gray-600 font-sans">Improvement</div>
                <div className="text-xs text-indigo-600 font-sans mt-1">
                  Recent vs Early
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interview Setup */}
          <div className="lg:col-span-2">
            {/* Interview Type Selection */}
            <div className="bg-white/90 p-6 rounded-xl shadow-lg mb-8 border border-rose-200/60">
              <h2 className="text-xl font-heading font-semibold text-gray-800 mb-6">Choose Interview Type</h2>
              
              <div className="grid grid-cols-1 gap-4 mb-6">
                {interviewTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedType === type.id
                          ? 'border-rose-400 bg-rose-50/80'
                          : 'border-rose-200/60 hover:border-rose-300/80'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center shadow-md flex-shrink-0`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-heading font-semibold text-gray-800 mb-2">{type.title}</h3>
                          <p className="text-sm text-gray-600 mb-3 font-sans">{type.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {type.features.map((feature, index) => (
                              <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-sans">
                                {feature}
                              </span>
                            ))}
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 font-sans">
                            <span>Duration: {type.duration}</span>
                            <span>Difficulty: {type.difficulty}</span>
                          </div>
                        </div>
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

            {/* Interview History */}
            <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
              <h2 className="text-xl font-heading font-semibold text-gray-800 mb-6">Interview History</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {interviewHistory.map((interview) => (
                  <div key={interview.id} className="p-4 bg-rose-50/80 rounded-lg border border-rose-200/60">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-heading font-semibold text-gray-800">{interview.type} - {interview.company}</h3>
                        <p className="text-sm text-gray-600 font-sans">{new Date(interview.date).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-500 font-sans">{interview.experienceLevel}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-heading font-bold ${getScoreColor(interview.score)}`}>
                          {interview.score}%
                        </div>
                        <div className="text-xs text-gray-500 font-sans">{interview.duration}min</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 font-sans">{interview.feedback}</p>
                    <div className="flex justify-between text-xs text-gray-500 font-sans">
                      <span>Questions: {interview.questionsAnswered}/{interview.totalQuestions}</span>
                      <button
                        onClick={() => setShowFeedbackModal(true)}
                        className="text-rose-600 hover:text-rose-700 font-medium"
                      >
                        Leave Feedback
                      </button>
                    </div>
                  </div>
                ))}
                {interviewHistory.length === 0 && (
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 font-sans">No interviews completed yet</p>
                    <p className="text-sm text-gray-500 font-sans">Start your first interview to see your history here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Performance Insights */}
            <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
              <h2 className="text-xl font-heading font-semibold text-gray-800 mb-4">Performance Insights</h2>
              <div className="space-y-4">
                {Object.entries(interviewStats.scoresByCompany).map(([company, scores]) => {
                  const avgScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
                  return (
                    <div key={company}>
                      <div className="flex justify-between text-sm mb-1 font-sans">
                        <span>{company}</span>
                        <span>{avgScore}%</span>
                      </div>
                      <div className="w-full bg-rose-200/60 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-rose-400/80 to-rose-500/80 h-2 rounded-full"
                          style={{ width: `${avgScore}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interview Tips */}
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
                  <p>Use the STAR method for behavioral questions</p>
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

            {/* Quick Actions */}
            <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
              <h2 className="text-xl font-heading font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/coding')}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-rose-400/80 to-indigo-400/80 text-slate-800 py-2 rounded-lg font-sans font-medium hover:from-rose-500/80 hover:to-indigo-500/80 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Award className="h-4 w-4" />
                  <span>Practice Coding</span>
                </button>
                
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full flex items-center justify-center space-x-2 border border-rose-200/60 text-gray-700 py-2 rounded-lg font-sans font-medium hover:bg-rose-50/80 transition-all duration-200"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>View Dashboard</span>
                </button>
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