import LoadingSvg from "@/components/elements/loader/LoadingSvg";
import loginImage from "@/assets/images/login.png";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <main className="max-w-[100dvw] min-h-screen overflow-x-hidden bg-background">
      <section className="h-screen flex justify-between items-center">
        <div className="w-4/6 h-full hidden lg:flex bg-primary justify-center items-center shadow-main-shadow">
          <img
            src={loginImage}
            alt="Login Image"
            className="bg-no-repeat object-cover object-center hidden lg:block w-[50%]"
            loading="lazy"
          />
        </div>
        <div className="flex justify-center items-center w-full lg:w-3/6 h-full px-6">
          <Suspense fallback={<LoadingSvg />}>
            <Outlet />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
