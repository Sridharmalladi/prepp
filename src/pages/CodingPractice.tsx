import React, { useState } from 'react';
import { Code, Play, CheckCircle, Clock, Star, Filter, Search } from 'lucide-react';

const CodingPractice = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const problems = [
    {
      id: 1,
      title: 'Two Sum',
      difficulty: 'Easy',
      category: 'Array',
      description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
      solved: true,
      attempts: 3,
      successRate: 85,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    },
    {
      id: 2,
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium',
      category: 'String',
      description: 'Given a string, find the length of the longest substring without repeating characters.',
      solved: false,
      attempts: 1,
      successRate: 65,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(min(m,n))'
    },
    {
      id: 3,
      title: 'Median of Two Sorted Arrays',
      difficulty: 'Hard',
      category: 'Binary Search',
      description: 'Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays.',
      solved: false,
      attempts: 0,
      successRate: 35,
      timeComplexity: 'O(log(m+n))',
      spaceComplexity: 'O(1)'
    },
    {
      id: 4,
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      category: 'Stack',
      description: 'Given a string containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
      solved: true,
      attempts: 2,
      successRate: 78,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    },
    {
      id: 5,
      title: 'Binary Tree Inorder Traversal',
      difficulty: 'Medium',
      category: 'Tree',
      description: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values.',
      solved: false,
      attempts: 2,
      successRate: 72,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    }
  ];

  const categories = ['all', 'Array', 'String', 'Binary Search', 'Stack', 'Tree', 'Dynamic Programming'];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  const filteredProblems = problems.filter(problem => {
    const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'all' || problem.category === selectedCategory;
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDifficulty && matchesCategory && matchesSearch;
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
    <div className="min-h-screen bg-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-800 mb-2">Coding Practice</h1>
          <p className="text-gray-600 font-sans">Sharpen your coding skills with our curated problem sets</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-rose-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-heading font-bold text-gray-800">47</div>
                <div className="text-sm text-gray-600 font-sans">Problems Solved</div>
              </div>
              <CheckCircle className="h-8 w-8 text-rose-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-rose-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-heading font-bold text-gray-800">156</div>
                <div className="text-sm text-gray-600 font-sans">Total Attempts</div>
              </div>
              <Play className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-rose-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-heading font-bold text-gray-800">78%</div>
                <div className="text-sm text-gray-600 font-sans">Success Rate</div>
              </div>
              <Star className="h-8 w-8 text-rose-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-rose-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-heading font-bold text-gray-800">12</div>
                <div className="text-sm text-gray-600 font-sans">Day Streak</div>
              </div>
              <Clock className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-rose-200">
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
                  className="w-full pl-10 pr-4 py-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent font-sans"
                />
              </div>
            </div>
            
            {/* Difficulty Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="border border-rose-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-400 focus:border-transparent font-sans"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'all' ? 'All Difficulties' : difficulty}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-rose-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-400 focus:border-transparent font-sans"
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
            <div key={problem.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-rose-200 hover:border-rose-300">
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
                    <div>Time: {problem.timeComplexity}</div>
                    <div>Space: {problem.spaceComplexity}</div>
                  </div>
                </div>
                
                <div className="mt-4 lg:mt-0 lg:ml-6">
                  <button className="bg-gradient-to-r from-rose-400 to-indigo-400 text-slate-800 px-6 py-3 rounded-lg font-sans font-medium hover:from-rose-500 hover:to-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2">
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
            <p className="text-gray-600 font-sans">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodingPractice;