import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
// FIX: corrected casing to match actual filenames SideBar.jsx and NavBar.jsx
import Sidebar from './SideBar';
import Navbar from './NavBar';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex font-sans overflow-hidden">

      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* Navbar Component */}
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative z-0">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}

export default Layout;