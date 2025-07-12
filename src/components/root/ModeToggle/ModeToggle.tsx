import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@/hooks/useTheme/useTheme";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

interface ModeToggleProps {
  className?: string;
  showTooltip?: boolean;
}

export function ModeToggle({ className, showTooltip = true }: ModeToggleProps) {
  const { setTheme, theme } = useTheme();

  const handleThemeToggle = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="topNavIcon"
          size="topNavIcon"
          onClick={handleThemeToggle}
          className={cn(className)}
        >
          <Sun className="dark:hidden" />
          <Moon className="hidden dark:block" />
        </Button>
      </TooltipTrigger>
      <TooltipContent className={`${!showTooltip && "hidden"}`}>
        <p>
          {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
