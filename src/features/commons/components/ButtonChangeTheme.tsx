import { FaRegMoon } from "react-icons/fa6";
import { useTheme } from "../contexts/ThemeContext";
import { GoSun } from "react-icons/go";

const ButtonChangeTheme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="absolute z-50 left-5 bottom-5 rounded-full border border-accent p-4 text-white hover:bg-foreground bg-accent hover:text-background duration-200 "
      onClick={() => toggleTheme()}
    >
      {theme === "light" ? <GoSun /> : <FaRegMoon />}
    </button>
  );
};

export default ButtonChangeTheme;
