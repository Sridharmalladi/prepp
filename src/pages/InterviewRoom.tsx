import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, MessageSquare, User, Bot, Clock, FileText } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

const InterviewRoom = () => {
  const { roomName } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [interviewData, setInterviewData] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load interview data from localStorage
    const storedInterview = localStorage.getItem('currentInterview');
    if (storedInterview) {
      const data = JSON.parse(storedInterview);
      setInterviewData(data);
      
      // Initialize with system message
      const systemMessage: Message = {
        id: 'system-intro',
        role: 'system',
        content: `Welcome to your ${data.interviewType || 'behavioral'} interview practice session! I'm your AI interviewer, and I'll be asking you questions based on the job description and your background. Please respond naturally and take your time to think through your answers. Let's begin!`,
        timestamp: new Date()
      };
      
      const firstQuestion: Message = {
        id: 'first-question',
        role: 'assistant',
        content: "Let's start with a simple question: Can you tell me a bit about yourself and what interests you about this role?",
        timestamp: new Date()
      };
      
      setMessages([systemMessage, firstQuestion]);
    } else {
      // Redirect to home if no interview data
      navigate('/');
    }
  }, [roomName, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      // Simulate API call to /api/interview/<room_name>/log
      const response = await fetch(`/api/interview/${roomName}/log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          role: 'user'
        }),
      });

      // Simulate AI response
      setTimeout(() => {
        const aiResponses = [
          "That's a great answer! Can you give me a specific example of a time when you had to overcome a significant challenge at work?",
          "Interesting perspective. How do you typically handle situations where you disagree with a team member or supervisor?",
          "I appreciate the detail in your response. Tell me about a project you're particularly proud of and what made it successful.",
          "Good insight. What would you say is your greatest strength, and how has it helped you in your career?",
          "Thank you for sharing that. Can you describe a time when you had to learn something completely new for a project?",
          "That's valuable experience. How do you prioritize your tasks when you have multiple deadlines approaching?",
          "Excellent example. What motivates you most in your work, and how do you stay engaged during challenging periods?"
        ];

        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: randomResponse,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  const handleEndInterview = () => {
    if (interviewData?.interview_id) {
      navigate(`/feedback/${interviewData.interview_id}`);
    }
  };

  const getMessageIcon = (role: string) => {
    switch (role) {
      case 'user':
        return <User className="h-5 w-5" />;
      case 'assistant':
        return <Bot className="h-5 w-5" />;
      case 'system':
        return <MessageSquare className="h-5 w-5" />;
      default:
        return <MessageSquare className="h-5 w-5" />;
    }
  };

  const getMessageStyle = (role: string) => {
    switch (role) {
      case 'user':
        return 'bg-blue-600 text-white ml-auto';
      case 'assistant':
        return 'bg-white text-gray-900 border border-gray-200';
      case 'system':
        return 'bg-yellow-50 text-yellow-800 border border-yellow-200 mx-auto';
      default:
        return 'bg-gray-100 text-gray-900';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Interview Session</h1>
              <p className="text-sm text-gray-600">Room: {roomName}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{messages.filter(m => m.role === 'assistant').length} questions asked</span>
            </div>
            <button
              onClick={handleEndInterview}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>End Interview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : message.role === 'system' ? 'justify-center' : 'justify-start'}`}
            >
              <div className={`max-w-3xl p-4 rounded-lg shadow-sm ${getMessageStyle(message.role)}`}>
                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 ${message.role === 'user' ? 'order-2' : ''}`}>
                    {getMessageIcon(message.role)}
                  </div>
                  <div className={`flex-1 ${message.role === 'user' ? 'order-1 text-right' : ''}`}>
                    <div className="text-sm font-medium mb-1 capitalize">
                      {message.role === 'assistant' ? 'AI Interviewer' : message.role}
                    </div>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </div>
                    <div className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm max-w-3xl">
                <div className="flex items-center space-x-3">
                  <Bot className="h-5 w-5" />
                  <div>
                    <div className="text-sm font-medium mb-1">AI Interviewer</div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <div className="flex-1">
              <textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type your response here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!currentMessage.trim() || isLoading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="h-5 w-5" />
              <span>Send</span>
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2">Press Enter to send, Shift+Enter for new line</p>
        </div>
      </div>
    </div>
  );
};

export default InterviewRoom;