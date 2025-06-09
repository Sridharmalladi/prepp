import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface InterviewStatus {
  interview_id: string;
  room_name: string;
  status: 'initialized' | 'in_progress' | 'completed' | 'ended';
  current_question: string;
  total_questions_asked: number;
  feedback_available: boolean;
  created_at: string;
  last_activity: string;
}

interface InterviewContext {
  room_name: string;
  current_question: string;
  question_number: number;
  total_questions: number;
  interview_type: string;
  duration: string;
  participant_count: number;
}

const StatusViewer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'interview_id' | 'room_name'>('interview_id');
  const [status, setStatus] = useState<InterviewStatus | null>(null);
  const [context, setContext] = useState<InterviewContext | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError(null);
    setStatus(null);
    setContext(null);

    try {
      if (searchType === 'interview_id') {
        // Fetch interview status
        const statusResponse = await fetch(`/api/interview/${searchTerm}/status`);
        if (statusResponse.ok) {
          const statusData = await statusResponse.json();
          setStatus(statusData);
        } else {
          // Mock data for demo
          const mockStatus: InterviewStatus = {
            interview_id: searchTerm,
            room_name: `room_${Math.random().toString(36).substr(2, 9)}`,
            status: 'in_progress',
            current_question: "Can you tell me about a time when you had to work with a difficult team member?",
            total_questions_asked: 5,
            feedback_available: false,
            created_at: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
            last_activity: new Date(Date.now() - 300000).toISOString() // 5 minutes ago
          };
          setStatus(mockStatus);
        }
      } else {
        // Fetch interview context
        const contextResponse = await fetch(`/api/interview/context/${searchTerm}`);
        if (contextResponse.ok) {
          const contextData = await contextResponse.json();
          setContext(contextData);
        } else {
          // Mock data for demo
          const mockContext: InterviewContext = {
            room_name: searchTerm,
            current_question: "What's your approach to handling tight deadlines and multiple priorities?",
            question_number: 7,
            total_questions: 12,
            interview_type: 'behavioral',
            duration: 'medium',
            participant_count: 1
          };
          setContext(mockContext);
        }
      }
    } catch (err) {
      setError('Failed to fetch data. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'initialized':
        return 'text-blue-600 bg-blue-100';
      case 'in_progress':
        return 'text-green-600 bg-green-100';
      case 'completed':
        return 'text-purple-600 bg-purple-100';
      case 'ended':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'initialized':
        return <Clock className="h-5 w-5" />;
      case 'in_progress':
        return <MessageSquare className="h-5 w-5" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5" />;
      case 'ended':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Status Viewer</h1>
          <p className="text-gray-600">Monitor interview progress and context in real-time</p>
        </div>

        {/* Search Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-2">
                  Search Term
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="searchTerm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={searchType === 'interview_id' ? 'Enter Interview ID' : 'Enter Room Name'}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="sm:w-48">
                <label htmlFor="searchType" className="block text-sm font-medium text-gray-700 mb-2">
                  Search By
                </label>
                <select
                  id="searchType"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value as 'interview_id' | 'room_name')}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="interview_id">Interview ID</option>
                  <option value="room_name">Room Name</option>
                </select>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-red-800">{error}</span>
            </div>
          </div>
        )}

        {/* Interview Status */}
        {status && (
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Interview Status</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Interview ID</label>
                  <p className="text-lg font-mono text-gray-900">{status.interview_id}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Room Name</label>
                  <p className="text-lg font-mono text-gray-900">{status.room_name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status.status)}`}>
                    {getStatusIcon(status.status)}
                    <span className="capitalize">{status.status.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Questions Asked</label>
                  <p className="text-lg text-gray-900">{status.total_questions_asked}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Feedback Available</label>
                  <p className="text-lg text-gray-900">{status.feedback_available ? 'Yes' : 'No'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Last Activity</label>
                  <p className="text-lg text-gray-900">{new Date(status.last_activity).toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            {status.current_question && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <label className="text-sm font-medium text-blue-800">Current Question</label>
                <p className="text-blue-900 mt-1">{status.current_question}</p>
              </div>
            )}
          </div>
        )}

        {/* Interview Context */}
        {context && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Interview Context</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Room Name</label>
                  <p className="text-lg font-mono text-gray-900">{context.room_name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Interview Type</label>
                  <p className="text-lg text-gray-900 capitalize">{context.interview_type}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Duration</label>
                  <p className="text-lg text-gray-900 capitalize">{context.duration}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Progress</label>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(context.question_number / context.total_questions) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      {context.question_number}/{context.total_questions}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Participants</label>
                  <p className="text-lg text-gray-900">{context.participant_count}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <label className="text-sm font-medium text-green-800">Current Question</label>
              <p className="text-green-900 mt-1">{context.current_question}</p>
            </div>
          </div>
        )}

        {/* No Results */}
        {!isLoading && !error && !status && !context && searchTerm && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try searching with a different Interview ID or Room Name</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusViewer;