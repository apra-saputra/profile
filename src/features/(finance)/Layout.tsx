import { Outlet } from "react-router-dom";
import Footer from "../commons/components/Footer";
import useDocumentTitle from "../commons/hooks/useDocumentTitle";
import { Suspense } from "react";
import SplashScreen from "../commons/components/SplashScreen";
import { AuthProvider } from "./commons/contexts/AuthContext";
import FinanceNavbar from "./commons/components/navbar/Navbar";

const FinanceLayout = () => {
  useDocumentTitle("Finance | Admin");
  return (
    <AuthProvider>
      <FinanceNavbar />
      <main className="w-full min-h-screen">
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default FinanceLayout;
