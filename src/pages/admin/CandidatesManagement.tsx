import React, { useState } from 'react';
import { Shield, UserX, Eye, Trash2, Search, Filter } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useToast } from '../../contexts/ToastContext';
import { Candidate, UserRole } from '../../types';

const CandidatesManagement: React.FC = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'blocked'>('all');

  // Mock data - In a real app, this would come from an API
  const [candidates] = useState<Candidate[]>([
    {
      id: '2',
      name: 'John Doe',
      email: 'john@example.com',
      role: UserRole.CANDIDATE,
      profileImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
      approved: true,
      isProfileVisible: true,
      personal: {
        age: 28,
        gender: 'Male',
        height: 180,
        location: 'New York, NY',
        occupation: 'Software Engineer',
        education: "Bachelor's Degree",
        religion: 'Christian'
      }
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: UserRole.CANDIDATE,
      profileImage: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
      approved: true,
      isProfileVisible: true,
      personal: {
        age: 25,
        gender: 'Female',
        height: 165,
        location: 'Los Angeles, CA',
        occupation: 'Marketing Manager',
        education: "Master's Degree",
        religion: 'Buddhist'
      }
    },
    // Add more mock candidates as needed
  ]);

  const handleBlock = (candidateId: string) => {
    // In a real app, this would make an API call
    showToast('Candidate has been blocked', 'success');
  };

  const handleDelete = (candidateId: string) => {
    // In a real app, this would make an API call
    showToast('Candidate has been deleted', 'success');
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'blocked') return !candidate.approved && matchesSearch;
    return candidate.approved && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif font-bold text-neutral-800">Candidates Management</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search size={18} />}
          />
          <div className="relative">
            <Button
              variant="outline"
              icon={<Filter size={18} />}
              onClick={() => {/* Add filter menu */}}
            >
              Filter
            </Button>
          </div>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Profile Visibility
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredCandidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={candidate.profileImage}
                        alt={candidate.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-neutral-900">{candidate.name}</div>
                        <div className="text-sm text-neutral-500">{candidate.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900">{candidate.personal?.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      candidate.approved
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {candidate.approved ? 'Active' : 'Blocked'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      candidate.isProfileVisible
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-neutral-100 text-neutral-800'
                    }`}>
                      {candidate.isProfileVisible ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Eye size={16} />}
                        onClick={() => {/* View profile */}}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Shield size={16} />}
                        onClick={() => handleBlock(candidate.id)}
                      >
                        {candidate.approved ? 'Block' : 'Unblock'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Trash2 size={16} />}
                        onClick={() => handleDelete(candidate.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default CandidatesManagement;