import React from 'react';
import { Menu, LogOut, UserCircle } from 'lucide-react';

function Navbar({ onMenuClick }) {
  // Dummy user data for Sprint 1 scaffolding
  const currentUser = {
    name: "Jeremias C. Esperanza",
    email: "jcesperanza@neu.edu.ph",
    role: "SUPERADMIN"
  };

  return (
    <header className="h-20 bg-white/40 backdrop-blur-md border-b border-white/40 sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between">
      
      {/* Mobile Menu Button */}
      <button 
        onClick={onMenuClick}
        className="p-2 -ml-2 rounded-xl text-slate-500 hover:bg-white/50 hover:text-slate-900 transition-colors lg:hidden active:scale-95"
      >
        <Menu size={24} />
      </button>

      {/* Spacing div for desktop when menu is hidden */}
      <div className="hidden lg:block"></div>

      <div className="flex items-center gap-5 sm:gap-6">
        
        {/* Logged-in User Display */}
        <div className="flex items-center gap-3 text-right">
          <div className="hidden sm:block">
            <p className="text-sm font-extrabold text-slate-900 leading-tight">
              {currentUser.name}
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
              {currentUser.role}
            </p>
          </div>
          
          {/* Avatar Placeholder */}
          <div className="w-10 h-10 rounded-full bg-indigo-50 border-2 border-white shadow-sm flex items-center justify-center text-indigo-500">
            <UserCircle size={24} />
          </div>
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-slate-200"></div>

        {/* Logout Button */}
        <button className="flex items-center gap-2 text-[13px] font-bold text-slate-400 hover:text-red-500 transition-colors active:scale-95 group">
          <span className="hidden sm:inline">SIGN OUT</span>
          <div className="p-2 rounded-xl group-hover:bg-red-50 transition-colors">
            <LogOut size={18} />
          </div>
        </button>

      </div>
    </header>
  );
}

export default Navbar;