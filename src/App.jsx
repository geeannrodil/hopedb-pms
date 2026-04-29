import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loginSuccess, setLoginSuccess] = useState(false);

  const validateForm = () => {
    let newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginSuccess(false);

    if (validateForm()) {
      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
        setLoginSuccess(true);
      }, 1500);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 flex items-center justify-center p-6 overflow-hidden font-sans">

      {/* Background blobs (NO ORANGE) */}
      <div className="absolute w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl top-[-50px] left-[-50px]"></div>
      <div className="absolute w-72 h-72 bg-blue-300/20 rounded-full blur-3xl bottom-[-50px] right-[-50px]"></div>

      {/* Card */}
      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/80 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.12)] border border-white/40 p-10">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-[clamp(1.2rem,2.3vw,1.7rem)] font-semibold text-slate-900 tracking-tight whitespace-nowrap">
            Product Management System
          </h1>

          <div className="h-1 w-14 bg-gradient-to-r from-indigo-400 to-blue-500 mx-auto mt-3 rounded-full"></div>

          <p className="text-slate-500 mt-4 text-[10px] uppercase tracking-[0.2em] font-bold">
            Secure Login Portal
          </p>
        </div>

        {/* Success */}
        {loginSuccess && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-2 text-sm animate-in fade-in zoom-in duration-300">
            <CheckCircle2 size={18} />
            <span>Validation passed! Connecting to secure server...</span>
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>

          {/* Email */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1.5 ml-1 uppercase tracking-wide">
              Institutional Email
            </label>

            <div className="relative">
              <Mail className={`absolute left-3 top-3.5 w-4 h-4 ${errors.email ? 'text-red-400' : 'text-slate-400'}`} />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-white border ${errors.email ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none shadow-sm`}
                placeholder="user@neu.edu.ph"
              />
            </div>

            {errors.email && (
              <div className="flex items-center gap-1 mt-1 text-red-500 text-[10px] font-bold">
                <AlertCircle size={12} />
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1.5 ml-1 uppercase tracking-wide">
              Password
            </label>

            <div className="relative">
              <Lock className={`absolute left-3 top-3.5 w-4 h-4 ${errors.password ? 'text-red-400' : 'text-slate-400'}`} />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-12 py-3 bg-white border ${errors.password ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none shadow-sm`}
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <div className="flex items-center gap-1 mt-1 text-red-500 text-[10px] font-bold">
                <AlertCircle size={12} />
                <span>{errors.password}</span>
              </div>
            )}
          </div>

          {/* Login */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${isSubmitting ? 'bg-slate-400' : 'bg-slate-900 hover:bg-slate-800'} text-white font-bold py-3.5 rounded-xl shadow-lg active:scale-[0.98] transition-all`}
          >
            {isSubmitting ? 'AUTHENTICATING...' : 'SIGN IN'}
          </button>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="mx-4 text-slate-400 text-[9px] font-bold uppercase tracking-widest">
              Security Access
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full border border-slate-200 py-3 rounded-xl flex items-center justify-center gap-3 font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" />
            Sign in with Google
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-[11px] text-slate-500 mt-8">
          Need an account?
          <span className="text-indigo-600 font-semibold ml-1 hover:underline cursor-pointer">
            Contact Administrator
          </span>
        </p>

      </div>
    </div>
  );
}

export default App;
