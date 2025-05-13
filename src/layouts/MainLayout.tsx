import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Sidebar from '../components/layout/Sidebar';
import { useAuth } from '../contexts/AuthContext';

const MainLayout: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Close sidebar on route change (for mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Determine if we should show the sidebar
  const shouldShowSidebar = isAuthenticated && user && ['/login', '/register'].indexOf(location.pathname) === -1;
  
  // Determine if this is a public route (no auth)
  const isPublicRoute = ['/login', '/register', '/', '/about'].indexOf(location.pathname) !== -1;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex flex-1">
        {shouldShowSidebar && (
          <Sidebar 
            open={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />
        )}
        
        <main className={`flex-1 py-6 px-4 md:px-6 transition-all duration-300 ${shouldShowSidebar ? 'md:ml-64' : ''}`}>
          <div className={`container mx-auto ${isPublicRoute ? 'max-w-6xl' : ''}`}>
            <Outlet />
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default MainLayout;