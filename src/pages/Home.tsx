import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Play, FileText, Clock, User, Briefcase } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobDescription: '',
    interviewType: 'behavioral',
    duration: 'medium',
    resume: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStartInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call to /api/interview/initialize
      const response = await fetch('/api/interview/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Store interview data and navigate to interview room
        localStorage.setItem('currentInterview', JSON.stringify(data));
        navigate(`/interview/${data.room_name}`);
      } else {
        // For demo purposes, simulate successful response
        const mockData = {
          interview_id: `int_${Date.now()}`,
          room_name: `room_${Math.random().toString(36).substr(2, 9)}`,
          status: 'initialized'
        };
        localStorage.setItem('currentInterview', JSON.stringify(mockData));
        navigate(`/interview/${mockData.room_name}`);
      }
    } catch (error) {
      // For demo purposes, simulate successful response
      const mockData = {
        interview_id: `int_${Date.now()}`,
        room_name: `room_${Math.random().toString(36).substr(2, 9)}`,
        status: 'initialized'
      };
      localStorage.setItem('currentInterview', JSON.stringify(mockData));
      navigate(`/interview/${mockData.room_name}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl">
              <MessageSquare className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI-Powered Interview
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Practice Platform
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized interview practice with AI feedback tailored to your specific job requirements and experience level.
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleStartInterview} className="space-y-8">
            {/* Job Description */}
            <div>
              <label htmlFor="jobDescription" className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
                Job Description
              </label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Paste the job description here. Include key requirements, responsibilities, and qualifications..."
                required
              />
            </div>

            {/* Interview Type and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="interviewType" className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                  <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                  Interview Type
                </label>
                <select
                  id="interviewType"
                  name="interviewType"
                  value={formData.interviewType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="behavioral">Behavioral Interview</option>
                  <option value="technical">Technical Interview</option>
                </select>
                <p className="text-sm text-gray-600 mt-2">
                  {formData.interviewType === 'behavioral' 
                    ? 'Focus on situational questions and soft skills'
                    : 'Focus on technical knowledge and problem-solving'
                  }
                </p>
              </div>

              <div>
                <label htmlFor="duration" className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                  <Clock className="h-5 w-5 mr-2 text-green-600" />
                  Duration
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="short">Short (15-20 minutes)</option>
                  <option value="medium">Medium (30-45 minutes)</option>
                  <option value="long">Long (60+ minutes)</option>
                </select>
                <p className="text-sm text-gray-600 mt-2">
                  {formData.duration === 'short' && 'Quick practice session with 3-5 questions'}
                  {formData.duration === 'medium' && 'Standard interview with 6-10 questions'}
                  {formData.duration === 'long' && 'Comprehensive interview with 10+ questions'}
                </p>
              </div>
            </div>

            {/* Resume */}
            <div>
              <label htmlFor="resume" className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                <User className="h-5 w-5 mr-2 text-orange-600" />
                Resume / Background
              </label>
              <textarea
                id="resume"
                name="resume"
                value={formData.resume}
                onChange={handleInputChange}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Paste your resume or provide a summary of your background, experience, and key achievements..."
                required
              />
            </div>

            {/* Start Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Initializing Interview...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-6 w-6" />
                    <span>Start Interview</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Questions</h3>
            <p className="text-gray-600">Dynamic questions tailored to your specific job and experience level</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Feedback</h3>
            <p className="text-gray-600">Comprehensive analysis of your responses with improvement suggestions</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Duration</h3>
            <p className="text-gray-600">Choose from quick practice sessions to full-length interviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;