import { ModeToggle } from "@/components/root/ModeToggle/ModeToggle";
import Logo from "@/components/shared/Logo/Logo";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col">
      <header className="flex justify-between items-center p-4 w-full max-w-sm md:max-w-3xl mx-auto">
        <div className="h-16">
          <Logo showText />
        </div>
        <div>
          <ModeToggle />
        </div>
      </header>
      <div className="flex items-center justify-center p-4 md:p-10 flex-1">
        <main className="w-full max-w-sm md:max-w-3xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
