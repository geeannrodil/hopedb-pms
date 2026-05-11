import React from 'react';
import { Menu, LogOut, UserCircle } from 'lucide-react';

// ─── Color tokens (mapped from palette) ──────────────────────────────────────
const colors = {
  primary:       '#1E3A5F',
  primaryHover:  '#27496D',
  secondary:     '#4F6D8A',
  accent:        '#5BC0BE',
  background:    '#F8FAFC',
  surface:       '#FFFFFF',
  textPrimary:   '#1F2937',
  textSecondary: '#6B7280',
  border:        '#E5E7EB',
};

function Navbar({ onMenuClick }) {
  const currentUser = {
    name: "Jeremias C. Esperanza",
    email: "jcesperanza@neu.edu.ph",
    role: "SUPERADMIN",
  };

  return (
    <header
      className="h-20 sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between"
      style={{
        backgroundColor: colors.surface,
        borderBottom: `1px solid ${colors.border}`,
        boxShadow: '0 1px 4px rgba(30,58,95,0.06)',
      }}
    >
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="p-2 -ml-2 rounded-xl transition-colors lg:hidden active:scale-95"
        style={{ color: colors.textSecondary }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = colors.background;
          e.currentTarget.style.color = colors.primary;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = colors.textSecondary;
        }}
      >
        <Menu size={22} />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-5 sm:gap-6">

        {/* User Info */}
        <div className="flex items-center gap-3 text-right">
          <div className="hidden sm:block">
            <p
              className="text-sm font-bold leading-tight"
              style={{ color: colors.textPrimary }}
            >
              {currentUser.name}
            </p>
            <p
              className="text-[10px] font-semibold uppercase tracking-widest mt-0.5"
              style={{ color: colors.accent }}
            >
              {currentUser.role}
            </p>
          </div>

          {/* Avatar */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center border-2"
            style={{
              backgroundColor: '#EEF4FA',
              borderColor: colors.accent,
              color: colors.primary,
            }}
          >
            <UserCircle size={22} />
          </div>
        </div>

        {/* Divider */}
        <div className="h-8 w-px" style={{ backgroundColor: colors.border }} />

        {/* Sign Out */}
        <button
          className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider transition-colors active:scale-95 group"
          style={{ color: colors.textSecondary }}
          onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
          onMouseLeave={e => e.currentTarget.style.color = colors.textSecondary}
        >
          <span className="hidden sm:inline">Sign Out</span>
          <div className="p-2 rounded-xl transition-colors group-hover:bg-red-50">
            <LogOut size={17} />
          </div>
        </button>

      </div>
    </header>
  );
}

export default Navbar;