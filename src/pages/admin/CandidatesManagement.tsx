// import React, { useState, useEffect } from 'react';
// import { Shield, Eye, Trash2, Search, Filter } from 'lucide-react';
// import Card from '../../components/common/Card';
// import Button from '../../components/common/Button';
// import Input from '../../components/common/Input';
// import { useToast } from '../../contexts/ToastContext';
// import { Candidate, UserRole } from '../../types';
// import api from '../../services/api';

// const CandidatesManagement: React.FC = () => {
//   const { showToast } = useToast();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'blocked'>('all');
//   const [candidates, setCandidates] = useState<Candidate[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch candidates from API
//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         const response = await api.get('/candidates');
//         setCandidates(response.data);
//         setError(null);
//       } catch (err) {
//         setError('Failed to fetch candidates');
//         showToast('Failed to load candidates. Please try again later.', 'error');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCandidates();
//   }, []);

//   // Handle block/unblock candidate
//   const handleBlock = async (candidateId: string) => {
//     try {
//       const candidate = candidates.find(c => c.id === candidateId);
//       if (!candidate) return;

//       await api.patch(`/candidates/${candidateId}/status`, {
//         approved: !candidate.approved
//       });

//       setCandidates(prev =>
//         prev.map(c =>
//           c.id === candidateId ? { ...c, approved: !c.approved } : c
//         )
//       );

//       showToast(
//         `Candidate ${!candidate.approved ? 'unblocked' : 'blocked'} successfully`,
//         'success'
//       );
//     } catch (err) {
//       showToast('Failed to update candidate status', 'error');
//     }
//   };

//   // Handle delete candidate
//   const handleDelete = async (candidateId: string) => {
//     if (!window.confirm('Are you sure you want to delete this candidate?')) return;

//     try {
//       await api.delete(`/candidates/${candidateId}`);
//       setCandidates(prev => prev.filter(c => c.id !== candidateId));
//       showToast('Candidate deleted successfully', 'success');
//     } catch (err) {
//       showToast('Failed to delete candidate', 'error');
//     }
//   };

//   // Filter candidates based on search and status
//   const filteredCandidates = candidates.filter(candidate => {
//     const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (filterStatus === 'all') return matchesSearch;
//     return candidate.approved === (filterStatus === 'active') && matchesSearch;
//   });

//   // Loading state
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-400"></div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <Card className="text-center p-8">
//         <div className="text-red-500 font-medium">{error}</div>
//         <Button 
//           className="mt-4" 
//           onClick={() => window.location.reload()}
//         >
//           Retry
//         </Button>
//       </Card>
//     );
//   }

//   // Empty state
//   if (candidates.length === 0) {
//     return (
//       <Card className="text-center p-8">
//         <div className="text-neutral-500">No candidates found</div>
//       </Card>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
//         <h1 className="text-2xl font-serif font-bold text-neutral-800">Candidates Management</h1>
        
//         <div className="flex flex-col sm:flex-row gap-3">
//           <div className="flex-1">
//             <Input
//               placeholder="Search candidates..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               leftIcon={<Search size={18} />}
//             />
//           </div>
          
//           <div className="relative">
//             <select
//               className="appearance-none bg-white border border-neutral-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'blocked')}
//             >
//               <option value="all">All Statuses</option>
//               <option value="active">Active</option>
//               <option value="blocked">Blocked</option>
//             </select>
//             <Filter size={18} className="absolute right-3 top-2.5 text-neutral-400" />
//           </div>
//         </div>
//       </div>

