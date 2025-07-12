import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useAuth } from "@/hooks/useAuth/useAuth";
import useSignOut from "@/hooks/useSignOut/useSignOut";
import React from "react";
import { FiGrid, FiLogOut } from "react-icons/fi";
import { Link } from "react-router";

interface ProfileDropdownProps {
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ setDrawerOpen }) => {
  const { user } = useAuth();
  const handleSignOut = useSignOut();

  return (
    <DropdownMenu modal={false}>
      <Tooltip>
        <TooltipTrigger asChild className="cursor-pointer rounded-full">
          <DropdownMenuTrigger className="outline-none flex">
            <Avatar className="size-9 rounded-full border-4 border-primary/60 hover:border-primary/80">
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
          {user?.displayName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => setDrawerOpen(false)}
          className="justify-between"
          asChild
        >
          <Link to="/dashboard">
            Dashboard
            <FiGrid />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer flex items-center text-destructive"
          onClick={handleSignOut}
        >
          Logout
          <FiLogOut className="ml-auto" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
