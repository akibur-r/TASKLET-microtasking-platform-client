import { AuthContext } from "@/providers/AuthProvider/AuthProvider";
import { useContext } from "react";

// Optional: custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
