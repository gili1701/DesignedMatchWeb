import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, Search } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useToast } from '../../contexts/ToastContext';
import { Proposal, ProposalStatus } from '../../types';

const OutgoingProposals: React.FC = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<ProposalStatus | 'all'>('all');

  // Mock data - In a real app, this would come from an API
  const [proposals] = useState<Proposal[]>([
    {
      id: '1',
      matchmakerId: 'm1',
      matchmakerName: 'Emma Wilson',
      candidateId: 'c1',
      candidateName: 'Sarah Johnson',
      status: ProposalStatus.PENDING,
      message: 'I believe you two would be a great match based on your shared interests in technology and outdoor activities.',
      createdAt: '2024-03-10T10:00:00Z',
      updatedAt: '2024-03-10T10:00:00Z'
    },
    {
      id: '2',
      matchmakerId: 'm1',
      matchmakerName: 'Emma Wilson',
      candidateId: 'c2',
      candidateName: 'Michael Chen',
      status: ProposalStatus.ACCEPTED,
      message: 'Your educational backgrounds and career aspirations align perfectly.',
      createdAt: '2024-03-09T15:30:00Z',
      updatedAt: '2024-03-09T16:45:00Z'
    }
  ]);

  const handleWithdraw = (proposalId: string) => {
    // In a real app, this would make an API call
    showToast('Proposal withdrawn successfully', 'success');
  };

  const getStatusIcon = (status: ProposalStatus) => {
    switch (status) {
      case ProposalStatus.PENDING:
        return <Clock className="text-yellow-500" size={20} />;
      case ProposalStatus.ACCEPTED:
        return <CheckCircle className="text-green-500" size={20} />;
      case ProposalStatus.REJECTED:
        return <XCircle className="text-red-500" size={20} />;
    }
  };

  const getStatusText = (status: ProposalStatus) => {
    switch (status) {
      case ProposalStatus.PENDING:
        return 'Pending';
      case ProposalStatus.ACCEPTED:
        return 'Accepted';
      case ProposalStatus.REJECTED:
        return 'Rejected';
    }
  };

  const getStatusClass = (status: ProposalStatus) => {
    switch (status) {
      case ProposalStatus.PENDING:
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case ProposalStatus.ACCEPTED:
        return 'bg-green-50 text-green-700 border-green-200';
      case ProposalStatus.REJECTED:
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.candidateName.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterStatus === 'all') return matchesSearch;
    return proposal.status === filterStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif font-bold text-neutral-800">Outgoing Proposals</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search proposals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search size={18} />}
          />
          <select
            className="rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-30"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as ProposalStatus | 'all')}
          >
            <option value="all">All Status</option>
            <option value={ProposalStatus.PENDING}>Pending</option>
            <option value={ProposalStatus.ACCEPTED}>Accepted</option>
            <option value={ProposalStatus.REJECTED}>Rejected</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredProposals.map((proposal) => (
          <Card key={proposal.id}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-medium text-neutral-800">
                    {proposal.candidateName}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusClass(proposal.status)}`}>
                    {getStatusText(proposal.status)}
                  </span>
                </div>
                <p className="text-neutral-600 text-sm mb-4">{proposal.message}</p>
                <div className="text-sm text-neutral-500">
                  Proposed on {new Date(proposal.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {proposal.status === ProposalStatus.PENDING && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleWithdraw(proposal.id)}
                  >
                    Withdraw
                  </Button>
                )}
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-neutral-50">
                  {getStatusIcon(proposal.status)}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OutgoingProposals;