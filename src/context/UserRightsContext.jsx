import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

// ─── Context ──────────────────────────────────────────────────────────────────
const UserRightsContext = createContext(null);

// ─── Default rights map (all denied) ─────────────────────────────────────────
const DEFAULT_RIGHTS = {
  PRD_ADD:  0,
  PRD_EDIT: 0,
  PRD_DEL:  0,
  REP_001:  0,
  REP_002:  0,
  ADM_USER: 0,
};

// ─── Provider ─────────────────────────────────────────────────────────────────
export function UserRightsProvider({ children }) {
  const { currentUser } = useAuth();
  const [rights, setRights]           = useState(DEFAULT_RIGHTS);
  const [userType, setUserType]       = useState(null);
  const [appUserId, setAppUserId]     = useState(null); 
  const [rightsLoading, setRightsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setRights(DEFAULT_RIGHTS);
      setUserType(null);
      setAppUserId(null);
      setRightsLoading(false);
      return;
    }

    async function fetchRights() {
      setRightsLoading(true);

      // ─── PHASE 2 FIX: UUID LOOKUP ──────────────────────────────────────────
      // Ginagamit na natin ang currentUser.id (UUID) dahil ito na ang naka-save
      // sa public.users.userid via database trigger.
      // ──────────────────────────────────────────────────────────────────────
      
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('userid, user_type, record_status') // Lowercase columns
        .eq('userid', currentUser.id) // Match UUID
        .single();

      if (userError || !userData) {
        console.error('[UserRightsContext] Failed to fetch user row:', userError?.message);
        setRightsLoading(false);
        return;
      }

      setAppUserId(userData.userid);
      setUserType(userData.user_type);

      // ─── Fetch per-user rights (Lowercased query) ────────────────────────
      const { data: rightsData, error: rightsError } = await supabase
        .from('usermodule_rights')
        .select('right_id, right_value')
        .eq('userid', userData.userid)          
        .eq('record_status', 'ACTIVE');

      if (rightsError) {
        console.error('[UserRightsContext] Failed to fetch rights:', rightsError?.message);
        setRightsLoading(false);
        return;
      }

      // Build rights map: { PRD_ADD: 1, PRD_DEL: 0, ... }
      const map = { ...DEFAULT_RIGHTS };
      for (const row of rightsData) {
        // row.right_id ay string value (e.g., 'PRD_ADD') kaya mag-ma-match ito 
        // sa keys ng DEFAULT_RIGHTS kahit lowercase ang column name.
        map[row.right_id] = row.right_value; 
      }

      setRights(map);
      setRightsLoading(false);
    }

    fetchRights();
  }, [currentUser]);

  return (
    <UserRightsContext.Provider value={{ rights, userType, appUserId, rightsLoading }}>
      {children}
    </UserRightsContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useRights = () => {
  const ctx = useContext(UserRightsContext);
  if (!ctx) throw new Error('useRights must be used inside UserRightsProvider');
  return ctx;
};