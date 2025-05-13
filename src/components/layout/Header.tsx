import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Menu, User, X, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 py-4 px-6 z-10 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {isAuthenticated && (
            <button
              className="mr-4 md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
          
          <Link to="/" className="flex items-center">
            <Heart size={32} className="text-primary-600 mr-2" />
            <span className="text-2xl font-serif font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
              HeartMatch
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1 mr-2">
                <span className="text-sm font-medium text-neutral-600">
                  Hi, {user?.name.split(' ')[0]}
                </span>
                <span className="text-xs text-white bg-primary-600 px-2 py-0.5 rounded-full capitalize">
                  {user?.role}
                </span>
              </div>
              
              <div className="relative" ref={dropdownRef}>
                <button 
                  className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-primary-50 hover:border-primary-200 transition-colors"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {user?.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user?.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={20} className="text-neutral-500" />
                  )}
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 top-12 w-48 bg-white shadow-lg rounded-lg border border-neutral-200 py-1">
                    <Link 
                      to={`/${user?.role}/profile`} 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User size={16} />
                      <span>Profile</span>
                    </Link>
                    <button 
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 w-full text-left"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm">Log In</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Join Now</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;