import { useEffect } from 'react';

import supabase from '@/services/supabase';

import useAuth from '@/store/useAuth';

function useInitlizeAuth() {
  const setUser = useAuth((state) => state.setUser);
  const setLoading = useAuth((state) => state.setLoading);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      // if user logged out then set user to null
      if (!session) {
        setUser(null);
        setLoading(false);
        return;
      }
      setUser(session.user);
      setLoading(false);
    });

    return () => authListener.subscription.unsubscribe();
  }, [setUser, setLoading]);
}

export default useInitlizeAuth;
