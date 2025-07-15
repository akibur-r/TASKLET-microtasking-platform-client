import LoginVector from "@/assets/vectors/login.svg";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth/useAuth";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import GoogleSignIn from "../SocialLogin/GoogleSignIn";

const Login = ({ className, ...props }: React.ComponentProps<"div">) => {
  const { signIn, setLoading, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    signIn(email, password)
      .then(() => {
        toast.success("Login Successful", {
          description: "You can now access exclusive features",
        });
        const from = location.state?.from?.pathname || "/";
        navigate(from);
        setLoading(false);
      })
      .catch((error) => {
        const code = error.code;
        let message = "";

        if (code === "auth/invalid-email") {
          message = "Invalid email";
        } else if (code === "auth/user-not-found") {
          message = "No user found with this email";
        } else if (code === "auth/wrong-password") {
          message = "Incorrect password";
        } else if (code === "auth/too-many-requests") {
          message = "Too many attempts. Try again later";
        } else {
          message = "Something went wrong";
          console.error(error);
        }

        toast.error("Login Failed", { description: message });
        setLoading(false);
      });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleLogin} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Tasklet account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Input name="password" id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <LoaderSpinner size={12} /> : "Login"}
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative px-2">
                  Or continue with
                </span>
              </div>
              <div className="flex justify-center">
                <GoogleSignIn />
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to={"/auth/register"}
                  className="underline underline-offset-4"
                >
                  Register
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src={LoginVector}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-30 dark:grayscale-50"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link to="#">Terms of Service</Link> and{" "}
        <Link to="#">Privacy Policy</Link>.
      </div>
    </div>
  );
};

export default Login;
