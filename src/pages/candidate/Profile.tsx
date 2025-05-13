import React, { useState } from 'react';
import { User, MapPin, Briefcase, GraduationCap, Heart, Users, Settings } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { useInterview } from '../../contexts/InterviewContext';
import Interview from '../../components/interview/Interview';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const { isInterviewComplete, startInterview, currentQuestion } = useInterview();

  // Mock profile data - In a real app, this would come from an API
  const [profile, setProfile] = useState({
    personal: {
      age: 28,
      gender: 'Female',
      height: 165,
      location: 'New York, NY',
      occupation: 'Software Engineer',
      education: "Master's Degree",
      religion: 'Christian'
    },
    about: {
      bio: "I'm a tech enthusiast who loves to explore new places and try different cuisines. Looking for someone who shares my passion for learning and adventure.",
      interests: ['Technology', 'Travel', 'Cooking', 'Photography', 'Hiking'],
      values: ['Honesty', 'Ambition', 'Family-oriented', 'Open-mindedness']
    },
    preferences: {
      ageRange: { min: 25, max: 35 },
      location: 'Within 50 miles',
      dealBreakers: ['Smoking', 'Lack of ambition'],
      mustHaves: ['Good sense of humor', 'Career-driven', 'Family values']
    }
  });

  const handleSave = () => {
    // In a real app, this would make an API call
    setIsEditing(false);
    showToast('Profile updated successfully', 'success');
  };

  if (!isInterviewComplete) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-neutral-800 mb-4">
            Welcome to HeartMatch
          </h1>
          <p className="text-neutral-600 mb-8">
            Let's create your profile through a friendly conversation. Our AI matchmaker will ask you some questions to understand you better.
          </p>
          <Button onClick={startInterview}>Start Interview</Button>
        </div>
        {currentQuestion && <Interview />}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif font-bold text-neutral-800">My Profile</h1>
        <Button
          variant={isEditing ? 'primary' : 'outline'}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <Card className="lg:col-span-1">
          <div className="text-center">
            <div className="relative inline-block">
              <img
                src={user?.profileImage || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'}
                alt={user?.name}
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full shadow-lg">
                  <Settings size={16} />
                </button>
              )}
            </div>
            <h2 className="mt-4 text-xl font-medium text-neutral-800">{user?.name}</h2>
            <p className="text-neutral-600 flex items-center justify-center gap-1 mt-1">
              <MapPin size={16} />
              {profile.personal.location}
            </p>
            <div className="mt-4 flex justify-center gap-4 text-sm text-neutral-600">
              <div>
                <p className="font-medium">{profile.personal.age}</p>
                <p>Age</p>
              </div>
              <div className="border-l border-neutral-200"></div>
              <div>
                <p className="font-medium">{profile.personal.height}cm</p>
                <p>Height</p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Briefcase size={18} className="text-neutral-500" />
              <div>
                <p className="text-sm font-medium text-neutral-800">{profile.personal.occupation}</p>
                <p className="text-xs text-neutral-500">Occupation</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap size={18} className="text-neutral-500" />
              <div>
                <p className="text-sm font-medium text-neutral-800">{profile.personal.education}</p>
                <p className="text-xs text-neutral-500">Education</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Heart size={18} className="text-neutral-500" />
              <div>
                <p className="text-sm font-medium text-neutral-800">{profile.personal.religion}</p>
                <p className="text-xs text-neutral-500">Religion</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Profile Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="About Me">
            {isEditing ? (
              <textarea
                className="w-full p-2 border rounded-md"
                value={profile.about.bio}
                onChange={(e) => setProfile({
                  ...profile,
                  about: { ...profile.about, bio: e.target.value }
                })}
                rows={4}
              />
            ) : (
              <p className="text-neutral-700">{profile.about.bio}</p>
            )}

            <div className="mt-6">
              <h4 className="text-sm font-medium text-neutral-800 mb-2">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {profile.about.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-neutral-800 mb-2">Values</h4>
              <div className="flex flex-wrap gap-2">
                {profile.about.values.map((value, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Partner Preferences">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-neutral-800 mb-2">Age Range</h4>
                {isEditing ? (
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      value={profile.preferences.ageRange.min}
                      onChange={(e) => setProfile({
                        ...profile,
                        preferences: {
                          ...profile.preferences,
                          ageRange: { ...profile.preferences.ageRange, min: parseInt(e.target.value) }
                        }
                      })}
                    />
                    <span>to</span>
                    <Input
                      type="number"
                      value={profile.preferences.ageRange.max}
                      onChange={(e) => setProfile({
                        ...profile,
                        preferences: {
                          ...profile.preferences,
                          ageRange: { ...profile.preferences.ageRange, max: parseInt(e.target.value) }
                        }
                      })}
                    />
                  </div>
                ) : (
                  <p className="text-neutral-700">{profile.preferences.ageRange.min} - {profile.preferences.ageRange.max} years</p>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium text-neutral-800 mb-2">Location Preference</h4>
                {isEditing ? (
                  <Input
                    value={profile.preferences.location}
                    onChange={(e) => setProfile({
                      ...profile,
                      preferences: { ...profile.preferences, location: e.target.value }
                    })}
                  />
                ) : (
                  <p className="text-neutral-700">{profile.preferences.location}</p>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium text-neutral-800 mb-2">Must-Haves</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.preferences.mustHaves.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-neutral-800 mb-2">Deal-Breakers</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.preferences.dealBreakers.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;