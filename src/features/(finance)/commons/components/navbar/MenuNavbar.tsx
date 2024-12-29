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

interface MenuNavbarProps {
  user?: UserDisplay;
  logoutFn: () => void;
}

const MenuNavbar: FC<MenuNavbarProps> = memo(({ user }) => {
  return (
    <>
      {user ? (
        <div className="px-4 py-2 border border-white rounded-lg text-white select-none">
          <span>Hello {user.displayName}</span>
        </div>
      ) : (
        <Link to={"/finance/sign-in"}>
          <p>Sign in</p>
        </Link>
      )}
    </>

    // <DropdownMenu>
    //   <DropdownMenuTrigger className="p-0 m-0">
    //     <Button>{user ? user.displayName : <h4>User</h4>}</Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent className="w-screen md:w-full">
    //     <DropdownMenuLabel className="text-center">
    //       {user ? user.displayName : <h4>User</h4>}
    //     </DropdownMenuLabel>
    //     {user ? (
    //       <DropdownMenuItem onClick={logoutFn}>Logout</DropdownMenuItem>
    //     ) : (
    //       <>
    //         <DropdownMenuItem>
    //           <Link to={"/finance/sign-in"}>
    //             <p>Sign in</p>
    //           </Link>
    //         </DropdownMenuItem>
    //         {/* <DropdownMenuItem>
    //           <Link to={"/finance/sign-up"}>
    //             <p>Sign up</p>
    //           </Link>
    //         </DropdownMenuItem> */}
    //       </>
    //     )}

    //     <DropdownMenuSeparator />
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
});

export default MenuNavbar;
