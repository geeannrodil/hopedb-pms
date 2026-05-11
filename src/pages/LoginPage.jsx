import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

function LoginPage({ onSwitch }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
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
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex items-center justify-center px-4 py-10 font-sans">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl p-8 sm:p-10">

        {/* Header */}
        <div className="text-center mb-8 px-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Product Management System
          </h1>
          <div className="h-1 w-12 bg-indigo-500 mx-auto mt-3 rounded-full"></div>
          <p className="text-sm text-slate-500 mt-4 font-medium uppercase tracking-wider">
            Secure Login Portal
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3 text-sm">
            <CheckCircle2 size={20} />
            <span>Authentication successful! Redirecting...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-2 ml-1 uppercase tracking-widest">
              Institutional Email
            </label>
            <div className="relative">
              <Mail className={`absolute left-4 top-3.5 w-5 h-5 ${errors.email ? 'text-red-400' : 'text-slate-400'}`} />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="user@neu.edu.ph"
                className={`w-full pl-12 pr-4 py-3.5 bg-white border ${errors.email ? 'border-red-300 ring-4 ring-red-50' : 'border-slate-200'} rounded-2xl outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm text-sm`}
              />
            </div>
            {errors.email && (
              <p className="mt-2 ml-1 text-red-500 text-[10px] font-bold flex items-center gap-1">
                <AlertCircle size={12} /> {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-2 ml-1 uppercase tracking-widest">
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-4 top-3.5 w-5 h-5 ${errors.password ? 'text-red-400' : 'text-slate-400'}`} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-12 pr-12 py-3.5 bg-white border ${errors.password ? 'border-red-300 ring-4 ring-red-50' : 'border-slate-200'} rounded-2xl outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm text-sm`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-[0.98] ${
              loading ? 'bg-slate-400' : 'bg-slate-900 hover:bg-slate-800 hover:shadow-indigo-200'
            }`}
          >
            {loading ? 'AUTHENTICATING...' : 'SIGN IN'}
          </button>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="mx-4 text-slate-400 text-[10px] font-bold uppercase">or</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3.5 border border-slate-200 rounded-2xl font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Sign in with Google
          </button>

        </form>

        <p className="text-center mt-10 text-xs text-slate-500 font-medium">
          New to the system?{' '}
          <button
            onClick={onSwitch}
            className="text-indigo-600 font-bold hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;