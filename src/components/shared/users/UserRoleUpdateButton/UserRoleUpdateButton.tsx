import useUserApi from "@/api/secure/useUserApi";
import LoaderSpinner from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDBUsersStore } from "@/hooks/stores/useDBUserStore/useDBUserStore";
import type { dbUserType } from "@/types/dbUserType/dbUserType";
import { Circle, UserCog } from "lucide-react";
import { useState } from "react";

interface Props {
  user: dbUserType | null;
  showText?: boolean;
  disabled?: boolean;
}

const UserRoleUpdateButton = ({
  user,
  showText = false,
  disabled = false,
}: Props) => {
  const { updateUserPromise } = useUserApi();
  const { updateDBUserByEmail } = useDBUsersStore();
  const [loading, setLoading] = useState(false);

  const handleRoleUpdate = async (role: "admin" | "buyer" | "worker") => {
    if (role === user?.role || !user) {
      return;
    }

    setLoading(true);
    try {
      const res = await updateUserPromise({
        body: { role },
        user_email: user.email,
      });

      if (res) {
        updateDBUserByEmail(user.email, { role: role });
      }
    } catch (error) {
      console.error("Role update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className=" bg-amber-500/50 hover:bg-amber-500/15 hover:text-amber-500 cursor-pointer text-base-content border border-amber-500/20"
          disabled={disabled || loading}
        >
          <UserCog />
          {showText && "Edit Role"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Select Role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {["admin", "buyer", "worker"].map((role) => (
          <>
            <DropdownMenuItem
              key={role}
              onClick={() =>
                handleRoleUpdate(role as "admin" | "buyer" | "worker")
              }
              disabled={loading}
              className="flex items-center"
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
              <span className="text-xs">
                {role === user?.role && (
                  <Circle className="size-1.5 text-accent bg-accent/70 rounded-full" />
                )}
              </span>
            </DropdownMenuItem>
          </>
        ))}
        {loading && (
          <div className="flex items-center justify-center px-2 py-1.5">
            <LoaderSpinner size={4} />
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserRoleUpdateButton;
