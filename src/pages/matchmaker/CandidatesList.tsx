import React, { useState } from 'react';
import { Search, Filter, Eye, Heart } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useToast } from '../../contexts/ToastContext';
import { Candidate } from '../../types';

const CandidatesList: React.FC = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'matched'>('all');

  // Mock data - In a real app, this would come from an API
  const [candidates] = useState<Candidate[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'candidate' as const,
      profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      approved: true,
      isProfileVisible: true,
      personal: {
        age: 28,
        gender: 'Female',
        height: 165,
        location: 'New York, NY',
        occupation: 'Software Engineer',
        education: "Master's Degree",
        religion: 'Christian'
      }
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@example.com',
      role: 'candidate' as const,
      profileImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
      approved: true,
      isProfileVisible: true,
      personal: {
        age: 32,
        gender: 'Male',
        height: 180,
        location: 'San Francisco, CA',
        occupation: 'Product Manager',
        education: "Bachelor's Degree",
        religion: 'Buddhist'
      }
    }
  ]);

  const handleViewProfile = (candidateId: string) => {
    // In a real app, this would navigate to the candidate's profile
    showToast('Viewing candidate profile', 'info');
  };

  const handleProposeMatch = (candidateId: string) => {
    // In a real app, this would open a match proposal form
    showToast('Opening match proposal form', 'info');
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    // Add more filter logic here
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif font-bold text-neutral-800">Available Candidates</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search size={18} />}
          />
          <Button
            variant="outline"
            icon={<Filter size={18} />}
            onClick={() => {/* Add filter menu */}}
          >
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <Card key={candidate.id}>
            <div className="flex items-start space-x-4">
              <img
                src={candidate.profileImage}
                alt={candidate.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-neutral-800">{candidate.name}</h3>
                <p className="text-sm text-neutral-500">{candidate.personal?.location}</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm">
                    <span className="text-neutral-500">Age:</span>{' '}
                    <span className="text-neutral-700">{candidate.personal?.age}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-neutral-500">Occupation:</span>{' '}
                    <span className="text-neutral-700">{candidate.personal?.occupation}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                icon={<Eye size={16} />}
                onClick={() => handleViewProfile(candidate.id)}
              >
                View Profile
              </Button>
              <Button
                size="sm"
                icon={<Heart size={16} />}
                onClick={() => handleProposeMatch(candidate.id)}
              >
                Propose Match
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CandidatesList;