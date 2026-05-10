import React, { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#EEF2FF] to-[#F5F3FF] flex items-center justify-center px-4 py-10 font-sans">

      {/* Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-3xl p-8 sm:p-10">

        {/* Header */}
        <div className="text-center mb-10">

          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-200">
            <span className="text-white text-2xl font-bold">P</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Product Management System
          </h1>

          <p className="text-sm text-gray-500 mt-3">
            Sign in to manage your inventory, track products, and streamline operations.
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3 text-sm animate-in fade-in zoom-in">
            <CheckCircle2 size={18} className="text-emerald-600" />
            <span>Authentication successful! Redirecting to dashboard...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleAuthSimulation} className="flex flex-col gap-4">

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            required
            disabled={loading || success}
            className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            required
            disabled={loading || success}
            className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
          />

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-violet-500 hover:text-violet-700 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading || success}
            className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-violet-500 to-indigo-500 hover:opacity-90 text-white rounded-2xl font-semibold transition-all shadow-lg shadow-violet-200 active:scale-[0.98] disabled:opacity-70"
          >
            {loading && (
              <Loader2 size={18} className="animate-spin" />
            )}

            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-7">
          <div className="flex-1 h-px bg-gray-200"></div>

          <span className="text-xs text-gray-400 uppercase tracking-[0.2em]">
            OR
          </span>

          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Google Button */}
        <button
          onClick={() => handleAuthSimulation()}
          disabled={loading || success}
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium transition-all active:scale-[0.98]"
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
        <p className="text-center mt-8 text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            disabled={loading || success}
            className="text-violet-600 hover:text-violet-800 font-semibold transition-colors"
          >
            Create account
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;