//       <Card>
//         <div className="overflow-x-auto">
//           <table className="w-full divide-y divide-neutral-200">
//             <thead className="bg-neutral-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
//                   Candidate
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
//                   Location
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
//                   Profile Visibility
//                 </th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-neutral-200">
//               {filteredCandidates.map((candidate) => (
//                 <tr key={candidate.id} className="hover:bg-neutral-50 transition-colors">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <img
//                         className="h-10 w-10 rounded-full object-cover"
//                         src={candidate.profileImage || '/default-avatar.png'}
//                         alt={candidate.name}
//                         onError={(e) => {
//                           (e.target as HTMLImageElement).src = '/default-avatar.png';
//                         }}
//                       />
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-neutral-900">
//                           {candidate.name}
//                         </div>
//                         <div className="text-sm text-neutral-500">
//                           {candidate.email}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-neutral-900">
//                       {candidate.personal?.location || 'N/A'}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       candidate.approved
//                         ? 'bg-green-100 text-green-800'
//                         : 'bg-red-100 text-red-800'
//                     }`}>
//                       {candidate.approved ? 'Active' : 'Blocked'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       candidate.isProfileVisible
//                         ? 'bg-blue-100 text-blue-800'
//                         : 'bg-neutral-100 text-neutral-800'
//                     }`}>
//                       {candidate.isProfileVisible ? 'Visible' : 'Hidden'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex justify-end gap-2">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         icon={<Eye size={16} />}
//                         onClick={() => window.open(`/candidates/${candidate.id}`, '_blank')}
//                         tooltip="View profile"
//                       />
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         icon={<Shield size={16} />}
//                         onClick={() => handleBlock(candidate.id)}
//                         tooltip={candidate.approved ? 'Block candidate' : 'Unblock candidate'}
//                         className={candidate.approved ? 'text-red-600' : 'text-green-600'}
//                       />
//                       <div className="relative group">
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           icon={<Trash2 size={16} />}
//                           onClick={() => handleDelete(candidate.id)}
//                           className="text-red-600"
//                         />
//                         <div className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
//                           Delete candidate
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {filteredCandidates.length === 0 && (
//             <div className="text-center py-12">
//               <div className="text-neutral-500">No candidates match your search criteria</div>
//               <Button
//                 variant="text"
//                 className="mt-2"
//                 onClick={() => {
//                   setSearchTerm('');
//                   setFilterStatus('all');
//                 }}
//               >
//                 Clear filters
//               </Button>
//             </div>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default CandidatesManagement;

import React, { useState, useEffect } from 'react';
import { Shield, Eye, Trash2, Search, Filter } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useToast } from '../../contexts/ToastContext';
import { Candidate, UserRole } from '../../types';
import api from '../../services/api';

const CandidatesManagement: React.FC = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'blocked'>('all');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await api.get('/candidates');
        // וודא שהנתונים תואמים את האינטרפייס Candidate
        const candidatesData: Candidate[] = response.data.map((c: any) => ({
          ...c,
          role: UserRole.CANDIDATE,
          approved: c.approved || true,
          isProfileVisible: c.isProfileVisible || true,
          personal: {
            age: c.personal?.age || 0,
            gender: c.personal?.gender || '',
            height: c.personal?.height || 0,
            location: c.personal?.location || '',
            occupation: c.personal?.occupation || '',
            education: c.personal?.education || '',
            religion: c.personal?.religion || ''
          }
        }));
        setCandidates(candidatesData);
      } catch (err) {
        setError('Failed to fetch candidates');
        showToast('Failed to load candidates', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleBlock = async (candidateId: string) => {
    try {
      await api.patch(`/candidates/${candidateId}/status`, {
        approved: false
      });
      setCandidates(prev =>
        prev.map(c =>
          c.id === candidateId ? { ...c, approved: false } : c
        )
      );
      showToast('Candidate blocked successfully', 'success');
    } catch (err) {
      showToast('Failed to block candidate', 'error');
    }
  };

  const handleUnblock = async (candidateId: string) => {
    try {
      await api.patch(`/candidates/${candidateId}/status`, {
        approved: true
      });
      setCandidates(prev =>
        prev.map(c =>
          c.id === candidateId ? { ...c, approved: true } : c
        )
      );
      showToast('Candidate unblocked successfully', 'success');
    } catch (err) {
      showToast('Failed to unblock candidate', 'error');
    }
  };

  const handleDelete = async (candidateId: string) => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) return;
    
    try {
      await api.delete(`/candidates/${candidateId}`);
      setCandidates(prev => prev.filter(c => c.id !== candidateId));
      showToast('Candidate deleted successfully', 'success');
    } catch (err) {
      showToast('Failed to delete candidate', 'error');
    }
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    return candidate.approved === (filterStatus === 'active') && matchesSearch;
  });

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Candidates Management</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search size={18} />}
          />
          <select
            className="border rounded p-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'blocked')}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      <Card>
        <table className="w-full">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map(candidate => (
              <tr key={candidate.id}>
                <td>
                  <div className="flex items-center">
                    <img 
                      src={candidate.profileImage} 
                      alt={candidate.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-4">
                      <div>{candidate.name}</div>
                      <div className="text-sm text-gray-500">{candidate.email}</div>
                    </div>
                  </div>
                </td>
                <td>{candidate.personal?.location || 'N/A'}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    candidate.approved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {candidate.approved ? 'Active' : 'Blocked'}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Eye size={16} />}
                      onClick={() => window.open(`/candidates/${candidate.id}`, '_blank')}
                    />
                    {candidate.approved ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Shield size={16} />}
                        onClick={() => handleBlock(candidate.id)}
                      >
                        Block
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Shield size={16} />}
                        onClick={() => handleUnblock(candidate.id)}
                      >
                        Unblock
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Trash2 size={16} />}
                      onClick={() => handleDelete(candidate.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default CandidatesManagement;