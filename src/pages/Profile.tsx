import React from 'react';
import { User, Mail, Calendar, Award, TrendingUp, Target, Code, Brain } from 'lucide-react';

const Profile = () => {
  const skillsData = [
    { name: 'Data Structures', level: 85, color: 'bg-blue-600' },
    { name: 'Algorithms', level: 78, color: 'bg-green-600' },
    { name: 'System Design', level: 65, color: 'bg-purple-600' },
    { name: 'Problem Solving', level: 92, color: 'bg-yellow-600' },
    { name: 'Communication', level: 88, color: 'bg-pink-600' },
    { name: 'Code Quality', level: 75, color: 'bg-indigo-600' }
  ];

  const achievements = [
    {
      title: 'Problem Solver',
      description: 'Solved 50+ coding problems',
      icon: Code,
      earned: true,
      date: '2 weeks ago'
    },
    {
      title: 'Interview Master',
      description: 'Completed 10 mock interviews',
      icon: Brain,
      earned: true,
      date: '1 week ago'
    },
    {
      title: 'Streak Champion',
      description: 'Maintained 30-day streak',
      icon: TrendingUp,
      earned: false,
      progress: 40
    },
    {
      title: 'Perfect Score',
      description: 'Achieved 100% in an interview',
      icon: Target,
      earned: false,
      progress: 85
    }
  ];

  const activityData = [
    { month: 'Jan', problems: 12, interviews: 2 },
    { month: 'Feb', problems: 18, interviews: 3 },
    { month: 'Mar', problems: 25, interviews: 4 },
    { month: 'Apr', problems: 31, interviews: 5 },
    { month: 'May', problems: 28, interviews: 3 },
    { month: 'Jun', problems: 35, interviews: 6 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Track your progress and achievements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
                <p className="text-gray-600">Software Engineer</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="h-5 w-5" />
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Calendar className="h-5 w-5" />
                  <span>Joined March 2024</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Target className="h-5 w-5" />
                  <span>Target: Senior SWE</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                Edit Profile
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Problems Solved</span>
                  <span className="font-semibold text-gray-900">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mock Interviews</span>
                  <span className="font-semibold text-gray-900">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="font-semibold text-gray-900">12 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Score</span>
                  <span className="font-semibold text-gray-900">85%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills Progress */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Skills Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillsData.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${skill.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        achievement.earned
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          achievement.earned
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-400 text-white'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                      {achievement.earned ? (
                        <div className="text-sm text-green-600 font-medium">
                          Earned {achievement.date}
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="text-gray-600">{achievement.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${achievement.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Activity Chart */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Activity Overview</h3>
              <div className="space-y-4">
                {activityData.map((data, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm text-gray-600 font-medium">{data.month}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Code className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">Problems: {data.problems}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(data.problems / 40) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Brain className="h-4 w-4 text-purple-600" />
                        <span className="text-sm text-gray-600">Interviews: {data.interviews}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${(data.interviews / 10) * 100}%` }}
                        ></div>
                      </div>
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

export default Profile;