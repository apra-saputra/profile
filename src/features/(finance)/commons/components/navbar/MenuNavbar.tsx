import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/features/commons/components/ui/dropdown-menu";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "@/features/commons/components/ui/button";
import { Link } from "react-router-dom";
import { FC, memo } from "react";
import { User } from "../../types/user";

interface MenuNavbarProps {
  user?: User;
  logoutFn: () => void;
}

const MenuNavbar: FC<MenuNavbarProps> = memo(({ user, logoutFn }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-0 m-0">
        <Button>
          <GiHamburgerMenu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-screen md:w-full">
        <DropdownMenuItem>
          <Link to={"/"}>
            <h4>Home</h4>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-center">
          {user ? user.displayName : <h4>User</h4>}
        </DropdownMenuLabel>
        {user ? (
          <DropdownMenuItem onClick={logoutFn}>Logout</DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem>
              <Link to={"/finance/sign-in"}>
                <p>Sign in</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/finance/sign-up"}>
                <p>Sign up</p>
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default MenuNavbar;
