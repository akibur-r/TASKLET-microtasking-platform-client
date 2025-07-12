import { useAuth } from "@/hooks/useAuth/useAuth";
import { toast } from "sonner";

type SignOutOptions = {
  setDrawerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const useSignOut = ({ setDrawerOpen }: SignOutOptions = {}) => {
  const { logOut } = useAuth();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success("Signed Out");
        if (setDrawerOpen) {
          setDrawerOpen(false);
        }
      })
      .catch(() => {
        toast.error("Sign Out Failed", {
          description: "Something went wrong while signing out.",
        });
      });
  };

  return handleSignOut;
};

export default useSignOut;
