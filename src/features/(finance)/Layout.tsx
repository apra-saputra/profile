import { Outlet } from "react-router-dom";
import Footer from "../commons/components/Footer";
import useDocumentTitle from "../commons/hooks/useDocumentTitle";
import { Suspense } from "react";
import SplashScreen from "../commons/components/SplashScreen";
import { AuthProvider } from "./commons/contexts/AuthContext";
import FinanceNavbar from "./commons/components/navbar/Navbar";
import {
  SidebarInset,
  SidebarProvider,
} from "../commons/components/ui/sidebar";
import { SidebarApp } from "./commons/components/sidebar/SidebarApp";

const FinanceLayout = () => {
  useDocumentTitle("Finance | Admin");
  return (
    <AuthProvider>
      <SidebarProvider>
        <SidebarApp />
        <SidebarInset>
          <FinanceNavbar />
          <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Suspense fallback={<SplashScreen />}>
              <Outlet />
            </Suspense>
          </main>
          <Footer />
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default FinanceLayout;
