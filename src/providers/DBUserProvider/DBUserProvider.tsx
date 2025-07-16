import useUserApi from "@/api/secure/useUserApi";
import { useAuth } from "@/hooks/useAuth/useAuth";
import type { dbUserType } from "@/types/dbUserType/dbUserType";
import { createContext, useEffect, useState, type ReactNode } from "react";

interface DBUserContextType {
  dbUser: dbUserType | null;
  setDBUser: (info: dbUserType | null) => void;
  updateCoinBalance: (value: number) => void;
  dbUserLoading: boolean;
  setDBUserLoading: (value: boolean) => void;
}

// Create context
export const DBUserContext = createContext<DBUserContextType | null>(null);

interface Props {
  children: ReactNode;
}

const DBUserProvider = ({ children }: Props) => {
  const { user, token, loading } = useAuth(); // Removed setLoading
  const { getUserInfoPromise } = useUserApi();

  const [dbUser, setDBUser] = useState<dbUserType | null>(null);
  const [dbUserLoading, setDBUserLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserInfoFromDB = async () => {
      setDBUserLoading(true);

      if (!user || !token) {
        setDBUser(null);
        setDBUserLoading(false);
        return;
      }

      try {
        const data = await getUserInfoPromise();
        if (data) {
          setDBUser(data);
        } else {
          setDBUser(null);
        }
      } catch (err) {
        console.error("Failed to fetch user info", err);
        setDBUser(null);
      } finally {
        setDBUserLoading(false);
      }
    };

    if (!loading) {
      fetchUserInfoFromDB();
    }
  }, [user, loading]);

  const updateCoinBalance = (value: number) => {
    if (dbUser) {
      const newCoinBalance = dbUser.coinBalance + value;
      setDBUser({ ...dbUser, coinBalance: newCoinBalance }); // no mutation
    }
  };

  const value: DBUserContextType = {
    dbUser,
    setDBUser,
    dbUserLoading,
    updateCoinBalance,
    setDBUserLoading,
  };

  return (
    <DBUserContext.Provider value={value}>{children}</DBUserContext.Provider>
  );
};

export default DBUserProvider;
