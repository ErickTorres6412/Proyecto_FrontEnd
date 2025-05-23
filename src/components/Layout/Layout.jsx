import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCompact, setIsSidebarCompact] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const toggleSidebarCompact = () => {
    setIsSidebarCompact(!isSidebarCompact);
  };
  
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <Navbar
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        toggleSidebarCompact={toggleSidebarCompact}
        isSidebarCompact={isSidebarCompact}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        isCompact={isSidebarCompact}
      />
     
      {/* Contenido principal */}
      <main className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? (isSidebarCompact ? 'lg:ml-20' : 'lg:ml-64') : ''}`}>
        <div className="p-6 pt-20">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;