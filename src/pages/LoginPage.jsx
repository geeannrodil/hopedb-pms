import React, { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  success:       '#10B981',
};

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState(null);
  const navigate = useNavigate();

  const handleAuthSimulation = (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/products'), 1000);
    }, 1500);
  };

  const inputStyle = (name) => ({
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    backgroundColor: colors.background,
    border: `1.5px solid ${focused === name ? colors.accent : colors.border}`,
    color: colors.textPrimary,
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
    boxShadow: focused === name ? `0 0 0 3px rgba(91,192,190,0.15)` : 'none',
    fontFamily: 'inherit',
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ backgroundColor: colors.background }}
    >
      {/* Card */}
      <div
        className="w-full max-w-md"
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 8px 40px rgba(30,58,95,0.10)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-9">
          {/* Logo */}
          <div
            className="w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center"
            style={{
              backgroundColor: colors.primary,
              boxShadow: '0 4px 16px rgba(30,58,95,0.25)',
            }}
          >
            <span className="text-white text-xl font-extrabold tracking-tight">P</span>
          </div>

          <h1
            className="text-2xl font-extrabold tracking-tight"
            style={{ color: colors.textPrimary }}
          >
            Product Management System
          </h1>
          <p className="text-sm mt-2.5" style={{ color: colors.textSecondary }}>
            Sign in to manage your inventory, track products, and streamline operations.
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div
            className="mb-6 p-4 flex items-center gap-3 text-sm rounded-xl"
            style={{
              backgroundColor: '#ECFDF5',
              border: `1px solid #A7F3D0`,
              color: colors.success,
            }}
          >
            <CheckCircle2 size={17} />
            <span>Authentication successful! Redirecting to dashboard...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleAuthSimulation} className="flex flex-col gap-3.5">

          <input
            type="email"
            placeholder="Email address"
            required
            disabled={loading || success}
            style={inputStyle('email')}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            disabled={loading || success}
            style={inputStyle('password')}
            onFocus={() => setFocused('password')}
            onBlur={() => setFocused(null)}
          />

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm font-medium transition-colors"
              style={{ color: colors.secondary }}
              onMouseEnter={e => e.currentTarget.style.color = colors.primary}
              onMouseLeave={e => e.currentTarget.style.color = colors.secondary}
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading || success}
            className="mt-1 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all active:scale-[0.98] disabled:opacity-60"
            style={{
              backgroundColor: colors.primary,
              boxShadow: '0 4px 14px rgba(30,58,95,0.30)',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={e => { if (!loading && !success) e.currentTarget.style.backgroundColor = colors.primaryHover; }}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = colors.primary}
          >
            {loading && <Loader2 size={17} className="animate-spin" />}
            {loading ? 'Signing In…' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px" style={{ backgroundColor: colors.border }} />
          <span
            className="text-[11px] font-semibold uppercase tracking-widest"
            style={{ color: colors.textSecondary }}
          >
            or
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: colors.border }} />
        </div>

        {/* Google Button */}
        <button
          onClick={() => navigate('/auth/callback')}
          disabled={loading || success}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-medium text-sm transition-all active:scale-[0.98] disabled:opacity-60"
          style={{
            backgroundColor: colors.surface,
            border: `1.5px solid ${colors.border}`,
            color: colors.textPrimary,
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = colors.background}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = colors.surface}
        >
          {!loading && (
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
          )}
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-center mt-7 text-sm" style={{ color: colors.textSecondary }}>
          Don&apos;t have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            disabled={loading || success}
            className="font-semibold transition-colors"
            style={{ color: colors.primary }}
            onMouseEnter={e => e.currentTarget.style.color = colors.secondary}
            onMouseLeave={e => e.currentTarget.style.color = colors.primary}
          >
            Create account
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;