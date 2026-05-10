import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  UserCircle,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

function RegisterPage({ onSwitch }) {
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
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const inputStyle = "w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm text-sm";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex items-center justify-center px-4 py-10 font-sans">
      <div className="w-full max-w-lg bg-white/70 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl p-8 sm:p-10">

        {/* Header */}
        <div className="text-center mb-8 px-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Create Account
          </h1>
          <div className="h-1 w-12 bg-indigo-500 mx-auto mt-3 rounded-full"></div>
          <p className="text-sm text-slate-500 mt-4 font-medium uppercase tracking-wider">
            Product Management System
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3 text-sm">
            <CheckCircle2 size={20} />
            <span>Registration successful! Please wait for admin activation.</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Name Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-3.5 bg-white border ${errors.firstName ? 'border-red-300 ring-4 ring-red-50' : 'border-slate-200'} rounded-2xl outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm text-sm`}
              />
              {errors.firstName && (
                <p className="mt-1 text-red-500 text-[10px] font-bold flex items-center gap-1">
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
                className={`w-full px-4 py-3.5 bg-white border ${errors.lastName ? 'border-red-300 ring-4 ring-red-50' : 'border-slate-200'} rounded-2xl outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm text-sm`}
              />
              {errors.lastName && (
                <p className="mt-1 text-red-500 text-[10px] font-bold flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Username */}
          <div className="relative">
            <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className={`${inputStyle} ${errors.username ? 'border-red-300 ring-4 ring-red-50' : ''}`}
            />
            {errors.username && (
              <p className="mt-1 text-red-500 text-[10px] font-bold flex items-center gap-1">
                <AlertCircle size={12} /> {errors.username}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={`${inputStyle} ${errors.email ? 'border-red-300 ring-4 ring-red-50' : ''}`}
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-[10px] font-bold flex items-center gap-1">
                <AlertCircle size={12} /> {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={`${inputStyle} pr-12 ${errors.password ? 'border-red-300 ring-4 ring-red-50' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="mt-1 text-red-500 text-[10px] font-bold flex items-center gap-1">
                <AlertCircle size={12} /> {errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-[0.98] ${
              loading ? 'bg-slate-400' : 'bg-slate-900 hover:bg-slate-800'
            }`}
          >
            {loading ? 'CREATING ACCOUNT...' : 'Create Account'}
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
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-3 py-3.5 border border-slate-200 rounded-2xl font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Register with Google
          </button>

        </form>

        <button
          onClick={onSwitch}
          className="mt-8 w-full flex items-center justify-center gap-2 text-sm text-slate-500 font-medium hover:text-indigo-600 transition-all"
        >
          <ArrowLeft size={16} />
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;