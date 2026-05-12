import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const colors = {
  primary:       '#1E3A5F',
  background:    '#F8FAFC',
  textPrimary:   '#1F2937',
  textSecondary: '#6B7280',
};

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          const { data, error } = await supabase
            .from("user")
            .select("record_status")
            .eq("userId", session.user.id)
            .single();

          if (error) {
            await supabase.auth.signOut();
            navigate("/login?error=not_found");
            return;
          }

          if (data?.record_status === "ACTIVE") {
            navigate("/products");
          } else {
            await supabase.auth.signOut();
            navigate("/login?error=inactive");
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

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
            Authenticating
          </h2>
        </div>

        <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
          Establishing a secure connection. Please wait while we verify your account.
        </p>
      </div>
    </div>
  );
}