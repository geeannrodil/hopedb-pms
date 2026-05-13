import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// ─── Color tokens ─────────────────────────────────────────────────────────────
const colors = {
  primary:       '#1E3A5F',
  background:    '#F8FAFC',
  textPrimary:   '#1F2937',
  textSecondary: '#6B7280',
};

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  // 🔧 MAIN FIX: Proper async function + initial session check
  const checkUserStatus = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('userid, record_status, user_type')
        .eq('userid', userId)
        .maybeSingle();

      if (error || !data) {
        console.error('[AuthCallback] User not found:', error?.message);
        await supabase.auth.signOut();
        navigate('/login?error=not_found');
        return false;
      }

      if (data.record_status === 'ACTIVE') {
        // SUPERADMIN goes to admin dashboard
        if (data.user_type === 'SUPERADMIN') {
          navigate('/admin');
        } else {
          navigate('/products');
        }
        return true;
      } else {
        await supabase.auth.signOut();
        navigate('/login?error=inactive');
        return false;
      }
    } catch (err) {
      console.error('[AuthCallback] Error:', err);
      navigate('/login?error=auth_error');
      return false;
    }
  };

  useEffect(() => {
    // 1️⃣ Check current session FIRST (OAuth callback)
    const checkCurrentSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        await checkUserStatus(session.user.id);
      } else {
        navigate('/login');
      }
    };

    // 2️⃣ Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user?.id) {
          await checkUserStatus(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          navigate('/login');
        }
      }
    );

    // 3️⃣ Run initial check
    checkCurrentSession();

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: colors.background }}
    >
      <div className="flex flex-col items-center max-w-sm text-center">
        <div
          className="w-16 h-16 mb-8 rounded-2xl flex items-center justify-center animate-pulse"
          style={{
            backgroundColor: colors.primary,
            boxShadow: '0 4px 24px rgba(30,58,95,0.30)',
          }}
        >
          <span className="text-white text-2xl font-extrabold tracking-tight">P</span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <Loader2 size={22} className="animate-spin" style={{ color: colors.primary }} />
          <h2
            className="text-xl font-extrabold tracking-tight"
            style={{ color: colors.textPrimary }}
          >
            Verifying your account
          </h2>
        </div>

        <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
          Establishing a secure connection with HopePMS. Please wait while we check your access rights.
        </p>
      </div>
    </div>
  );
}