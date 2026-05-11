import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Package, 
  FileText, 
  Trash2, 
  Users, 
  X, 
  LayoutDashboard 
} from 'lucide-react';

function Sidebar({ isOpen, setIsOpen }) {
  // Placeholder role logic for Sprint 1 gating
  const isAdmin = true;

  const navItems = [
    { name: 'Products', path: '/products', icon: Package, show: true },
    { name: 'Reports', path: '/reports', icon: FileText, show: true },
    { name: 'Deleted Items', path: '/deleted-items', icon: Trash2, show: isAdmin },
    { name: 'Admin', path: '/admin', icon: Users, show: isAdmin },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar Panel */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white/70 backdrop-blur-2xl border-r border-white/40 shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
        
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-200/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-200">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl text-slate-900 tracking-tight">HopePMS</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="lg:hidden text-slate-400 hover:text-slate-600 active:scale-95 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          {navItems.filter(item => item.show).map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)} // Close sidebar on mobile click
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-[13px] transition-all ${
                  isActive 
                    ? 'bg-white text-indigo-700 shadow-sm border border-slate-100' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <item.icon size={18} className="opacity-80" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;