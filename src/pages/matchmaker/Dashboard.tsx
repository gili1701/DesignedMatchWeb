import React from 'react';

const MatchmakerDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Matchmaker Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Matches</h2>
          <p className="text-gray-600">View and manage your active matching processes</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <p className="text-gray-600">Track your recent matching activities</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance</h2>
          <p className="text-gray-600">Monitor your matching success metrics</p>
        </div>
      </div>
    </div>
  );
};

export default MatchmakerDashboard;