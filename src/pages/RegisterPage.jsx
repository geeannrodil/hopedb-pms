import React, { useState } from 'react';
import { 
  UserCircle, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft 
} from 'lucide-react';

function RegisterPage({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const inputStyle = "w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm text-sm";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex items-center justify-center px-4 py-10 font-sans">
      <div className="w-full max-w-lg bg-white/70 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl p-8 sm:p-10">
        
        {/* Header - Fixed to prevent overflow */}
        <div className="text-center mb-8 px-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Create Account
          </h1>
          <div className="h-1 w-12 bg-indigo-500 mx-auto mt-3 rounded-full"></div>
          <p className="text-sm text-slate-500 mt-4 font-medium uppercase tracking-wider">
            Product Management System
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          
          {/* Name Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm text-sm"
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm text-sm"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Username */}
          <div className="relative">
            <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className={inputStyle}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={inputStyle}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className={`${inputStyle} pr-12`}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold shadow-lg hover:bg-slate-800 transition-all active:scale-[0.98]"
          >
            Create Account
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