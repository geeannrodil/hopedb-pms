import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Package,
  FileText,
  Trash2,
  Users,
  X,
  LayoutDashboard,
} from 'lucide-react';

// ─── Color tokens ─────────────────────────────────────────────────────────────
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

function Sidebar({ isOpen, setIsOpen }) {
  const isAdmin = true;

  const navItems = [
    { name: 'Products',      path: '/products',      icon: Package,         show: true },
    { name: 'Reports',       path: '/reports',        icon: FileText,        show: true },
    { name: 'Deleted Items', path: '/deleted-items',  icon: Trash2,          show: isAdmin },
    { name: 'Admin',         path: '/admin',          icon: Users,           show: isAdmin },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden transition-opacity"
          style={{ backgroundColor: 'rgba(30,58,95,0.25)', backdropFilter: 'blur(4px)' }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } flex flex-col`}
        style={{
          backgroundColor: colors.surface,
          borderRight: `1px solid ${colors.border}`,
          boxShadow: '2px 0 16px rgba(30,58,95,0.07)',
        }}
      >
        {/* Brand Header */}
        <div
          className="h-20 flex items-center justify-between px-6"
          style={{ borderBottom: `1px solid ${colors.border}` }}
        >
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md"
              style={{ backgroundColor: colors.primary }}
            >
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span
              className="font-extrabold text-xl tracking-tight"
              style={{ color: colors.primary }}
            >
              HopePMS
            </span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden transition-colors active:scale-95 rounded-lg p-1"
            style={{ color: colors.textSecondary }}
            onMouseEnter={e => e.currentTarget.style.color = colors.primary}
            onMouseLeave={e => e.currentTarget.style.color = colors.textSecondary}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav section label */}
        <div className="px-6 pt-6 pb-2">
          <p
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: colors.textSecondary }}
          >
            Navigation
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 pb-8 px-3 space-y-1 overflow-y-auto">
          {navItems.filter(item => item.show).map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all"
              style={({ isActive }) => ({
                backgroundColor: isActive ? '#EEF4FA' : 'transparent',
                color: isActive ? colors.primary : colors.textSecondary,
                borderLeft: isActive ? `3px solid ${colors.accent}` : '3px solid transparent',
              })}
              onMouseEnter={e => {
                if (!e.currentTarget.classList.contains('active')) {
                  e.currentTarget.style.backgroundColor = colors.background;
                  e.currentTarget.style.color = colors.primary;
                }
              }}
              onMouseLeave={e => {
                if (!e.currentTarget.dataset.active) {
                  // NavLink handles active state via style prop above; just reset non-active
                }
              }}
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    size={18}
                    style={{ color: isActive ? colors.accent : colors.secondary }}
                  />
                  {item.name}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom version badge */}
        <div
          className="px-6 py-4"
          style={{ borderTop: `1px solid ${colors.border}` }}
        >
          <p className="text-[11px]" style={{ color: colors.textSecondary }}>
            HopePMS{' '}
            <span className="font-semibold" style={{ color: colors.accent }}>
              v1.0 Sprint 1
            </span>
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;