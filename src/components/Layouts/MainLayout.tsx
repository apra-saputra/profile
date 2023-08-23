import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import Footer from "../footer/Footer";
import PageLoading from "../PageLoading";
import BackToTop from "../elements/BackToTop";

const MainLayout: React.FC = () => {
  useDocumentTitle("home");

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <header className="fixed z-50 top-0 left-0 w-full">
        <Navbar />
      </header>
      <main className="mt-24 pb-10 w-full flex flex-col justify-center">
        <Suspense fallback={<PageLoading />}>
          <Outlet />
        </Suspense>

        <BackToTop />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
