import { DBUserContext } from "@/providers/DBUserProvider/DBUserProvider";
import { useContext } from "react";

export const useDBUser = () => {
  const context = useContext(DBUserContext);
  if (!context) {
    throw new Error("useUserInfo must be used within a UserInfoProvider");
  }
  return context;
};
