import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, MicOff, Video, VideoOff, MessageSquare, Clock, CheckCircle, AlertCircle, Code, Users, Layers } from 'lucide-react';

interface Question {
  id: number;
  type: 'technical' | 'behavioral' | 'system-design';
  question: string;
  followUp?: string[];
  expectedPoints?: string[];
  timeLimit?: number;
  category?: string;
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
  const [startTime, setStartTime] = useState<Date | null>(null);

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
    const levelComplexity = level.includes('Entry') ? 'basic' : level.includes('Senior') ? 'advanced' : 'intermediate';
    
    if (type === 'technical') {
      return [
        {
          id: 1,
          type: 'technical',
          category: 'Algorithms',
          question: `Solve this ${levelComplexity} algorithmic problem commonly asked at ${company}: Given an array of integers, find the two numbers that add up to a specific target. Optimize for ${levelComplexity === 'basic' ? 'correctness' : levelComplexity === 'intermediate' ? 'time complexity' : 'both time and space complexity'}.`,
          followUp: [
            'What if the array is sorted?',
            'How would you handle duplicate values?',
            'Can you optimize the space complexity?'
          ],
          expectedPoints: [
            'Brute force approach explanation',
            'Hash map optimization',
            'Time and space complexity analysis',
            'Edge case handling'
          ],
          timeLimit: levelComplexity === 'basic' ? 1200 : levelComplexity === 'intermediate' ? 900 : 600
        },
        {
          id: 2,
          type: 'technical',
          category: 'System Design',
          question: `Design a ${levelComplexity === 'basic' ? 'simple URL shortener' : levelComplexity === 'intermediate' ? 'scalable URL shortener like bit.ly' : 'distributed URL shortener handling billions of requests'} for ${company}. Consider ${levelComplexity === 'basic' ? 'basic functionality' : levelComplexity === 'intermediate' ? 'scalability and caching' : 'global distribution and consistency'}.`,
          followUp: [
            'How would you handle custom URLs?',
            'What about analytics and tracking?',
            'How would you ensure high availability?'
          ],
          expectedPoints: [
            'Database design',
            'API design',
            'Caching strategy',
            'Scalability considerations'
          ],
          timeLimit: levelComplexity === 'basic' ? 1800 : 2400
        }
      ];
    } else if (type === 'behavioral') {
      return [
        {
          id: 1,
          type: 'behavioral',
          question: `Tell me about a time when you had to work with a difficult team member. How did you handle the situation, especially considering ${company}'s collaborative culture and your role as a ${level.split(' ')[0].toLowerCase()} level professional?`,
          followUp: [
            'What was the outcome?',
            'What would you do differently?',
            'How did this experience change your approach to teamwork?'
          ],
          expectedPoints: [
            'Specific situation description (STAR method)',
            'Actions taken to resolve conflict',
            'Results and lessons learned',
            'Demonstration of emotional intelligence'
          ],
          timeLimit: 600
        },
        {
          id: 2,
          type: 'behavioral',
          question: `Describe a project where you had to learn a new technology quickly to meet a deadline. How did you approach the learning process, and how does this relate to ${company}'s fast-paced environment?`,
          followUp: [
            'What challenges did you face?',
            'How did you ensure code quality while learning?',
            'How do you stay updated with new technologies?'
          ],
          expectedPoints: [
            'Learning methodology and time management',
            'Quality assurance while learning',
            'Adaptability and continuous learning mindset',
            'Impact on project success'
          ],
          timeLimit: 600
        },
        {
          id: 3,
          type: 'behavioral',
          question: `Give me an example of when you had to make a difficult technical decision with limited information. How did you approach it, and what was the outcome?`,
          followUp: [
            'How did you gather additional information?',
            'Who did you consult with?',
            'What would you do differently now?'
          ],
          expectedPoints: [
            'Decision-making process',
            'Risk assessment and mitigation',
            'Stakeholder communication',
            'Learning from outcomes'
          ],
          timeLimit: 600
        }
      ];
    } else { // system-design
      return [
        {
          id: 1,
          type: 'system-design',
          question: `Design a ${levelComplexity === 'basic' ? 'chat application' : levelComplexity === 'intermediate' ? 'real-time messaging system like WhatsApp' : 'globally distributed messaging platform'} that can handle ${levelComplexity === 'basic' ? 'thousands' : levelComplexity === 'intermediate' ? 'millions' : 'billions'} of users. Consider ${company}'s scale and requirements.`,
          followUp: [
            'How would you handle message ordering?',
            'What about offline message delivery?',
            'How would you implement group chats?',
            'What are your database choices and why?',
            'How would you handle media files?'
          ],
          expectedPoints: [
            'High-level architecture design',
            'Database design and choices',
            'Message delivery guarantees',
            'Scalability and performance considerations',
            'Security and privacy measures'
          ],
          timeLimit: 2700
        }
      ];
    }
  };

  const startInterview = () => {
    setInterviewStarted(true);
    setIsRecording(true);
    setStartTime(new Date());
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
    
    const endTime = new Date();
    const duration = startTime ? Math.round((endTime.getTime() - startTime.getTime()) / 60000) : 45;
    
    // Navigate to results page with interview data
    navigate('/interview-results', {
      state: {
        interview,
        responses: newResponses,
        type,
        company,
        experienceLevel,
        duration,
        questionsAnswered: newResponses.filter(r => r.trim().length > 0).length
      }
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getInterviewIcon = () => {
    switch (type) {
      case 'technical': return Code;
      case 'behavioral': return Users;
      case 'system-design': return Layers;
      default: return MessageSquare;
    }
  };

  const getInterviewColor = () => {
    switch (type) {
      case 'technical': return 'from-rose-400/80 to-rose-500/80';
      case 'behavioral': return 'from-indigo-400/80 to-indigo-500/80';
      case 'system-design': return 'from-rose-400/80 to-indigo-400/80';
      default: return 'from-gray-400/80 to-gray-500/80';
    }
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
  const InterviewIcon = getInterviewIcon();

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
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${getInterviewColor()} rounded-lg flex items-center justify-center shadow-md`}>
                <InterviewIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-gray-800 mb-1">
                  {interview.type.charAt(0).toUpperCase() + interview.type.slice(1)} Interview
                </h1>
                <p className="text-gray-600 font-sans">{interview.company} • {interview.experienceLevel}</p>
              </div>
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
              <div className={`w-16 h-16 bg-gradient-to-r ${getInterviewColor()} rounded-lg flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                <InterviewIcon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-4">Ready to Start Your {type.charAt(0).toUpperCase() + type.slice(1)} Interview?</h2>
              <p className="text-gray-600 font-sans mb-6 leading-relaxed">
                This {interview.type} interview will consist of {interview.questions.length} questions. 
                Make sure your microphone and camera are working properly.
              </p>
              
              {/* Interview Type Specific Instructions */}
              <div className="bg-indigo-50/80 p-6 rounded-lg border border-indigo-200/60 mb-8">
                <h3 className="font-heading font-semibold text-gray-800 mb-3">Interview Guidelines</h3>
                {type === 'technical' && (
                  <div className="text-sm text-gray-700 font-sans space-y-2">
                    <p>• Think out loud while solving problems</p>
                    <p>• Ask clarifying questions before coding</p>
                    <p>• Discuss time and space complexity</p>
                    <p>• Test your solution with examples</p>
                  </div>
                )}
                {type === 'behavioral' && (
                  <div className="text-sm text-gray-700 font-sans space-y-2">
                    <p>• Use the STAR method (Situation, Task, Action, Result)</p>
                    <p>• Provide specific examples from your experience</p>
                    <p>• Focus on your role and contributions</p>
                    <p>• Highlight lessons learned and growth</p>
                  </div>
                )}
                {type === 'system-design' && (
                  <div className="text-sm text-gray-700 font-sans space-y-2">
                    <p>• Start with requirements gathering</p>
                    <p>• Design high-level architecture first</p>
                    <p>• Discuss trade-offs and alternatives</p>
                    <p>• Consider scalability and reliability</p>
                  </div>
                )}
              </div>
              
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
                className={`bg-gradient-to-r ${getInterviewColor()} text-slate-800 px-8 py-4 rounded-lg font-sans font-semibold hover:shadow-lg transition-all duration-200 shadow-md text-lg`}
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
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 bg-gradient-to-r ${getInterviewColor()} text-slate-800 rounded-full text-sm font-sans font-medium`}>
                      {currentQ?.type.charAt(0).toUpperCase() + currentQ?.type.slice(1)}
                    </span>
                    {currentQ?.category && (
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-sans font-medium">
                        {currentQ.category}
                      </span>
                    )}
                  </div>
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
                    rows={type === 'system-design' ? 12 : 8}
                    className="w-full px-4 py-3 border border-rose-200/60 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent resize-none font-sans"
                    placeholder={
                      type === 'technical' 
                        ? "Explain your approach and write your solution here..."
                        : type === 'behavioral'
                        ? "Use the STAR method to structure your response..."
                        : "Start with requirements and design your system architecture..."
                    }
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
                    className={`bg-gradient-to-r ${getInterviewColor()} text-slate-800 px-6 py-3 rounded-lg font-sans font-medium hover:shadow-lg transition-all duration-200 shadow-md`}
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

              {/* Interview Tips */}
              <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
                <h3 className="font-heading font-semibold text-gray-800 mb-4">Tips</h3>
                <div className="space-y-3 text-sm text-gray-600 font-sans">
                  {type === 'technical' && (
                    <>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-rose-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p>Explain your thought process clearly</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-rose-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p>Start with a brute force solution</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-rose-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p>Optimize step by step</p>
                      </div>
                    </>
                  )}
                  {type === 'behavioral' && (
                    <>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-rose-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p>Be specific with examples</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-rose-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p>Focus on your contributions</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-rose-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p>Highlight lessons learned</p>
                      </div>
                    </>
                  )}
                  {type === 'system-design' && (
                    <>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-rose-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p>Clarify requirements first</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-rose-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p>Start with high-level design</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-rose-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p>Discuss trade-offs</p>
                      </div>
                    </>
                  )}
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