import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [auth, setAuth] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (user) {
      if (user.errors) {
        setAuth(false);
        setLoading(false);
        return;
      }
      setAuth(true);
    } else {
      setAuth(false);
    }

    setLoading(false);
  }, [user]);

  return { auth, loading };
};
