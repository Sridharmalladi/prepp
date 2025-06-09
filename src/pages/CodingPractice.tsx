import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Play, CheckCircle, Clock, Star, Filter, Search, Sparkles, TrendingUp, Target, Calendar } from 'lucide-react';

interface Problem {
  id: string;
  title: string;
  difficulty: string;
  category: string;
  description: string;
  solved: boolean;
  attempts: number;
  lastAttempted?: string;
  solvedAt?: string;
  timeSpent?: number;
  successRate: number;
}

interface UserStats {
  totalSolved: number;
  totalAttempts: number;
  successRate: number;
  currentStreak: number;
  lastActiveDate: string;
  problemsByDifficulty: {
    Easy: number;
    Medium: number;
    Hard: number;
  };
  problemsByCategory: Record<string, number>;
}

const CodingPractice = () => {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    totalSolved: 0,
    totalAttempts: 0,
    successRate: 0,
    currentStreak: 0,
    lastActiveDate: '',
    problemsByDifficulty: { Easy: 0, Medium: 0, Hard: 0 },
    problemsByCategory: {}
  });

  const problemTypes = ['all', 'Algorithm', 'Data Structure', 'Dynamic Programming', 'Graph', 'Tree', 'Array', 'String', 'Math'];
  const categories = ['all', 'Array', 'String', 'Binary Search', 'Stack', 'Tree', 'Dynamic Programming', 'Graph', 'Linked List', 'Hash Table', 'Sorting', 'Greedy', 'Backtracking'];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    // Load problems from localStorage
    const savedProblems = localStorage.getItem('codingProblems');
    if (savedProblems) {
      const parsedProblems = JSON.parse(savedProblems);
      setProblems(parsedProblems);
      calculateStats(parsedProblems);
    } else {
      // Initialize with some default problems
      const defaultProblems: Problem[] = [
        {
          id: '1',
          title: 'Two Sum',
          difficulty: 'Easy',
          category: 'Array',
          description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
          solved: true,
          attempts: 3,
          successRate: 85,
          solvedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          timeSpent: 25
        },
        {
          id: '2',
          title: 'Valid Parentheses',
          difficulty: 'Easy',
          category: 'Stack',
          description: 'Given a string containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
          solved: true,
          attempts: 2,
          successRate: 78,
          solvedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          timeSpent: 18
        }
      ];
      setProblems(defaultProblems);
      calculateStats(defaultProblems);
    }
  };

  const calculateStats = (problemList: Problem[]) => {
    const solved = problemList.filter(p => p.solved);
    const totalAttempts = problemList.reduce((sum, p) => sum + p.attempts, 0);
    const successRate = totalAttempts > 0 ? Math.round((solved.length / totalAttempts) * 100) : 0;
    
    // Calculate streak
    const sortedSolved = solved
      .filter(p => p.solvedAt)
      .sort((a, b) => new Date(b.solvedAt!).getTime() - new Date(a.solvedAt!).getTime());
    
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    for (const problem of sortedSolved) {
      const solvedDate = new Date(problem.solvedAt!);
      solvedDate.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((currentDate.getTime() - solvedDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
      } else if (daysDiff === streak + 1) {
        streak++;
      } else {
        break;
      }
    }

    const problemsByDifficulty = {
      Easy: solved.filter(p => p.difficulty === 'Easy').length,
      Medium: solved.filter(p => p.difficulty === 'Medium').length,
      Hard: solved.filter(p => p.difficulty === 'Hard').length
    };

    const problemsByCategory: Record<string, number> = {};
    solved.forEach(p => {
      problemsByCategory[p.category] = (problemsByCategory[p.category] || 0) + 1;
    });

    setUserStats({
      totalSolved: solved.length,
      totalAttempts,
      successRate,
      currentStreak: streak,
      lastActiveDate: sortedSolved[0]?.solvedAt || '',
      problemsByDifficulty,
      problemsByCategory
    });
  };

  const generateCustomProblem = async () => {
    if (selectedDifficulty === 'all' || selectedCategory === 'all' || selectedType === 'all') {
      alert('Please select specific difficulty, category, and type to generate a custom problem.');
      return;
    }

    setIsGenerating(true);
    
    // Simulate LLM API call
    setTimeout(() => {
      const newProblem: Problem = {
        id: Date.now().toString(),
        title: `${selectedType} Challenge: ${selectedCategory}`,
        difficulty: selectedDifficulty,
        category: selectedCategory,
        description: `A ${selectedDifficulty.toLowerCase()} level ${selectedCategory.toLowerCase()} problem focusing on ${selectedType.toLowerCase()} concepts. This problem is designed to test your understanding and implementation skills.`,
        solved: false,
        attempts: 0,
        successRate: 0
      };

      const updatedProblems = [...problems, newProblem];
      setProblems(updatedProblems);
      localStorage.setItem('codingProblems', JSON.stringify(updatedProblems));
      
      setIsGenerating(false);
      
      // Navigate to problem solver
      navigate('/coding-problem', {
        state: {
          difficulty: selectedDifficulty,
          category: selectedCategory,
          type: selectedType,
          problemData: newProblem,
          isGenerated: true
        }
      });
    }, 2000);
  };

  const updateProblemStats = (problemId: string, solved: boolean, timeSpent: number) => {
    const updatedProblems = problems.map(p => {
      if (p.id === problemId) {
        const newAttempts = p.attempts + 1;
        return {
          ...p,
          attempts: newAttempts,
          solved: solved || p.solved,
          solvedAt: solved ? new Date().toISOString() : p.solvedAt,
          timeSpent: timeSpent,
          successRate: solved ? Math.round((1 / newAttempts) * 100) : p.successRate
        };
      }
      return p;
    });
    
    setProblems(updatedProblems);
    localStorage.setItem('codingProblems', JSON.stringify(updatedProblems));
    calculateStats(updatedProblems);
  };

  const filteredProblems = problems.filter(problem => {
    const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'all' || problem.category === selectedCategory;
    const matchesType = selectedType === 'all' || problem.category === selectedType;
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDifficulty && matchesCategory && matchesType && matchesSearch;
  });

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
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-800 mb-2">Coding Practice</h1>
          <p className="text-gray-600 font-sans">Sharpen your coding skills with AI-generated problems and track your progress</p>
        </div>

        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-heading font-bold text-gray-800">{userStats.totalSolved}</div>
                <div className="text-sm text-gray-600 font-sans">Problems Solved</div>
                <div className="text-xs text-rose-600 font-sans mt-1">
                  E:{userStats.problemsByDifficulty.Easy} M:{userStats.problemsByDifficulty.Medium} H:{userStats.problemsByDifficulty.Hard}
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-rose-600" />
            </div>
          </div>
          
          <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-heading font-bold text-gray-800">{userStats.totalAttempts}</div>
                <div className="text-sm text-gray-600 font-sans">Total Attempts</div>
                <div className="text-xs text-indigo-600 font-sans mt-1">
                  {userStats.successRate}% Success Rate
                </div>
              </div>
              <Play className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          
          <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-heading font-bold text-gray-800">{userStats.currentStreak}</div>
                <div className="text-sm text-gray-600 font-sans">Day Streak</div>
                <div className="text-xs text-rose-600 font-sans mt-1">
                  Keep it up! 🔥
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-rose-600" />
            </div>
          </div>
          
          <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-rose-200/60">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-heading font-bold text-gray-800">{Object.keys(userStats.problemsByCategory).length}</div>
                <div className="text-sm text-gray-600 font-sans">Categories</div>
                <div className="text-xs text-indigo-600 font-sans mt-1">
                  Explored
                </div>
              </div>
              <Target className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Problem Generator */}
        <div className="bg-white/90 p-6 rounded-xl shadow-lg mb-8 border border-rose-200/60">
          <h2 className="text-xl font-heading font-semibold text-gray-800 mb-6 flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-rose-600" />
            Generate Custom Problems
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-sans font-medium text-gray-700 mb-2">Problem Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full border border-rose-200/60 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-400 focus:border-transparent font-sans"
              >
                {problemTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'Select Type' : type}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-sans font-medium text-gray-700 mb-2">Difficulty Level</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full border border-rose-200/60 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-400 focus:border-transparent font-sans"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'all' ? 'Select Difficulty' : difficulty}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-sans font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-rose-200/60 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-400 focus:border-transparent font-sans"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Select Category' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={generateCustomProblem}
            disabled={isGenerating || selectedDifficulty === 'all' || selectedCategory === 'all' || selectedType === 'all'}
            className="w-full bg-gradient-to-r from-rose-400/80 to-indigo-400/80 text-slate-800 px-6 py-3 rounded-lg font-sans font-semibold hover:from-rose-500/80 hover:to-indigo-500/80 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-800"></div>
                <span>Generating Problem...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                <span>Generate Problem</span>
              </>
            )}
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white/90 p-6 rounded-xl shadow-lg mb-8 border border-rose-200/60">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-rose-200/60 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent font-sans"
                />
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="border border-rose-200/60 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-400 focus:border-transparent font-sans"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'all' ? 'All Difficulties' : difficulty}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-rose-200/60 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-400 focus:border-transparent font-sans"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Problems List */}
        <div className="space-y-4">
          {filteredProblems.map((problem) => (
            <div key={problem.id} className="bg-white/90 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-rose-200/60 hover:border-rose-300/80">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-heading font-semibold text-gray-800">{problem.title}</h3>
                    {problem.solved && <CheckCircle className="h-5 w-5 text-rose-600" />}
                    <span className={`px-2 py-1 rounded-full text-xs font-sans font-medium ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-sans font-medium">
                      {problem.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 font-sans">{problem.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-sans">
                    <div>Attempts: {problem.attempts}</div>
                    <div>Success Rate: {problem.successRate}%</div>
                    {problem.timeSpent && <div>Time: {problem.timeSpent}min</div>}
                    {problem.solvedAt && (
                      <div>Solved: {new Date(problem.solvedAt).toLocaleDateString()}</div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 lg:mt-0 lg:ml-6">
                  <button 
                    onClick={() => navigate('/coding-problem', { 
                      state: { 
                        difficulty: problem.difficulty, 
                        category: problem.category,
                        problemData: problem,
                        updateStats: updateProblemStats
                      } 
                    })}
                    className="bg-gradient-to-r from-rose-400/80 to-indigo-400/80 text-slate-800 px-6 py-3 rounded-lg font-sans font-medium hover:from-rose-500/80 hover:to-indigo-500/80 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
                  >
                    <Code className="h-5 w-5" />
                    <span>{problem.solved ? 'Solve Again' : 'Start Solving'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <Code className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-heading font-medium text-gray-800 mb-2">No problems found</h3>
            <p className="text-gray-600 font-sans">Try adjusting your filters or generate a new problem</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodingPractice;