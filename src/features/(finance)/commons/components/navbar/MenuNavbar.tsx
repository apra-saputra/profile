// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/features/commons/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { FC, memo } from "react";
import { UserDisplay } from "../../types/user";
import { cn } from "@/libs/utils";
import { useIsMobile } from "@/features/commons/hooks/use-mobile";

interface MenuNavbarProps {
  user?: UserDisplay;
  logoutFn: () => void;
  className?: string;
}

const MenuNavbar: FC<MenuNavbarProps> = memo(({ user, className }) => {
  const isMobile = useIsMobile();

  const userName = user
    ? isMobile
      ? user.displayName.split(" ")[0]
      : user.displayName
    : "User";

  return (
    <div
      className={cn(
        "px-4 py-2 border border-white rounded-lg text-white select-none hidden md:block",
        className
      )}
    >
      {user ? (
        <span>Hello {userName}</span>
      ) : (
        <Link to={"/finance/sign-in"}>
          <p>Sign in</p>
        </Link>
      )}
    </div>
  );
});

export default MenuNavbar;
