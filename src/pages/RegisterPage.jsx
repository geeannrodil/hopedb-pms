import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

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
  error:         '#EF4444',
};

function RegisterPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', username: '', email: '', password: '' });
  const [errors, setErrors]             = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [success, setSuccess]           = useState(false);
  const [focused, setFocused]           = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim())  newErrors.lastName  = 'Last name is required';
    if (!form.username.trim())  newErrors.username  = 'Username is required';
    if (!form.email.trim())     newErrors.email     = 'Email is required';
    else if (!form.email.includes('@') || !form.email.includes('.')) newErrors.email = 'Please enter a valid email';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
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
    setErrors({});

    try {
      // 🚀 AUTO-TRIGGER: Creates users + rights tables!
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            firstName: form.firstName.trim(),
            lastName:  form.lastName.trim(),
            username:  form.username.trim(),
          },
        },
      });

      if (authError) throw authError;

      // Success! Database trigger already provisioned everything
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);

    } catch (err) {
      console.error('[Register] Error:', err);
      setErrors({ form: err.message.includes('already') ? 'Email already registered' : err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const inputStyle = (name) => ({
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    backgroundColor: colors.background,
    border: `1.5px solid ${errors[name] ? '#FCA5A5' : (focused === name ? colors.accent : colors.border)}`,
    color: colors.textPrimary,
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
    boxShadow: focused === name && !errors[name]
      ? `0 0 0 3px rgba(91,192,190,0.15)`
      : (errors[name] ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none'),
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10" style={{ backgroundColor: colors.background }}>
      <div className="w-full max-w-lg" style={{ 
        backgroundColor: colors.surface, 
        border: `1px solid ${colors.border}`, 
        borderRadius: '20px', 
        padding: '40px', 
        boxShadow: '0 8px 40px rgba(30,58,95,0.10)' 
      }}>

        {/* Header */}
        <div className="text-center mb-9">
          <div className="w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center" style={{ 
            backgroundColor: colors.primary, 
            boxShadow: '0 4px 16px rgba(30,58,95,0.25)' 
          }}>
            <span className="text-white text-xl font-extrabold tracking-tight">P</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: colors.textPrimary }}>Create Account</h1>
          <p className="text-sm mt-2.5" style={{ color: colors.textSecondary }}>
            Join HopePMS. Admin will activate your account after verification.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 flex items-center gap-3 text-sm rounded-xl" style={{ 
            backgroundColor: '#ECFDF5', 
            border: `1px solid #A7F3D0`, 
            color: colors.success 
          }}>
            <CheckCircle2 size={17} className="min-w-[17px]" />
            <span>Account created! Check your email and wait for admin approval.</span>
          </div>
        )}
        
        {/* Error Message */}
        {errors.form && (
          <div className="mb-6 p-4 flex items-center gap-3 text-sm rounded-xl" style={{ 
            backgroundColor: '#FEF2F2', 
            border: `1px solid #FECACA`, 
            color: colors.error 
          }}>
            <AlertCircle size={17} className="min-w-[17px]" />
            <span>{errors.form}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Names Row */}
          <div className="flex flex-col sm:flex-row gap-3.5">
            <div className="w-full">
              <input 
                type="text" 
                name="firstName" 
                value={form.firstName} 
                onChange={handleChange} 
                placeholder="First Name" 
                disabled={loading || success} 
                style={inputStyle('firstName')} 
                onFocus={() => setFocused('firstName')} 
                onBlur={() => setFocused(null)} 
              />
              {errors.firstName && (
                <p className="mt-1 ml-1 text-[10px] font-semibold text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className="w-full">
              <input 
                type="text" 
                name="lastName" 
                value={form.lastName} 
                onChange={handleChange} 
                placeholder="Last Name" 
                disabled={loading || success} 
                style={inputStyle('lastName')} 
                onFocus={() => setFocused('lastName')} 
                onBlur={() => setFocused(null)} 
              />
              {errors.lastName && (
                <p className="mt-1 ml-1 text-[10px] font-semibold text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Username */}
          <div>
            <input 
              type="text" 
              name="username" 
              value={form.username} 
              onChange={handleChange} 
              placeholder="Username (e.g., john.doe)" 
              disabled={loading || success} 
              style={inputStyle('username')} 
              onFocus={() => setFocused('username')} 
              onBlur={() => setFocused(null)} 
            />
            {errors.username && (
              <p className="mt-1 ml-1 text-[10px] font-semibold text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input 
              type="email" 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              placeholder="Institutional Email (e.g., user@school.edu)" 
              disabled={loading || success} 
              style={inputStyle('email')} 
              onFocus={() => setFocused('email')} 
              onBlur={() => setFocused(null)} 
            />
            {errors.email && (
              <p className="mt-1 ml-1 text-[10px] font-semibold text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input 
              type={showPassword ? 'text' : 'password'} 
              name="password" 
              value={form.password} 
              onChange={handleChange} 
              placeholder="Create Password" 
              disabled={loading || success} 
              style={{...inputStyle('password'), paddingRight: '45px'}} 
              onFocus={() => setFocused('password')} 
              onBlur={() => setFocused(null)} 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-3 top-[18px] text-gray-400 hover:text-gray-600"
              disabled={loading || success}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="mt-1 ml-1 text-[10px] font-semibold text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            disabled={loading || success} 
            className="mt-1 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all active:scale-[0.98] disabled:opacity-60" 
            style={{ 
              backgroundColor: colors.primary, 
              boxShadow: '0 4px 14px rgba(30,58,95,0.30)' 
            }}
          >
            {loading && <Loader2 size={17} className="animate-spin" />}
            {loading ? 'Creating Account…' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px" style={{ backgroundColor: colors.border }} />
          <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: colors.textSecondary }}>or</span>
          <div className="flex-1 h-px" style={{ backgroundColor: colors.border }} />
        </div>

        {/* Google */}
        <button 
          onClick={handleGoogleRegister} 
          disabled={loading || success} 
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-medium text-sm transition-all active:scale-[0.98] disabled:opacity-60" 
          style={{ 
            backgroundColor: colors.surface, 
            border: `1.5px solid ${colors.border}`, 
            color: colors.textPrimary 
          }}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        {/* Back to Login */}
        <button 
          onClick={() => navigate('/login')} 
          disabled={loading || success} 
          className="mt-7 w-full flex items-center justify-center gap-2 text-sm font-medium transition-colors disabled:opacity-50" 
          style={{ color: colors.textSecondary }}
        >
          <ArrowLeft size={15} /> Back to Login
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;