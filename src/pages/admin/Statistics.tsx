import React from 'react';
import { BarChart3, Users, UserCheck, Calendar } from 'lucide-react';

const AdminStatistics = () => {
  const stats = [
    {
      title: 'Total Candidates',
      value: '1,234',
      icon: Users,
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Active Matchmakers',
      value: '56',
      icon: UserCheck,
      change: '+3%',
      changeType: 'increase'
    },
    {
      title: 'Monthly Matches',
      value: '89',
      icon: Calendar,
      change: '+15%',
      changeType: 'increase'
    },
    {
      title: 'Success Rate',
      value: '78%',
      icon: BarChart3,
      change: '+5%',
      changeType: 'increase'
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Statistics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index}
              className="bg-white rounded-lg shadow p-6 transition-all hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h2>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Statistics</h2>
        <div className="h-64 flex items-center justify-center border border-gray-200 rounded-lg">
          <p className="text-gray-500">Chart placeholder - Add your preferred charting library</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;