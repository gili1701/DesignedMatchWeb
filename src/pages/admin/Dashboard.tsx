import React from 'react';
import { Users, UserCog, BarChart as ChartBar } from 'lucide-react';
import Card from '../../components/common/Card';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Candidates',
      value: '156',
      icon: <Users className="w-6 h-6 text-blue-500" />,
      change: '+12% from last month'
    },
    {
      title: 'Active Matchmakers',
      value: '24',
      icon: <UserCog className="w-6 h-6 text-green-500" />,
      change: '+3 this week'
    },
    {
      title: 'Successful Matches',
      value: '89',
      icon: <ChartBar className="w-6 h-6 text-purple-500" />,
      change: '+5% success rate'
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-2">{stat.change}</p>
              </div>
              <div className="bg-gray-50 rounded-full p-3">
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;