import React from 'react';
import { Code, Brain, Target, TrendingUp, Calendar, Award, Clock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      icon: Code,
      title: 'Problems Solved',
      value: '47',
      change: '+12 this week',
      color: 'from-rose-400 to-rose-500'
    },
    {
      icon: Brain,
      title: 'Mock Interviews',
      value: '8',
      change: '+3 this month',
      color: 'from-indigo-400 to-indigo-500'
    },
    {
      icon: Target,
      title: 'Skill Score',
      value: '85%',
      change: '+5% improvement',
      color: 'from-rose-400 to-rose-500'
    },
    {
      icon: TrendingUp,
      title: 'Streak',
      value: '12 days',
      change: 'Keep it up!',
      color: 'from-indigo-400 to-indigo-500'
    }
  ];

  const recentActivity = [
    {
      type: 'coding',
      title: 'Completed "Two Sum" problem',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      type: 'interview',
      title: 'Mock Interview - System Design',
      time: '1 day ago',
      status: 'completed'
    },
    {
      type: 'coding',
      title: 'Started "Binary Tree Traversal"',
      time: '2 days ago',
      status: 'in-progress'
    },
    {
      type: 'interview',
      title: 'Behavioral Interview Practice',
      time: '3 days ago',
      status: 'completed'
    }
  ];

  const upcomingTasks = [
    {
      title: 'Complete Array Problems Set',
      dueDate: 'Today',
      priority: 'high'
    },
    {
      title: 'System Design Mock Interview',
      dueDate: 'Tomorrow',
      priority: 'medium'
    },
    {
      title: 'Review Data Structures',
      dueDate: 'This Week',
      priority: 'low'
    }
  ];

  return (
    <div className="min-h-screen bg-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-semibold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-2 font-sans">Track your progress and continue your interview preparation journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-rose-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center shadow-md`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-2xl font-heading font-semibold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 mb-2 font-sans">{stat.title}</div>
                <div className="text-sm text-rose-600 font-sans font-medium">{stat.change}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-rose-200">
            <h2 className="text-xl font-heading font-medium text-gray-800 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center p-4 bg-rose-50 rounded-lg border border-rose-200">
                  <div className="flex-shrink-0 mr-4">
                    {activity.type === 'coding' ? (
                      <Code className="h-6 w-6 text-rose-600" />
                    ) : (
                      <Brain className="h-6 w-6 text-indigo-600" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="font-sans font-medium text-gray-800">{activity.title}</div>
                    <div className="text-sm text-gray-600 font-sans flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {activity.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-rose-600" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-indigo-400 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-rose-200">
            <h2 className="text-xl font-heading font-medium text-gray-800 mb-6">Upcoming Tasks</h2>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-rose-50 rounded-lg border border-rose-200">
                  <div>
                    <div className="font-sans font-medium text-gray-800">{task.title}</div>
                    <div className="text-sm text-gray-600 font-sans flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {task.dueDate}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-sans font-medium ${
                    task.priority === 'high' 
                      ? 'bg-rose-100 text-rose-700'
                      : task.priority === 'medium'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}>
                    {task.priority.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-rose-200">
          <h2 className="text-xl font-heading font-medium text-gray-800 mb-6">Performance Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between text-sm mb-2 font-sans">
                <span className="text-gray-600">Problem Solving</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="w-full bg-rose-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-rose-400 to-rose-500 h-3 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2 font-sans">
                <span className="text-gray-600">Communication</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="w-full bg-rose-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-indigo-400 to-indigo-500 h-3 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2 font-sans">
                <span className="text-gray-600">Code Quality</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="w-full bg-rose-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-rose-400 to-rose-500 h-3 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;