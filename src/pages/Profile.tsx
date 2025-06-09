import React from 'react';
import { User, Mail, Calendar, Award, TrendingUp, Target, Code, Brain } from 'lucide-react';

const Profile = () => {
  const skillsData = [
    { name: 'Data Structures', level: 85, color: 'bg-rose-600' },
    { name: 'Algorithms', level: 78, color: 'bg-indigo-600' },
    { name: 'System Design', level: 65, color: 'bg-rose-600' },
    { name: 'Problem Solving', level: 92, color: 'bg-indigo-600' },
    { name: 'Communication', level: 88, color: 'bg-rose-500' },
    { name: 'Code Quality', level: 75, color: 'bg-indigo-500' }
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
    <div className="min-h-screen bg-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-800 mb-2">Profile</h1>
          <p className="text-gray-600 font-sans">Track your progress and achievements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-rose-200">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-rose-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <User className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-gray-800">John Doe</h2>
                <p className="text-gray-600 font-sans">Software Engineer</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600 font-sans">
                  <Mail className="h-5 w-5" />
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 font-sans">
                  <Calendar className="h-5 w-5" />
                  <span>Joined March 2024</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 font-sans">
                  <Target className="h-5 w-5" />
                  <span>Target: Senior SWE</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-gradient-to-r from-rose-400 to-indigo-400 text-slate-800 py-2 rounded-lg font-sans font-medium hover:from-rose-500 hover:to-indigo-500 transition-all duration-200 shadow-md">
                Edit Profile
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-rose-200">
              <h3 className="text-lg font-heading font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between font-sans">
                  <span className="text-gray-600">Problems Solved</span>
                  <span className="font-semibold text-gray-800">47</span>
                </div>
                <div className="flex justify-between font-sans">
                  <span className="text-gray-600">Mock Interviews</span>
                  <span className="font-semibold text-gray-800">8</span>
                </div>
                <div className="flex justify-between font-sans">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="font-semibold text-gray-800">12 days</span>
                </div>
                <div className="flex justify-between font-sans">
                  <span className="text-gray-600">Average Score</span>
                  <span className="font-semibold text-gray-800">85%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills Progress */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-rose-200">
              <h3 className="text-xl font-heading font-semibold text-gray-800 mb-6">Skills Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillsData.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2 font-sans">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-rose-200 rounded-full h-2">
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
            <div className="bg-white p-6 rounded-xl shadow-lg border border-rose-200">
              <h3 className="text-xl font-heading font-semibold text-gray-800 mb-6">Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        achievement.earned
                          ? 'border-rose-200 bg-rose-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          achievement.earned
                            ? 'bg-rose-600 text-white'
                            : 'bg-gray-400 text-white'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-heading font-semibold text-gray-800">{achievement.title}</h4>
                          <p className="text-sm text-gray-600 font-sans">{achievement.description}</p>
                        </div>
                      </div>
                      {achievement.earned ? (
                        <div className="text-sm text-rose-600 font-sans font-medium">
                          Earned {achievement.date}
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between text-sm mb-1 font-sans">
                            <span className="text-gray-600">Progress</span>
                            <span className="text-gray-600">{achievement.progress}%</span>
                          </div>
                          <div className="w-full bg-rose-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-rose-400 to-indigo-400 h-2 rounded-full"
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
            <div className="bg-white p-6 rounded-xl shadow-lg border border-rose-200">
              <h3 className="text-xl font-heading font-semibold text-gray-800 mb-6">Activity Overview</h3>
              <div className="space-y-4">
                {activityData.map((data, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm text-gray-600 font-sans font-medium">{data.month}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Code className="h-4 w-4 text-rose-600" />
                        <span className="text-sm text-gray-600 font-sans">Problems: {data.problems}</span>
                      </div>
                      <div className="w-full bg-rose-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-gradient-to-r from-rose-400 to-rose-500 h-2 rounded-full"
                          style={{ width: `${(data.problems / 40) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Brain className="h-4 w-4 text-indigo-600" />
                        <span className="text-sm text-gray-600 font-sans">Interviews: {data.interviews}</span>
                      </div>
                      <div className="w-full bg-rose-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-400 to-indigo-500 h-2 rounded-full"
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