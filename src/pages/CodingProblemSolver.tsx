import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, RotateCcw, CheckCircle, Clock, Lightbulb, Code } from 'lucide-react';
import Editor from '@monaco-editor/react';

interface ProblemData {
  title: string;
  difficulty: string;
  category: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  hints: string[];
  starterCode: string;
  testCases: Array<{
    input: string;
    expectedOutput: string;
    hidden: boolean;
  }>;
}

const CodingProblemSolver = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [problem, setProblem] = useState<ProblemData | null>(null);

  // Get problem parameters from location state
  const { difficulty, category, company } = location.state || {};

  useEffect(() => {
    if (difficulty && category) {
      generateProblem();
    }
  }, [difficulty, category]);

  const generateProblem = async () => {
    setIsGenerating(true);
    
    // Simulate LLM API call - replace with actual backend integration
    setTimeout(() => {
      const generatedProblem: ProblemData = {
        title: `${category} Challenge: ${difficulty} Level`,
        difficulty,
        category,
        description: `Given an array of integers, solve this ${category.toLowerCase()} problem optimized for ${company || 'tech'} interviews. This problem tests your understanding of ${category.toLowerCase()} concepts and algorithmic thinking.`,
        examples: [
          {
            input: 'nums = [2,7,11,15], target = 9',
            output: '[0,1]',
            explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
          },
          {
            input: 'nums = [3,2,4], target = 6',
            output: '[1,2]'
          }
        ],
        constraints: [
          '2 ≤ nums.length ≤ 10⁴',
          '-10⁹ ≤ nums[i] ≤ 10⁹',
          '-10⁹ ≤ target ≤ 10⁹',
          'Only one valid answer exists.'
        ],
        hints: [
          'Think about using a hash map to store values and their indices.',
          'For each element, check if target - element exists in the hash map.',
          'The time complexity can be optimized to O(n).'
        ],
        starterCode: `def solution(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Your code here
    pass`,
        testCases: [
          { input: '[2,7,11,15], 9', expectedOutput: '[0,1]', hidden: false },
          { input: '[3,2,4], 6', expectedOutput: '[1,2]', hidden: false },
          { input: '[3,3], 6', expectedOutput: '[0,1]', hidden: true }
        ]
      };
      
      setProblem(generatedProblem);
      setCode(generatedProblem.starterCode);
      setIsGenerating(false);
    }, 2000);
  };

  const runCode = async () => {
    setIsRunning(true);
    
    // Simulate code execution - replace with actual backend integration
    setTimeout(() => {
      const results = problem?.testCases.map((testCase, index) => ({
        testCase: index + 1,
        input: testCase.input,
        expected: testCase.expectedOutput,
        actual: testCase.expectedOutput, // Simulate success
        passed: true,
        hidden: testCase.hidden
      })) || [];
      
      setTestResults(results);
      setIsRunning(false);
    }, 1500);
  };

  const resetCode = () => {
    if (problem) {
      setCode(problem.starterCode);
      setTestResults([]);
    }
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-orange-50/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-rose-600 mx-auto mb-4"></div>
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-2">Generating Your Problem</h2>
              <p className="text-gray-600 font-sans">Creating a {difficulty} {category} problem tailored for you...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-orange-50/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <Code className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-heading font-medium text-gray-800 mb-2">No problem data available</h3>
            <p className="text-gray-600 font-sans mb-4">Please select a problem from the coding practice page.</p>
            <button
              onClick={() => navigate('/coding')}
              className="bg-gradient-to-r from-rose-400/80 to-indigo-400/80 text-slate-800 px-6 py-3 rounded-lg font-sans font-medium hover:from-rose-500/80 hover:to-indigo-500/80 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Back to Coding Practice
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-rose-600 bg-rose-100';
      case 'Medium': return 'text-indigo-600 bg-indigo-100';
      case 'Hard': return 'text-rose-700 bg-rose-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-orange-50/60 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/coding')}
            className="flex items-center space-x-2 text-gray-600 hover:text-rose-600 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-sans">Back to Problems</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold text-gray-800 mb-2">{problem.title}</h1>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-sans font-medium ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-sans font-medium">
                  {problem.category}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center space-x-2 px-4 py-2 border border-rose-200 rounded-lg hover:bg-rose-50/80 transition-colors duration-200"
              >
                <Lightbulb className="h-4 w-4" />
                <span className="font-sans text-sm">Hints</span>
              </button>
              
              <button
                onClick={resetCode}
                className="flex items-center space-x-2 px-4 py-2 border border-rose-200 rounded-lg hover:bg-rose-50/80 transition-colors duration-200"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="font-sans text-sm">Reset</span>
              </button>
              
              <button
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center space-x-2 bg-gradient-to-r from-rose-400/80 to-indigo-400/80 text-slate-800 px-6 py-2 rounded-lg font-sans font-medium hover:from-rose-500/80 hover:to-indigo-500/80 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
              >
                <Play className="h-4 w-4" />
                <span>{isRunning ? 'Running...' : 'Run Code'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <div className="space-y-6">
            <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
              <h2 className="text-lg font-heading font-semibold text-gray-800 mb-4">Problem Description</h2>
              <p className="text-gray-700 font-sans leading-relaxed mb-6">{problem.description}</p>
              
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-gray-800">Examples:</h3>
                {problem.examples.map((example, index) => (
                  <div key={index} className="bg-gray-50/80 p-4 rounded-lg border border-gray-200/60">
                    <div className="font-sans text-sm">
                      <div className="mb-2">
                        <span className="font-medium">Input:</span> <code className="bg-gray-200/60 px-2 py-1 rounded">{example.input}</code>
                      </div>
                      <div className="mb-2">
                        <span className="font-medium">Output:</span> <code className="bg-gray-200/60 px-2 py-1 rounded">{example.output}</code>
                      </div>
                      {example.explanation && (
                        <div className="text-gray-600">
                          <span className="font-medium">Explanation:</span> {example.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="font-heading font-semibold text-gray-800 mb-3">Constraints:</h3>
                <ul className="space-y-1">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index} className="text-sm text-gray-600 font-sans flex items-start">
                      <span className="w-2 h-2 bg-rose-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <code className="bg-gray-100/80 px-2 py-1 rounded text-xs">{constraint}</code>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Hints */}
            {showHints && (
              <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-gray-800">Hints</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentHint(Math.max(0, currentHint - 1))}
                      disabled={currentHint === 0}
                      className="px-3 py-1 text-sm border border-rose-200 rounded hover:bg-rose-50/80 disabled:opacity-50 font-sans"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-600 font-sans">
                      {currentHint + 1} of {problem.hints.length}
                    </span>
                    <button
                      onClick={() => setCurrentHint(Math.min(problem.hints.length - 1, currentHint + 1))}
                      disabled={currentHint === problem.hints.length - 1}
                      className="px-3 py-1 text-sm border border-rose-200 rounded hover:bg-rose-50/80 disabled:opacity-50 font-sans"
                    >
                      Next
                    </button>
                  </div>
                </div>
                <div className="bg-indigo-50/80 p-4 rounded-lg border border-indigo-200/60">
                  <p className="text-gray-700 font-sans">{problem.hints[currentHint]}</p>
                </div>
              </div>
            )}

            {/* Test Results */}
            {testResults.length > 0 && (
              <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
                <h3 className="font-heading font-semibold text-gray-800 mb-4">Test Results</h3>
                <div className="space-y-3">
                  {testResults.map((result, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        result.passed
                          ? 'bg-rose-50/80 border-rose-200/60'
                          : 'bg-red-50/80 border-red-200/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-sans font-medium">
                          Test Case {result.testCase} {result.hidden && '(Hidden)'}
                        </span>
                        {result.passed ? (
                          <CheckCircle className="h-5 w-5 text-rose-600" />
                        ) : (
                          <Clock className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      {!result.hidden && (
                        <div className="text-sm font-sans text-gray-600">
                          <div>Input: <code className="bg-gray-200/60 px-2 py-1 rounded">{result.input}</code></div>
                          <div>Expected: <code className="bg-gray-200/60 px-2 py-1 rounded">{result.expected}</code></div>
                          <div>Actual: <code className="bg-gray-200/60 px-2 py-1 rounded">{result.actual}</code></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div className="bg-white/90 rounded-xl shadow-lg border border-rose-200/60 overflow-hidden">
            <div className="p-4 border-b border-rose-200/60">
              <h3 className="font-heading font-semibold text-gray-800">Code Editor</h3>
            </div>
            <div className="h-[600px]">
              <Editor
                height="100%"
                defaultLanguage="python"
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-light"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingProblemSolver;