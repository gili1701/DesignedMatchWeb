import React from 'react';
import { Heart, Users, Calendar, Bell } from 'lucide-react';
import Card from '../../components/common/Card';
import { useAuth } from '../../contexts/AuthContext';

const CandidateDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Profile Views',
      value: '24',
      icon: <Users className="w-6 h-6 text-blue-500" />,
      change: '+8 this week'
    },
    {
      title: 'Match Proposals',
      value: '3',
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      change: '2 pending review'
    },
    {
      title: 'Upcoming Meetings',
      value: '1',
      icon: <Calendar className="w-6 h-6 text-purple-500" />,
      change: 'Next: Tomorrow, 3 PM'
    },
    {
      title: 'New Notifications',
      value: '5',
      icon: <Bell className="w-6 h-6 text-yellow-500" />,
      change: '3 unread messages'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-neutral-800">Welcome, {user?.name}</h1>
          <p className="text-neutral-600">Here's what's happening with your profile</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-neutral-50 rounded-lg">
                {stat.icon}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-neutral-800">{stat.value}</h3>
            <p className="text-sm font-medium text-neutral-600">{stat.title}</p>
            <p className="text-xs text-neutral-500 mt-1">{stat.change}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Activity">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm text-neutral-800">Your profile was viewed by a matchmaker</p>
                <p className="text-xs text-neutral-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div>
                <p className="text-sm text-neutral-800">New match proposal received</p>
                <p className="text-xs text-neutral-500">Yesterday</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div>
                <p className="text-sm text-neutral-800">Profile completion reminder</p>
                <p className="text-xs text-neutral-500">2 days ago</p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Upcoming Events">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-800">Virtual Meet & Greet</p>
                <p className="text-xs text-neutral-600">Tomorrow, 3:00 PM</p>
                <p className="text-xs text-neutral-500 mt-1">
                  Get to know your potential match in a casual online setting
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-800">Matchmaker Consultation</p>
                <p className="text-xs text-neutral-600">Next Week, Tuesday 2:00 PM</p>
                <p className="text-xs text-neutral-500 mt-1">
                  Review your matching preferences and discuss potential matches
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CandidateDashboard;