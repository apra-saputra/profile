import { Link, useLocation } from "react-router-dom";
import ChangeThemeButton from "./ChangeThemeButton";
import MenuNavbar from "./MenuNavbar";
import { useAuth } from "../../contexts/AuthContext";
import { SidebarTrigger } from "@/features/commons/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/features/commons/components/ui/breadcrumb";
import { Fragment, useEffect, useState } from "react";

const FinanceNavbar = () => {
  const { pathname } = useLocation(); // => /finance/admin/dashboard

  const [pathSegments, setPathSegments] = useState<string[]>([]);

  useEffect(() => {
    if (pathname.startsWith("/finance")) {
      const remainingPath = pathname.slice("/finance".length);
      const segments = remainingPath.split("/").filter((segment) => segment);
      setPathSegments(segments);
    }
  }, [pathname]);

  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="flex flex-col shrink-0 items-start gap-2 transition-[width,height] ease-linear ">
      <nav className="w-full flex justify-between items-center px-4 py-4 overflow-hidden h-full bg-accent">
        <Link to={"/finance"}>
          <h1>Logo</h1>
        </Link>

        <div className="space-x-2">
          <ChangeThemeButton />
          <MenuNavbar user={user} logoutFn={logout} />
        </div>
      </nav>

      {isAuthenticated && (
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {pathSegments.map((segment, index) => (
                <Fragment key={segment}>
                  <BreadcrumbItem>
                    <BreadcrumbPage>{segment}</BreadcrumbPage>
                  </BreadcrumbItem>
                  {index !== pathSegments.length - 1 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )}
    </header>
  );
};

export default FinanceNavbar;
