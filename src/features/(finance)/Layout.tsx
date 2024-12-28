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
        {/* <div className="w-full h-full">
          <SidebarApp />
          <SidebarInset>
            <FinanceNavbar />
            <main className="min-h-[10dvh]">
              <Suspense fallback={<SplashScreen />}>
                <Outlet />
              </Suspense>
            </main>
            <Footer />
          </SidebarInset>
        </div> */}

        <SidebarApp />
        <SidebarInset>
          <FinanceNavbar />
          <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
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
