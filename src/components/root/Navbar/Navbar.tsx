import { Button } from "@/components/ui/button";
import { navItems } from "@/utils/navItems";

import { Link } from "react-router";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

import CoinBalanceBadge from "@/components/shared/CoinBalanceBadge/CoinBalanceBadge";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import Logo from "@/components/shared/Logo/Logo";
import ProfileDropdown from "@/components/shared/ProfileDropdown/ProfileDropdown";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth/useAuth";
import { ArrowUpRight, Menu } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "../ModeToggle/ModeToggle";

export function Navbar() {
  const { loading, user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const authButtons = (
    <div className="flex gap-1">
      <Link to={"/auth/register"}>
        <Button
          variant="outline"
          className=" border-primary duration-75  "
          size="sm"
        >
          Register
        </Button>
      </Link>

      <Link to={"/auth/login"}>
        <Button variant="default" className="text-white" size="sm">
          Login
        </Button>
      </Link>
    </div>
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
              "https://github.com/akibur-r/TASKLET-microtasking-platform-client"
            }
            className="flex items-center gap-0.5"
          >
            View Source Code <ArrowUpRight className="h-4 w-4 text-primary" />
          </Link>
        </nav>

        {/* right actions */}
        <div className="hidden md:flex items-center gap-2">
          {loading ? (
            <LoaderSpinner className="size-4" />
          ) : user ? (
            <span className="flex gap-2">
              <CoinBalanceBadge />
              <ProfileDropdown setDrawerOpen={setDrawerOpen} />
            </span>
          ) : (
            authButtons
          )}
          <ModeToggle />
        </div>

        <div className="md:hidden flex gap-2">
          <CoinBalanceBadge />
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
                  <ProfileDropdown setDrawerOpen={setDrawerOpen} />
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
