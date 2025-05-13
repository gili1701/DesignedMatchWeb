import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { InterviewProvider } from './contexts/InterviewContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import MatchmakerRoute from './components/MatchmakerRoute';
import CandidateRoute from './components/CandidateRoute';

// Layouts
import MainLayout from './layouts/MainLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import CandidatesManagement from './pages/admin/CandidatesManagement';
import MatchmakersManagement from './pages/admin/MatchmakersManagement';
import AdminStatistics from './pages/admin/Statistics';

// Matchmaker Pages
import MatchmakerDashboard from './pages/matchmaker/Dashboard';
import CandidatesList from './pages/matchmaker/CandidatesList';
import OutgoingProposals from './pages/matchmaker/OutgoingProposals';

// Candidate Pages
import CandidateDashboard from './pages/candidate/Dashboard';
import Profile from './pages/candidate/Profile';
import IncomingProposals from './pages/candidate/IncomingProposals';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
       <ToastProvider>
      <AuthProvider>
        
            <InterviewProvider>
           
            <Routes>
              <Route path="/" element={<MainLayout />}>
                {/* Public Routes */}
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                
                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                  {/* Admin Routes */}
                  <Route element={<AdminRoute />}>
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="admin/candidates" element={<CandidatesManagement />} />
                    <Route path="admin/matchmakers" element={<MatchmakersManagement />} />
                    <Route path="admin/statistics" element={<AdminStatistics />} />
                  </Route>
                  
                  {/* Matchmaker Routes */}
                  <Route element={<MatchmakerRoute />}>
                    <Route path="matchmaker" element={<MatchmakerDashboard />} />
                    <Route path="matchmaker/candidates" element={<CandidatesList />} />
                    <Route path="matchmaker/proposals" element={<OutgoingProposals />} />
                  </Route>
                  
                  {/* Candidate Routes */}
                  <Route element={<CandidateRoute />}>
                    <Route path="candidate" element={<CandidateDashboard />} />
                    <Route path="candidate/profile" element={<Profile />} />
                    <Route path="candidate/proposals" element={<IncomingProposals />} />
                  </Route>
                </Route>
                
                {/* 404 - Not Found */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
               </InterviewProvider>
      
      </AuthProvider>
     </ToastProvider>
        
    </Router>
  );
}

export default App;