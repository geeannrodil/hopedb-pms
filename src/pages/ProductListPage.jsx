import React from 'react';

// ─── Color tokens ─────────────────────────────────────────────────────────────
const colors = {
  primary:       '#1E3A5F',
  accent:        '#5BC0BE',
  surface:       '#FFFFFF',
  textPrimary:   '#1F2937',
  textSecondary: '#6B7280',
  border:        '#E5E7EB',
  background:    '#F8FAFC',
};

export default function ProductListPage() {
  return (
    <div className="p-4 sm:p-2">
      <h1
        className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6"
        style={{ color: colors.textPrimary }}
      >
        Products
      </h1>

      {/* Placeholder Content Area */}
      <div
        className="flex flex-col items-center justify-center min-h-[420px] rounded-2xl"
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          boxShadow: '0 2px 12px rgba(30,58,95,0.06)',
        }}
      >
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
          style={{ backgroundColor: '#EEF4FA', color: colors.accent }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
        </div>

        <h2
          className="text-base font-bold mb-2"
          style={{ color: colors.textPrimary }}
        >
          Product List Coming Soon
        </h2>

        <p
          className="text-sm text-center max-w-sm"
          style={{ color: colors.textSecondary }}
        >
          This is where the main data table and CRUD operations will live in Sprint 2.
        </p>

        {/* Accent decoration */}
        <div
          className="mt-6 h-0.5 w-16 rounded-full"
          style={{ backgroundColor: colors.accent }}
        />
      </div>
    </div>
  );
}