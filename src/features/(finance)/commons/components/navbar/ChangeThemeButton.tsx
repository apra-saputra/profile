import { Button } from "@/features/commons/components/ui/button";
import { useTheme } from "@/features/commons/contexts/ThemeContext";
import { cn } from "@/libs/utils";
import { FC, memo } from "react";
import { FaRegMoon } from "react-icons/fa6";
import { GoSun } from "react-icons/go";

interface ChangeThemeButtonProps {
  className?: string;
}

const ChangeThemeButton: FC<ChangeThemeButtonProps> = memo(({ className }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      onClick={() => toggleTheme()}
      variant={"default"}
      className={cn("border-foreground", className)}
    >
      {theme === "light" ? <GoSun /> : <FaRegMoon />}
    </Button>
  );
});

export default ChangeThemeButton;
