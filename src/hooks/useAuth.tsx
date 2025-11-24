import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";

// Mock implementation until Supabase client is properly configured
export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // For now, automatically set a mock session to bypass auth
    setSession({ user: { id: "mock-user" } } as Session);
    setLoading(false);
  }, []);

  const signOut = async () => {
    setSession(null);
  };

  return { session, loading, signOut };
};