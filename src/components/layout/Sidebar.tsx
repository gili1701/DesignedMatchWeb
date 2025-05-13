import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserRole } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, Users, History, UserCog, 
  BarChart3, Heart, HeartHandshake, User
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg
      ${isActive 
        ? 'bg-primary-50 text-primary-700' 
        : 'text-neutral-600 hover:bg-neutral-100'
      }
      transition-colors duration-150
    `}
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const { user } = useAuth();
  
  // Render nothing if user not loaded
  if (!user) return null;
  
  let navItems: NavItemProps[] = [];
  
  // Set navigation based on user role
  switch (user.role) {
    case UserRole.ADMIN:
      navItems = [
        { to: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { to: '/admin/candidates', icon: <Users size={20} />, label: 'Candidates' },
        { to: '/admin/matchmakers', icon: <UserCog size={20} />, label: 'Matchmakers' },
        { to: '/admin/statistics', icon: <BarChart3 size={20} />, label: 'Statistics' }
      ];
      break;
    case UserRole.MATCHMAKER:
      navItems = [
        { to: '/matchmaker', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { to: '/matchmaker/candidates', icon: <Heart size={20} />, label: 'Candidates' },
        { to: '/matchmaker/proposals', icon: <History size={20} />, label: 'Proposals' }
      ];
      break;
    case UserRole.CANDIDATE:
      navItems = [
        { to: '/candidate', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { to: '/candidate/profile', icon: <User size={20} />, label: 'My Profile' },
        { to: '/candidate/proposals', icon: <HeartHandshake size={20} />, label: 'Proposals' }
      ];
      break;
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/30 z-20 md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-30 h-full w-64 bg-white border-r border-neutral-200
          transform transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          pt-20 md:pt-16 overflow-y-auto
        `}
      >
        <div className="px-4 py-6">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 px-4">
              Main Menu
            </h3>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavItem 
                  key={item.to} 
                  to={item.to} 
                  icon={item.icon} 
                  label={item.label} 
                />
              ))}
            </nav>
          </div>
          
          <div className="mt-auto pt-6 border-t border-neutral-200">
            <div className="px-4 py-3 rounded-lg bg-neutral-50">
              <h4 className="text-sm font-medium text-neutral-700">Need Help?</h4>
              <p className="text-xs text-neutral-500 mt-1">
                Contact our support team for assistance.
              </p>
              <a 
                href="mailto:support@heartmatch.com" 
                className="text-xs text-primary-600 font-medium mt-2 inline-block hover:underline"
              >
                support@heartmatch.com
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;