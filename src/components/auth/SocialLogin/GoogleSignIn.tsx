import useAuthUserApi from "@/api/useAuthUserApi";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
const GoogleSignIn = () => {
  const { signInWithGoogle, setLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { addUserPromise } = useAuthUserApi();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        const email = res.user.email;

        addUserPromise({ email: email, role: "buyer" })
          .then((res) => {
            console.log(res);
            toast.success("Signed In.", {
              description: "You can now access exclusive features.",
            });
            setLoading(false);
            navigate(
              `${location ? (location.state ? location.state : "/") : "/"}`
            );
          })
          .catch(() => {
            toast.error("Google Sign In Failed", {
              description: "Something went wrong.",
            });
            setLoading(false);
          });
      })
      .catch(() => {
        toast.error("Google Sign In Failed", {
          description: "Something went wrong.",
        });
        setLoading(false);
      });
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      type="button"
      variant="outline"
      className="w-full"
    >
      <FcGoogle /> Google
    </Button>
  );
};

export default GoogleSignIn;
