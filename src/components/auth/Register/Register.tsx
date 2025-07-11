import useAuthUserApi from "@/api/authUserApi";
import RegisterVector from "@/assets/vectors/register.svg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth/useAuth";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const Register = ({ className, ...props }: React.ComponentProps<"div">) => {
  const { createUser, updateUser, setLoading, deleteUserFromFirebase } =
    useAuth();
  const { addUserPromise } = useAuthUserApi();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, photoURL, email, password, role } = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as Record<string, string>;

    if (!name) {
      toast.error("You must provide a name");
      return;
    }
    if (!photoURL) {
      toast.error("You must provide a Profile Picture URL");
      return;
    }
    if (!email) {
      toast.error("You must provide a valid email");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (!role) {
      toast.error("You must select a role");
      return;
    }

    createUser(email, password)
      .then(() => {
        updateUser({ displayName: name, photoURL: photoURL })
          .then(() => {
            addUserPromise({ email: email, role: role })
              .then(() => {
                toast.success("Account created successfully", {
                  description: "You can now access exclusive contents.",
                });
                setLoading(false);
                navigate("/");
              })
              .catch(() => {
                deleteUserFromFirebase()
                  .then(() => {
                    toast.error("Something Went Wrong", {
                      description:
                        "There was a problem while creating your account.",
                    });
                  })
                  .catch(() => {});
                setLoading(false);
              });
          })
          .catch(() => {
            // console.log(err);
            setLoading(false);
            toast.error("Something Went Wrong", {
              description: "There was a problem while creating your account.",
            });
          });
      })
      .catch(() => {
        setLoading(false);
        toast.error("Something Went Wrong", {
          description: "There was a problem while creating your account.",
        });
      });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block">
            <img
              src={RegisterVector}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-30 dark:grayscale-50"
            />
          </div>
          <form onSubmit={handleRegister} className="p-6 md:p-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Hello There!</h1>
                <p className="text-muted-foreground text-balance">
                  Create an account on Tasklet
                </p>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="name">Name</Label>
                </div>
                <Input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Your Name"
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="photoURL">Profile Picture</Label>
                </div>
                <Input
                  name="photoURL"
                  id="photoURL"
                  type="text"
                  placeholder="Photo URL"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Your Password"
                />
              </div>

              <div className="flex gap-2">
                <Select name="role">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Role*" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="worker">Worker</SelectItem>
                    <SelectItem value="buyer">Buyer</SelectItem>
                  </SelectContent>
                </Select>

                <div className="w-full">
                  <Button type="submit" className="w-full ">
                    Register
                  </Button>
                </div>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to={"/auth/login"}
                  className="underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
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

export default Register;
