export default function AuthCallbackPage() {
  return <div className="p-10 text-2xl font-bold">Login Page</div>;
}import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          // Login guard — check if user is ACTIVE
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 font-medium">Verifying your account...</p>
      </div>
    </div>
  );
}
