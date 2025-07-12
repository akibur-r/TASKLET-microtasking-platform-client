import app from "@/firebase/firebase.init";
import type { User } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  getIdToken,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type Auth,
  type UserCredential,
} from "firebase/auth";

import { createContext, useEffect, useState, type ReactNode } from "react";

// Define the shape of data accepted by updateProfile
type UpdateProfileData = {
  displayName?: string | null;
  photoURL?: string | null;
};

// Create context type
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  updateUser: (data: UpdateProfileData) => Promise<void>;
  deleteUserFromFirebase: () => Promise<void>;
  logOut: () => Promise<void>;
  token: string | null;
}

// Create context
export const AuthContext = createContext<AuthContextType | null>(null);

const auth: Auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleAuthProvider);
  };

  const updateUser = (updatedData: UpdateProfileData) => {
    setLoading(true);
    if (!auth.currentUser) {
      return Promise.reject("No user is currently signed in");
    }
    return updateProfile(auth.currentUser, updatedData);
  };

  const deleteUserFromFirebase = () => {
    if (!auth.currentUser) {
      return Promise.reject("No user is currently signed in");
    }
    return deleteUser(auth.currentUser);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const newToken = await getIdToken(currentUser);
        setToken(newToken);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authData: AuthContextType = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    updateUser,
    deleteUserFromFirebase,
    logOut,
    token,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
