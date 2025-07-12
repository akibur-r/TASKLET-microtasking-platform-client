import useUserApi from "@/api/useUserApi";
import { useAuth } from "@/hooks/useAuth/useAuth";
import { createContext, useEffect, useState, type ReactNode } from "react";

// Define shape of user info (customize according to your backend)
interface dbUser {
  _id?: string;
  name: string;
  email: string;
  role: string;
  coinBalance: number;
}

interface DBUserContextType {
  dbUser: dbUser | null;
  setDBUser: (info: dbUser | null) => void;
  dbUserLoading: boolean;
}

// Create context
export const DBUserContext = createContext<DBUserContextType | null>(null);

interface Props {
  children: ReactNode;
}

const DBUserProvider = ({ children }: Props) => {
  const { user, token, loading, setLoading } = useAuth();
  const { getUserInfoPromise } = useUserApi();

  const [dbUser, setDBUser] = useState<dbUser | null>(null);
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
        setDBUserLoading(true);
        const data = await getUserInfoPromise();
        setDBUser(data);
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
  }, [user, token, loading]);

  useEffect(() => {
    if (!dbUserLoading) {
      setLoading(false);
    }
  }, [dbUserLoading, setLoading]);

  const value: DBUserContextType = {
    dbUser,
    setDBUser,
    dbUserLoading
  };

  return (
    <DBUserContext.Provider value={value}>{children}</DBUserContext.Provider>
  );
};

export default DBUserProvider;
