import {
  SidebarMenuButton,
} from "@/features/commons/components/ui/sidebar";
import { CornerLeftUp } from "lucide-react";
import { useEffect, useState } from "react";
import { GoSun } from "react-icons/go";
import { FaRegMoon } from "react-icons/fa6";
import { useTheme } from "@/features/commons/contexts/ThemeContext";

const ButtonCollection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { theme, toggleTheme } = useTheme();

  return (
    <div className="grid grid-cols-2">
      <SidebarMenuButton
        onClick={toggleTheme}
        className="rounded-lg bg-primary py-1 px-2 w-full flex justify-center md:hidden" 
      >
        {theme === "light" ? <GoSun /> : <FaRegMoon />}
      </SidebarMenuButton>
      {/* <ScrollToTopButton /> */}
      {isVisible ? (
        <SidebarMenuButton
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`rounded-lg bg-primary p-1`}
        >
          <CornerLeftUp className="text-background" />

          <div className="flex-1 text-left text-sm leading-tight">
            <span className="truncate">Scroll to up</span>
          </div>
        </SidebarMenuButton>
      ) : null}
    </div>
  );
};

export default ButtonCollection;
