import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, MicOff, Video, VideoOff, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Question {
  id: number;
  type: 'technical' | 'behavioral' | 'system-design';
  question: string;
  followUp?: string[];
  expectedPoints?: string[];
  timeLimit?: number;
}

interface InterviewData {
  type: string;
  company: string;
  experienceLevel: string;
  questions: Question[];
  totalDuration: number;
}

const InterviewSession = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [userResponse, setUserResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [interview, setInterview] = useState<InterviewData | null>(null);
  const [responses, setResponses] = useState<string[]>([]);
  const [interviewStarted, setInterviewStarted] = useState(false);

  // Get interview parameters from location state
  const { type, company, experienceLevel } = location.state || {};

  useEffect(() => {
    if (type && company && experienceLevel) {
      generateInterview();
    }
  }, [type, company, experienceLevel]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (interviewStarted && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [interviewStarted, timeRemaining]);

  const generateInterview = async () => {
    setIsGenerating(true);
    
    // Simulate LLM API call - replace with actual backend integration
    setTimeout(() => {
      const generatedInterview: InterviewData = {
        type,
        company,
        experienceLevel,
        totalDuration: type === 'system-design' ? 3600 : type === 'technical' ? 2700 : 1800,
        questions: generateQuestions(type, company, experienceLevel)
      };
      
      setInterview(generatedInterview);
      setTimeRemaining(generatedInterview.questions[0]?.timeLimit || 900);
      setResponses(new Array(generatedInterview.questions.length).fill(''));
      setIsGenerating(false);
    }, 2000);
  };

  const generateQuestions = (type: string, company: string, level: string): Question[] => {
    const baseQuestions = {
      technical: [
        {
          id: 1,
          type: 'technical' as const,
          question: `Design a scalable system for ${company}'s core product. How would you handle ${level === 'Entry Level (0-2 years)' ? 'basic load balancing' : level === 'Mid Level (3-5 years)' ? 'high availability and caching' : 'global distribution and consistency'}?`,
          followUp: [
            'How would you handle database scaling?',
            'What caching strategies would you implement?',
            'How would you ensure data consistency?'
          ],
          expectedPoints: [
            'Load balancing strategies',
            'Database design considerations',
            'Caching mechanisms',
            'Scalability patterns'
          ],
          timeLimit: 1200
        },
        {
          id: 2,
          type: 'technical' as const,
          question: 'Implement a function to find the longest palindromic substring in a given string. Explain your approach and analyze the time complexity.',
          followUp: [
            'Can you optimize this further?',
            'How would you handle edge cases?',
            'What if the string is very large?'
          ],
          expectedPoints: [
            'Algorithm explanation',
            'Time and space complexity',
            'Edge case handling',
            'Code implementation'
          ],
          timeLimit: 900
        }
      ],
      behavioral: [
        {
          id: 1,
          type: 'behavioral' as const,
          question: `Tell me about a time when you had to work with a difficult team member. How did you handle the situation, especially considering ${company}'s collaborative culture?`,
          followUp: [
            'What was the outcome?',
            'What would you do differently?',
            'How did this experience change your approach to teamwork?'
          ],
          expectedPoints: [
            'Specific situation description',
            'Actions taken',
            'Results achieved',
            'Lessons learned'
          ],
          timeLimit: 600
        },
        {
          id: 2,
          type: 'behavioral' as const,
          question: 'Describe a project where you had to learn a new technology quickly. How did you approach the learning process?',
          followUp: [
            'What challenges did you face?',
            'How did you ensure code quality while learning?',
            'How do you stay updated with new technologies?'
          ],
          expectedPoints: [
            'Learning methodology',
            'Time management',
            'Quality assurance',
            'Continuous learning approach'
          ],
          timeLimit: 600
        }
      ],
      'system-design': [
        {
          id: 1,
          type: 'system-design' as const,
          question: `Design a distributed messaging system like WhatsApp that can handle ${company === 'Meta' ? 'billions of users' : 'millions of users'}. Consider ${level.includes('Senior') ? 'global scale, consistency, and fault tolerance' : 'basic messaging, delivery, and storage'}.`,
          followUp: [
            'How would you handle message ordering?',
            'What about offline message delivery?',
            'How would you implement group chats?',
            'What are your database choices and why?'
          ],
          expectedPoints: [
            'High-level architecture',
            'Database design',
            'Message delivery guarantees',
            'Scalability considerations',
            'Security and privacy'
          ],
          timeLimit: 2700
        }
      ]
    };

    return baseQuestions[type as keyof typeof baseQuestions] || [];
  };

  const startInterview = () => {
    setInterviewStarted(true);
    setIsRecording(true);
  };

  const nextQuestion = () => {
    if (interview && currentQuestion < interview.questions.length - 1) {
      // Save current response
      const newResponses = [...responses];
      newResponses[currentQuestion] = userResponse;
      setResponses(newResponses);
      
      // Move to next question
      setCurrentQuestion(currentQuestion + 1);
      setUserResponse('');
      setTimeRemaining(interview.questions[currentQuestion + 1]?.timeLimit || 900);
    } else {
      finishInterview();
    }
  };

  const finishInterview = () => {
    // Save final response
    const newResponses = [...responses];
    newResponses[currentQuestion] = userResponse;
    setResponses(newResponses);
    
    // Navigate to results page with interview data
    navigate('/interview-results', {
      state: {
        interview,
        responses: newResponses,
        type,
        company,
        experienceLevel
      }
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-orange-50/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-rose-600 mx-auto mb-4"></div>
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-2">Preparing Your Interview</h2>
              <p className="text-gray-600 font-sans">Generating {type} questions for {company} ({experienceLevel})...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="min-h-screen bg-orange-50/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-heading font-medium text-gray-800 mb-2">No interview data available</h3>
            <p className="text-gray-600 font-sans mb-4">Please start an interview from the mock interview page.</p>
            <button
              onClick={() => navigate('/interview')}
              className="bg-gradient-to-r from-rose-400/80 to-indigo-400/80 text-slate-800 px-6 py-3 rounded-lg font-sans font-medium hover:from-rose-500/80 hover:to-indigo-500/80 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Back to Mock Interviews
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = interview.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-orange-50/60 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/interview')}
            className="flex items-center space-x-2 text-gray-600 hover:text-rose-600 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-sans">Back to Interviews</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold text-gray-800 mb-2">
                {interview.type.charAt(0).toUpperCase() + interview.type.slice(1)} Interview - {interview.company}
              </h1>
              <p className="text-gray-600 font-sans">{interview.experienceLevel}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/90 px-4 py-2 rounded-lg border border-rose-200/60">
                <Clock className="h-5 w-5 text-gray-600" />
                <span className="font-sans font-medium text-gray-800">{formatTime(timeRemaining)}</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-white/90 px-4 py-2 rounded-lg border border-rose-200/60">
                <span className="font-sans text-sm text-gray-600">
                  Question {currentQuestion + 1} of {interview.questions.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {!interviewStarted ? (
          /* Pre-Interview Setup */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 p-8 rounded-xl shadow-lg border border-rose-200/60 text-center">
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-4">Ready to Start Your Interview?</h2>
              <p className="text-gray-600 font-sans mb-6 leading-relaxed">
                This {interview.type} interview will consist of {interview.questions.length} questions. 
                Make sure your microphone and camera are working properly.
              </p>
              
              <div className="flex items-center justify-center space-x-6 mb-8">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isMicOn ? 'bg-rose-500' : 'bg-gray-400'}`}></div>
                  <span className="font-sans text-sm">Microphone</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isCameraOn ? 'bg-rose-500' : 'bg-gray-400'}`}></div>
                  <span className="font-sans text-sm">Camera</span>
                </div>
              </div>
              
              <button
                onClick={startInterview}
                className="bg-gradient-to-r from-rose-400/80 to-indigo-400/80 text-slate-800 px-8 py-4 rounded-lg font-sans font-semibold hover:from-rose-500/80 hover:to-indigo-500/80 transition-all duration-200 shadow-md hover:shadow-lg text-lg"
              >
                Start Interview
              </button>
            </div>
          </div>
        ) : (
          /* Interview Interface */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Question Panel */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-heading font-semibold text-gray-800">Current Question</h2>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-sans font-medium">
                    {currentQ?.type.charAt(0).toUpperCase() + currentQ?.type.slice(1)}
                  </span>
                </div>
                
                <div className="bg-indigo-50/80 p-6 rounded-lg border border-indigo-200/60 mb-6">
                  <p className="text-gray-800 font-sans text-lg leading-relaxed">{currentQ?.question}</p>
                </div>
                
                {currentQ?.expectedPoints && (
                  <div className="mb-6">
                    <h3 className="font-heading font-semibold text-gray-800 mb-3">Key Points to Cover:</h3>
                    <ul className="space-y-2">
                      {currentQ.expectedPoints.map((point, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-rose-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-600 font-sans text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-sans font-medium text-gray-700 mb-2">
                    Your Response:
                  </label>
                  <textarea
                    value={userResponse}
                    onChange={(e) => setUserResponse(e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 border border-rose-200/60 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent resize-none font-sans"
                    placeholder="Type your response here or speak aloud..."
                  />
                </div>
                
                <div className="flex justify-between mt-6">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setIsMicOn(!isMicOn)}
                      className={`p-3 rounded-lg transition-colors duration-200 ${
                        isMicOn ? 'bg-rose-100 text-rose-600' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                    </button>
                    
                    <button
                      onClick={() => setIsCameraOn(!isCameraOn)}
                      className={`p-3 rounded-lg transition-colors duration-200 ${
                        isCameraOn ? 'bg-rose-100 text-rose-600' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {isCameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                    </button>
                  </div>
                  
                  <button
                    onClick={nextQuestion}
                    className="bg-gradient-to-r from-rose-400/80 to-indigo-400/80 text-slate-800 px-6 py-3 rounded-lg font-sans font-medium hover:from-rose-500/80 hover:to-indigo-500/80 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    {currentQuestion === interview.questions.length - 1 ? 'Finish Interview' : 'Next Question'}
                  </button>
                </div>
              </div>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Progress */}
              <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
                <h3 className="font-heading font-semibold text-gray-800 mb-4">Progress</h3>
                <div className="space-y-3">
                  {interview.questions.map((_, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        index === currentQuestion
                          ? 'bg-rose-100 border border-rose-200'
                          : index < currentQuestion
                          ? 'bg-rose-50/80 border border-rose-200/60'
                          : 'bg-gray-50/80 border border-gray-200/60'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-sans font-medium ${
                        index === currentQuestion
                          ? 'bg-rose-600 text-white'
                          : index < currentQuestion
                          ? 'bg-rose-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {index < currentQuestion ? '✓' : index + 1}
                      </div>
                      <span className="font-sans text-sm text-gray-700">Question {index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Follow-up Questions */}
              {currentQ?.followUp && (
                <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
                  <h3 className="font-heading font-semibold text-gray-800 mb-4">Potential Follow-ups</h3>
                  <div className="space-y-2">
                    {currentQ.followUp.map((followUp, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-indigo-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-600 font-sans text-sm">{followUp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
                <h3 className="font-heading font-semibold text-gray-800 mb-4">Interview Tips</h3>
                <div className="space-y-3 text-sm text-gray-600 font-sans">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-rose-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Take your time to think before answering</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-rose-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Use the STAR method for behavioral questions</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-rose-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Ask clarifying questions when needed</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-rose-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Speak clearly and maintain eye contact</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewSession;