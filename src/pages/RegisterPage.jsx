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
  LayoutDashboard,
  ArrowLeft,
  User
} from 'lucide-react';

function RegisterPage() {
  const navigate = useNavigate();

  // M4's Backend State Logic
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = 'First name is required';
    if (!form.lastName) newErrors.lastName = 'Last name is required';
    if (!form.username) newErrors.username = 'Username is required';
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

  // M4's Supabase Registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          firstName: form.firstName,
          lastName: form.lastName,
          username: form.username,
        },
      },
    });
    
    if (error) {
      setErrors({ email: error.message });
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  // Common input styling for the elegant theme
  const inputStyle = "w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-[#D4AF37] focus:ring-4 focus:ring-yellow-50 transition-all text-sm";

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center px-4 py-10 font-sans text-gray-800">
      
      {/* Main Card */}
      <div className="w-full max-w-lg bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl p-8 sm:p-10 relative overflow-hidden">
        
        {/* Soft gold glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-[#D4AF37]/10 blur-3xl rounded-full pointer-events-none"></div>

        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-yellow-50/50 border border-yellow-100 flex items-center justify-center shadow-sm">
            <LayoutDashboard className="w-8 h-8 text-[#D4AF37]" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
            Create an Account
          </h1>
          <p className="text-sm text-gray-500 mt-3 max-w-[280px] mx-auto leading-relaxed">
            Join HopePMS to organize, track, and scale your operations.
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3 text-sm animate-in fade-in zoom-in duration-300">
            <CheckCircle2 size={20} className="shrink-0" />
            <span className="font-medium">Registration successful! Please check your email or wait for admin activation.</span>
          </div>
        )}

        {/* Form */}
        <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
          
          {/* Name Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                disabled={loading || success}
                className={`${inputStyle} ${errors.firstName ? 'border-red-300 ring-4 ring-red-50' : ''}`}
              />
              {errors.firstName && (
                <p className="mt-1 ml-1 text-red-500 text-[10px] font-bold flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.firstName}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                disabled={loading || success}
                className={`${inputStyle} ${errors.lastName ? 'border-red-300 ring-4 ring-red-50' : ''}`}
              />
              {errors.lastName && (
                <p className="mt-1 ml-1 text-red-500 text-[10px] font-bold flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Username */}
          <div className="relative">
            <User className={`absolute left-4 top-3.5 w-5 h-5 ${errors.username ? 'text-red-400' : 'text-gray-400'}`} />
            <input
              type="text"
              name="username"
              placeholder="Workspace Username"
              value={form.username}
              onChange={handleChange}
              disabled={loading || success}
              className={`pl-12 ${inputStyle} ${errors.username ? 'border-red-300 ring-4 ring-red-50' : ''}`}
            />
            {errors.username && (
              <p className="mt-1 ml-1 text-red-500 text-[10px] font-bold flex items-center gap-1">
                <AlertCircle size={12} /> {errors.username}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className={`absolute left-4 top-3.5 w-5 h-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
            <input
              type="email"
              name="email"
              placeholder="Institutional Email (e.g. user@neu.edu.ph)"
              value={form.email}
              onChange={handleChange}
              disabled={loading || success}
              className={`pl-12 ${inputStyle} ${errors.email ? 'border-red-300 ring-4 ring-red-50' : ''}`}
            />
            {errors.email && (
              <p className="mt-1 ml-1 text-red-500 text-[10px] font-bold flex items-center gap-1">
                <AlertCircle size={12} /> {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className={`absolute left-4 top-3.5 w-5 h-5 ${errors.password ? 'text-red-400' : 'text-gray-400'}`} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password (min. 6 characters)"
              value={form.password}
              onChange={handleChange}
              disabled={loading || success}
              className={`pl-12 pr-12 ${inputStyle} ${errors.password ? 'border-red-300 ring-4 ring-red-50' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="mt-1 ml-1 text-red-500 text-[10px] font-bold flex items-center gap-1">
                <AlertCircle size={12} /> {errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || success}
            className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 bg-[#D4AF37] hover:bg-[#C5A028] text-white rounded-2xl font-semibold transition-all shadow-[0_4px_14px_0_rgba(212,175,55,0.39)] active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
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
          onClick={handleGoogleRegister}
          disabled={loading || success}
          className="w-full flex items-center justify-center gap-3 py-3.5 border border-gray-200 rounded-2xl font-medium text-gray-700 hover:bg-gray-50 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        {/* Footer */}
        <button
          onClick={() => navigate('/login')}
          disabled={loading || success}
          className="mt-8 w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors disabled:opacity-50"
        >
          <ArrowLeft size={16} />
          Back to Login
        </button>
        
      </div>
    </div>
  );
}

export default RegisterPage;