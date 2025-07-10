import { Button } from "@/components/ui/button";
import { navItems } from "@/utils/navItems";

import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import Logo from "@/components/shared/Logo/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth/useAuth";
import { ArrowUpRight, Menu } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "../ModeToggle/ModeToggle";

export function Navbar() {
  const { loading, user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSignOut = () => {
    // logOut()
    //   .then(() => {
    //     toast.success("Signed Out");
    //     setDrawerOpen(false);
    //   })
    //   .catch(() => {
    //     toast.error("Sign Out Failed", {
    //       description: "Something went wrong while signing out.",
    //     });
    //   });
  };

  const authButtons = (
    <div className="flex gap-1">
      <Button
        variant="outline"
        className=" border-primary duration-75  "
        size="sm"
      >
        <Link to={"/auth/register"}>Register</Link>
      </Button>

      <Button variant="default" className="text-white" size="sm">
        <Link to={"/auth/login"}>Login</Link>
      </Button>
    </div>
  );

  const profileDropDown = (
    <DropdownMenu dir="rtl" modal={false}>
      <Tooltip>
        <TooltipTrigger asChild className="cursor-pointer rounded-full">
          <DropdownMenuTrigger className="outline-none flex">
            <Avatar className="size-9 rounded-full border-4 border-primary/40 hover:border-primary/30">
              <AvatarImage
                src={user?.photoURL || ""}
                className="object-cover"
              />
              <AvatarFallback>
                {user?.displayName?.toUpperCase()[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent className="hidden lg:block">
          <p>Click to show menu</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="mr-4">
        <DropdownMenuLabel className="text-left">
          {user?.displayName && user.displayName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer flex items-center"
          onClick={handleSignOut}
        >
          Logout
          <FiLogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  return (
    <header className="w-full border-b bg-secondary text-foreground sticky top-0 z-20">
      <div className="mx-auto max-w-screen-xl px-4 py-1 flex items-center justify-between">
        {/* left icon */}
        <div className="h-12 w-fit">
          <Logo />
        </div>

        {/* center links */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {navItems}
          <Link
            target="_blank"
            to={
              "https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-akibur-r"
            }
            className="flex items-center gap-0.5"
          >
            Join as Developer <ArrowUpRight className="h-4 w-4 text-primary" />
          </Link>
        </nav>

        {/* right actions */}
        <div className="hidden md:flex items-center gap-2">
          {loading ? (
            <LoaderSpinner className="size-4" />
          ) : user ? (
            profileDropDown
          ) : (
            authButtons
          )}
          <ModeToggle />
        </div>

        <div className="md:hidden">
          <Drawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            direction="left"
          >
            <DrawerTrigger>
              <div>
                <Menu className="" />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="text-right">
                <div className="h-12 w-fit flex justify-center">
                  <Logo showText />
                </div>
                <div
                  className="grid mt-4"
                  onClick={() => {
                    setDrawerOpen(false);
                  }}
                >
                  {navItems.map((item) => {
                    return (
                      <div className="grid justify-end">
                        <div key={item.key}>{item}</div>
                        <div className="w-3 my-2">
                          <Separator />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </DrawerHeader>
              <DrawerFooter className="flex flex-row justify-end items-center">
                <span onClick={() => setDrawerOpen(false)}>
                  <ModeToggle />
                </span>

                {loading ? (
                  <LoaderSpinner className="size-4" />
                ) : user ? (
                  profileDropDown
                ) : (
                  authButtons
                )}
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
