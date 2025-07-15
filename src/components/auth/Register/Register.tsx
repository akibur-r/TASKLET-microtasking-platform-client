import useAuthUserApi from "@/api/useAuthUserApi";
import RegisterVector from "@/assets/vectors/register.svg";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { uploadToImgBB } from "@/utils/functions/uploadToImgBB";
import { Upload } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const Register = ({ className, ...props }: React.ComponentProps<"div">) => {
  const {
    createUser,
    updateUser,
    loading,
    setLoading,
    deleteUserFromFirebase,
  } = useAuth();
  const { addUserPromise } = useAuthUserApi();
  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadToImgBB(file);

    if (url) {
      setPhotoURL(url);
    } else {
      alert("Failed to upload image.");
    }
    setUploading(false);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const rawRole = formData.get("role");
    const role = (
      ["admin", "buyer", "worker"].includes(rawRole as string)
        ? rawRole
        : "default"
    ) as "admin" | "buyer" | "worker" | "default";

    if (!name) return toast.error("You must provide a name");
    if (!email) return toast.error("You must provide a valid email");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (!role) return toast.error("You must select a role");

    if (!photoURL) {
      setLoading(false);
      return toast.error("You must properly upload a profile picture.");
    }

    createUser(email, password)
      .then(() => {
        updateUser({ displayName: name, photoURL: photoURL })
          .then(() => {
            addUserPromise({ email, role, name })
              .then(() => {
                toast.success("Account created successfully", {
                  description: "You can now access exclusive contents.",
                });
                setLoading(false);
                navigate("/");
              })
              .catch(() => {
                deleteUserFromFirebase().finally(() => {
                  toast.error("Something went wrong while saving your data.");
                  setLoading(false);
                });
              });
          })
          .catch(() => {
            setLoading(false);
            toast.error("Failed to update user profile");
          });
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to create account", {
          description: "Something went wrong",
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
              {/* heading */}
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Hello There!</h1>
                <p className="text-muted-foreground text-balance">
                  Create an account on Tasklet
                </p>
              </div>

              {/* profile picture upload */}

              <div className="flex justify-center relative">
                <Avatar className="w-20 h-20 ring-4 ring-accent/30">
                  <AvatarImage src={photoURL || ""} alt="Uploaded photo" />
                  <AvatarFallback className="flex items-center justify-center text-muted-foreground p-6 ">
                    {uploading ? (
                      <LoaderSpinner />
                    ) : (
                      <>
                        <Upload className="w-full h-full" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="w-full h-full cursor-pointer absolute opacity-0"
                        />
                      </>
                    )}
                  </AvatarFallback>
                </Avatar>
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
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <LoaderSpinner size={12} /> : "Register"}
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
