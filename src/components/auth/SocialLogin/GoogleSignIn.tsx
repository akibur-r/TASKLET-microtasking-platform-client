import useAuthUserApi from "@/api/open/useAuthUserApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth/useAuth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
const GoogleSignIn = () => {
  const { signInWithGoogle, setLoading: setAuthLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { addUserPromise } = useAuthUserApi();

  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithGoogle()
      .then((res) => {
        const email = res.user.email;

        addUserPromise({
          email: email || "",
          role: "buyer",
          name: res.user.displayName || "",
          photoURL: res.user.photoURL || "",
        })
          .then(() => {
            toast.success("Signed In.", {
              description: "You can now access exclusive features.",
            });
            const from = location.state?.from?.pathname || "/";
            navigate(from);
            setAuthLoading(false);
            setLoading(false);
          })
          .catch(() => {
            toast.error("Google Sign In Failed", {
              description: "Something went wrong.",
            });
            setAuthLoading(false);
            setLoading(false);
          });
      })
      .catch(() => {
        toast.error("Google Sign In Failed", {
          description: "Something went wrong.",
        });
        setAuthLoading(false);
        setLoading(false);
      });
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      type="button"
      variant="outline"
      className="w-full"
      disabled={loading}
    >
      {loading ? (
        <LoaderSpinner size={4} />
      ) : (
        <>
          <FcGoogle /> Google
        </>
      )}
    </Button>
  );
};

export default GoogleSignIn;
