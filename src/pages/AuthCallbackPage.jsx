import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── Color tokens ─────────────────────────────────────────────────────────────
const colors = {
  primary:       '#1E3A5F',
  background:    '#F8FAFC',
  textPrimary:   '#1F2937',
  textSecondary: '#6B7280',
};

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating the secure connection/auth check delay
    // In production, replace this with your actual Firebase/Supabase auth state listener
    const authTimer = setTimeout(() => {
      navigate('/products');
    }, 2500);

    return () => clearTimeout(authTimer);
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: colors.background }}
    >
      <div className="flex flex-col items-center max-w-sm text-center">
        {/* Pulsing Logo */}
        <div
          className="w-16 h-16 mb-8 rounded-2xl flex items-center justify-center animate-pulse"
          style={{
            backgroundColor: colors.primary,
            boxShadow: '0 4px 24px rgba(30,58,95,0.30)',
          }}
        >
          <span className="text-white text-2xl font-extrabold tracking-tight">P</span>
        </div>

        {/* Loading text and spinner */}
        <div className="flex items-center gap-3 mb-3">
          <Loader2 size={22} className="animate-spin" style={{ color: colors.primary }} />
          <h2
            className="text-xl font-extrabold tracking-tight"
            style={{ color: colors.textPrimary }}
          >
            Authenticating
          </h2>
        </div>

        <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
          Establishing a secure connection with Google. Please wait a moment while we set up your workspace.
        </p>
      </div>
    </div>
  );
}

export default AuthCallback;