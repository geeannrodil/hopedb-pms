import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Loader2,
  LayoutDashboard
} from 'lucide-react';

function LoginPage() {
  const navigate = useNavigate();

  // M4's Backend State Logic
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!form.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }
    if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  // M4's Supabase Authentication
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    
    if (error) {
      setErrors({ email: error.message });
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => navigate('/products'), 1000);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center px-4 py-10 font-sans text-gray-800">
      
      {/* Main Card */}
      <div className="w-full max-w-md bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl p-8 sm:p-10 relative overflow-hidden">
        
        {/* Soft gold glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-[#D4AF37]/10 blur-3xl rounded-full pointer-events-none"></div>

        {/* Header */}
        <div className="text-center mb-10 relative z-10">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-yellow-50/50 border border-yellow-100 flex items-center justify-center shadow-sm">
            <LayoutDashboard className="w-8 h-8 text-[#D4AF37]" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
            Welcome to HopePMS
          </h1>
          <p className="text-sm text-gray-500 mt-3 max-w-[260px] mx-auto leading-relaxed">
            Sign in to manage your inventory and streamline operations.
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3 text-sm animate-in fade-in zoom-in duration-300">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <span className="font-medium">Authentication successful! Redirecting...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          
          {/* Email Input */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 mb-2 ml-1 uppercase tracking-widest">
              Institutional Email
            </label>
            <div className="relative">
              <Mail className={`absolute left-4 top-3.5 w-5 h-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jcesperanza@neu.edu.ph"
                disabled={loading || success}
                className={`w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border ${errors.email ? 'border-red-300 ring-4 ring-red-50' : 'border-gray-200'} rounded-2xl outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-4 focus:ring-yellow-50 transition-all text-sm`}
              />
            </div>
            {errors.email && (
              <p className="mt-2 ml-1 text-red-500 text-[10px] font-bold flex items-center gap-1">
                <AlertCircle size={12} /> {errors.email}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-2 ml-1">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                Password
              </label>
              <button type="button" className="text-[11px] font-bold text-[#D4AF37] hover:text-[#C5A028] transition-colors">
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock className={`absolute left-4 top-3.5 w-5 h-5 ${errors.password ? 'text-red-400' : 'text-gray-400'}`} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={loading || success}
                className={`w-full pl-12 pr-12 py-3.5 bg-gray-50/50 border ${errors.password ? 'border-red-300 ring-4 ring-red-50' : 'border-gray-200'} rounded-2xl outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-4 focus:ring-yellow-50 transition-all text-sm`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 ml-1 text-red-500 text-[10px] font-bold flex items-center gap-1">
                <AlertCircle size={12} /> {errors.password}
              </p>
            )}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading || success}
            className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 bg-[#D4AF37] hover:bg-[#C5A028] text-white rounded-2xl font-semibold transition-all shadow-[0_4px_14px_0_rgba(212,175,55,0.39)] active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? 'AUTHENTICATING...' : 'SIGN IN'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center py-6">
          <div className="flex-grow border-t border-gray-100"></div>
          <span className="mx-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest">or</span>
          <div className="flex-grow border-t border-gray-100"></div>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading || success}
          className="w-full flex items-center justify-center gap-3 py-3.5 border border-gray-200 rounded-2xl font-medium text-gray-700 hover:bg-gray-50 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-center mt-8 text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            disabled={loading || success}
            className="text-[#D4AF37] hover:text-[#C5A028] font-semibold transition-colors"
          >
            Create account
          </button>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;