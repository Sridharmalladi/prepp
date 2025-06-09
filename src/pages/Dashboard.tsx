import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Brain, Target, TrendingUp, Calendar, Award, Clock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      icon: Code,
      title: 'Problems Solved',
      value: '47',
      change: '+12 this week',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: 'Mock Interviews',
      value: '8',
      change: '+3 this month',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Skill Score',
      value: '85%',
      change: '+5% improvement',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: TrendingUp,
      title: 'Streak',
      value: '12 days',
      change: 'Keep it up!',
      color: 'from-orange-500 to-red-500'
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your progress and continue your interview preparation journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 mb-2">{stat.title}</div>
                <div className="text-sm text-green-600 font-medium">{stat.change}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <Link
                  to="/coding"
                  className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg hover:from-blue-100 hover:to-cyan-100 transition-all duration-200 group"
                >
                  <Code className="h-8 w-8 text-blue-600 mr-4" />
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-blue-600">Practice Coding</div>
                    <div className="text-sm text-gray-600">Solve algorithmic problems</div>
                  </div>
                </Link>
                
                <Link
                  to="/interview"
                  className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all duration-200 group"
                >
                  <Brain className="h-8 w-8 text-purple-600 mr-4" />
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-purple-600">Mock Interview</div>
                    <div className="text-sm text-gray-600">Practice with AI interviewer</div>
                  </div>
                </Link>
                
                <Link
                  to="/profile"
                  className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-all duration-200 group"
                >
                  <Target className="h-8 w-8 text-green-600 mr-4" />
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-green-600">View Progress</div>
                    <div className="text-sm text-gray-600">Check your skill development</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 mr-4">
                      {activity.type === 'coding' ? (
                        <Code className="h-6 w-6 text-blue-600" />
                      ) : (
                        <Brain className="h-6 w-6 text-purple-600" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium text-gray-900">{activity.title}</div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {activity.time}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {activity.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-orange-400 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Tasks</h2>
              <div className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{task.title}</div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {task.dueDate}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'high' 
                        ? 'bg-red-100 text-red-800'
                        : task.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {task.priority.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;