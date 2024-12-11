import { Button } from "@/features/commons/components/ui/button";
import { useTheme } from "@/features/commons/contexts/ThemeContext";
import { memo } from "react";
import { FaRegMoon } from "react-icons/fa6";
import { GoSun } from "react-icons/go";

const ChangeThemeButton = memo(() => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button onClick={() => toggleTheme()} variant={"outline"} className="text-foreground bg-accent border-foreground">
      {theme === "light" ? <GoSun /> : <FaRegMoon />}
    </Button>
  );
});

export default ChangeThemeButton;
