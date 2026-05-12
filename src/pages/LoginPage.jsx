import React, { useState } from 'react';
import { ArrowLeft, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const colors = {
  primary:       '#1E3A5F',
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

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const authError = searchParams.get('error');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = 'Email is required';
    else if (!form.email.includes('@')) newErrors.email = 'Please enter a valid email';
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
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    if (error) {
      setErrors({ form: error.message });
      setLoading(false);
    } else {
      setTimeout(() => navigate('/auth/callback'), 500);
    }
  };

  const handleGoogleLogin = async () => {
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
    boxShadow: focused === name && !errors[name] ? `0 0 0 3px rgba(91,192,190,0.15)` : (errors[name] ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none'),
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10" style={{ backgroundColor: colors.background }}>
      <div className="w-full max-w-md" style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}`, borderRadius: '20px', padding: '40px', boxShadow: '0 8px 40px rgba(30,58,95,0.10)' }}>

        {/* Header */}
        <div className="text-center mb-9">
          <div className="w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center" style={{ backgroundColor: colors.primary, boxShadow: '0 4px 16px rgba(30,58,95,0.25)' }}>
            <span className="text-white text-xl font-extrabold tracking-tight">P</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: colors.textPrimary }}>HopePMS Login</h1>
          <p className="text-sm mt-2.5" style={{ color: colors.textSecondary }}>Sign in to manage your inventory and workspace.</p>
        </div>

        {/* Alerts */}
        {authError === 'not_found' && (
          <div className="mb-6 p-4 flex items-center gap-3 text-sm rounded-xl" style={{ backgroundColor: '#FEF2F2', border: `1px solid #FECACA`, color: colors.error }}>
            <AlertCircle size={17} />
            <span>Account not found. Please register first.</span>
          </div>
        )}
        {authError === 'inactive' && (
          <div className="mb-6 p-4 flex items-center gap-3 text-sm rounded-xl" style={{ backgroundColor: '#FFFBEB', border: `1px solid #FDE68A`, color: '#D97706' }}>
            <AlertCircle size={17} />
            <span>Your account is pending admin approval.</span>
          </div>
        )}
        {errors.form && (
          <div className="mb-6 p-4 flex items-center gap-3 text-sm rounded-xl" style={{ backgroundColor: '#FEF2F2', border: `1px solid #FECACA`, color: colors.error }}>
            <AlertCircle size={17} />
            <span>{errors.form}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Institutional Email" disabled={loading} style={inputStyle('email')} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />
            {errors.email && <p className="mt-1.5 ml-1 text-[11px] font-semibold text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.email}</p>}
          </div>

          <div>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="Password" disabled={loading} style={{ ...inputStyle('password'), paddingRight: '45px' }} onFocus={() => setFocused('password')} onBlur={() => setFocused(null)} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[18px] text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="mt-1.5 ml-1 text-[11px] font-semibold text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.password}</p>}
          </div>

          <button type="submit" disabled={loading} className="mt-1 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all active:scale-[0.98] disabled:opacity-60" style={{ backgroundColor: colors.primary, boxShadow: '0 4px 14px rgba(30,58,95,0.30)' }}>
            {loading && <Loader2 size={17} className="animate-spin" />}
            {loading ? 'Signing In…' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px" style={{ backgroundColor: colors.border }} />
          <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: colors.textSecondary }}>or</span>
          <div className="flex-1 h-px" style={{ backgroundColor: colors.border }} />
        </div>

        <button onClick={handleGoogleLogin} disabled={loading} className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-medium text-sm transition-all active:scale-[0.98] disabled:opacity-60" style={{ backgroundColor: colors.surface, border: `1.5px solid ${colors.border}`, color: colors.textPrimary }}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <p className="text-center mt-7 text-sm" style={{ color: colors.textSecondary }}>
          Don&apos;t have an account?{' '}
          <button onClick={() => navigate('/register')} disabled={loading} className="font-semibold transition-colors" style={{ color: colors.primary }}>Create account</button>
        </p>
      </div>
    </div>
  );
}