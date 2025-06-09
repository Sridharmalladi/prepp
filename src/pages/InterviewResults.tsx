import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, TrendingUp, MessageSquare, Clock, Award, BarChart3 } from 'lucide-react';

interface ResultData {
  interview: any;
  responses: string[];
  type: string;
  company: string;
  experienceLevel: string;
}

const InterviewResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { interview, responses, type, company, experienceLevel } = location.state as ResultData || {};

  // Simulate AI analysis results
  const analysisResults = {
    overallScore: 85,
    breakdown: {
      communication: 92,
      technicalKnowledge: 78,
      problemSolving: 88,
      culturalFit: 85
    },
    strengths: [
      'Clear and structured communication',
      'Good understanding of system design principles',
      'Effective problem-solving approach',
      'Strong examples from past experience'
    ],
    improvements: [
      'Could provide more specific technical details',
      'Consider discussing trade-offs more thoroughly',
      'Practice explaining complex concepts more simply',
      'Include more quantitative results in examples'
    ],
    feedback: 'Overall strong performance with good technical foundation. Focus on providing more detailed explanations and considering edge cases in your solutions.',
    nextSteps: [
      'Practice system design problems with larger scale',
      'Review advanced algorithms and data structures',
      'Prepare more STAR method examples',
      'Study company-specific technologies and practices'
    ]
  };

  if (!interview) {
    return (
      <div className="min-h-screen bg-orange-50/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-heading font-medium text-gray-800 mb-2">No results available</h3>
            <p className="text-gray-600 font-sans mb-4">Please complete an interview to see your results.</p>
            <button
              onClick={() => navigate('/interview')}
              className="bg-gradient-to-r from-rose-400/80 to-indigo-400/80 text-slate-800 px-6 py-3 rounded-lg font-sans font-medium hover:from-rose-500/80 hover:to-indigo-500/80 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Start New Interview
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-rose-600';
    if (score >= 80) return 'text-indigo-600';
    if (score >= 70) return 'text-rose-500';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 90) return 'from-rose-400/80 to-rose-500/80';
    if (score >= 80) return 'from-indigo-400/80 to-indigo-500/80';
    if (score >= 70) return 'from-rose-400/80 to-indigo-400/80';
    return 'from-red-400/80 to-red-500/80';
  };

  return (
    <div className="min-h-screen bg-orange-50/60 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/interview')}
            className="flex items-center space-x-2 text-gray-600 hover:text-rose-600 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-sans">Back to Interviews</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-heading font-bold text-gray-800 mb-2">Interview Results</h1>
            <p className="text-gray-600 font-sans">
              {type.charAt(0).toUpperCase() + type.slice(1)} Interview - {company} ({experienceLevel})
            </p>
          </div>
        </div>

        {/* Overall Score */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white/90 p-8 rounded-xl shadow-lg border border-rose-200/60 text-center">
            <div className="mb-6">
              <div className={`text-6xl font-heading font-bold ${getScoreColor(analysisResults.overallScore)} mb-2`}>
                {analysisResults.overallScore}%
              </div>
              <h2 className="text-2xl font-heading font-semibold text-gray-800 mb-2">Overall Performance</h2>
              <p className="text-gray-600 font-sans">{analysisResults.feedback}</p>
            </div>
            
            <div className="flex items-center justify-center space-x-2 mb-6">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`h-8 w-8 ${
                    index < Math.floor(analysisResults.overallScore / 20)
                      ? 'text-rose-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={() => navigate('/interview', { state: { type, company, experienceLevel } })}
              className={`bg-gradient-to-r ${getScoreBackground(analysisResults.overallScore)} text-slate-800 px-8 py-3 rounded-lg font-sans font-semibold hover:shadow-lg transition-all duration-200 shadow-md`}
            >
              Retake Interview
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Detailed Breakdown */}
          <div className="space-y-6">
            <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
              <h3 className="text-xl font-heading font-semibold text-gray-800 mb-6">Performance Breakdown</h3>
              <div className="space-y-4">
                {Object.entries(analysisResults.breakdown).map(([category, score]) => (
                  <div key={category}>
                    <div className="flex justify-between mb-2">
                      <span className="font-sans font-medium text-gray-700 capitalize">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className={`font-sans font-semibold ${getScoreColor(score)}`}>{score}%</span>
                    </div>
                    <div className="w-full bg-rose-200/60 rounded-full h-3">
                      <div
                        className={`bg-gradient-to-r ${getScoreBackground(score)} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths */}
            <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
              <h3 className="text-xl font-heading font-semibold text-gray-800 mb-4">Strengths</h3>
              <div className="space-y-3">
                {analysisResults.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <TrendingUp className="h-4 w-4 text-rose-600" />
                    </div>
                    <span className="text-gray-700 font-sans">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
              <h3 className="text-xl font-heading font-semibold text-gray-800 mb-4">Areas for Improvement</h3>
              <div className="space-y-3">
                {analysisResults.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MessageSquare className="h-4 w-4 text-indigo-600" />
                    </div>
                    <span className="text-gray-700 font-sans">{improvement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Question Review & Next Steps */}
          <div className="space-y-6">
            {/* Question Review */}
            <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
              <h3 className="text-xl font-heading font-semibold text-gray-800 mb-4">Question Review</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {interview.questions.map((question: any, index: number) => (
                  <div key={index} className="border border-rose-200/60 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-sans font-medium text-gray-800">Question {index + 1}</span>
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-sans">
                        {question.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 font-sans mb-3">{question.question}</p>
                    <div className="bg-gray-50/80 p-3 rounded border border-gray-200/60">
                      <p className="text-xs text-gray-600 font-sans mb-1">Your Response:</p>
                      <p className="text-sm text-gray-700 font-sans">
                        {responses[index] || 'No response recorded'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
              <h3 className="text-xl font-heading font-semibold text-gray-800 mb-4">Recommended Next Steps</h3>
              <div className="space-y-3">
                {analysisResults.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-indigo-600 font-sans font-semibold text-xs">{index + 1}</span>
                    </div>
                    <span className="text-gray-700 font-sans">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
              <h3 className="text-xl font-heading font-semibold text-gray-800 mb-4">What's Next?</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/coding')}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-rose-400/80 to-indigo-400/80 text-slate-800 py-3 rounded-lg font-sans font-medium hover:from-rose-500/80 hover:to-indigo-500/80 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Award className="h-5 w-5" />
                  <span>Practice Coding Problems</span>
                </button>
                
                <button
                  onClick={() => navigate('/interview')}
                  className="w-full flex items-center justify-center space-x-2 border border-rose-200/60 text-gray-700 py-3 rounded-lg font-sans font-medium hover:bg-rose-50/80 transition-all duration-200"
                >
                  <Clock className="h-5 w-5" />
                  <span>Schedule Another Interview</span>
                </button>
                
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full flex items-center justify-center space-x-2 border border-rose-200/60 text-gray-700 py-3 rounded-lg font-sans font-medium hover:bg-rose-50/80 transition-all duration-200"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>View Dashboard</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewResults;