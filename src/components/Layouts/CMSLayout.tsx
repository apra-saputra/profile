import React, { Suspense } from "react";
import LoadingSvg from "@/components/elements/loader/LoadingSvg";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const CMSLayout: React.FC = () => {
  return (
    <div className="max-w-screen min-h-screen overflow-x-hidden bg-background">
      <header className="fixed z-10 top-0 left-0 w-full">
        <Navbar />
      </header>
      <aside></aside>
      <main className="">
        <Suspense fallback={<LoadingSvg />}>
          <Outlet />
        </Suspense>
      </main>
      <footer></footer>
    </div>
  );
};

export default CMSLayout;
