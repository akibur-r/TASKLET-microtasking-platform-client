import { useTheme } from "@/hooks/useTheme/useTheme";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const handleThemeToggle = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={"topNavIcon"}
          size={"topNavIcon"}
          onClick={handleThemeToggle}
        >
          <Sun className="dark:hidden" />
          <Moon className="hidden dark:block" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
