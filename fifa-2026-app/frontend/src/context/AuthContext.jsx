import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.user) {
      setProfile(null);
      return;
    }
    supabase
      .from('user_profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()
      .then(({ data }) => setProfile(data));
  }, [session]);

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider value={{ session, profile, signOut, loading: session === undefined }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
