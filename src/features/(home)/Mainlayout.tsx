import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import SplashScreen from "../commons/components/SplashScreen";
import ButtonChangeTheme from "../commons/components/ButtonChangeTheme";
import Footer from "../commons/components/Footer";

const Mainlayout = () => {
  return (
    <>
      <Suspense fallback={<SplashScreen />}>
        <main className="w-full min-h-screen flex flex-col lg:items-center items-start relative overflow-hidden">
          <Outlet />
          <ButtonChangeTheme />
        </main>
      </Suspense>
      <Footer />
    </>
  );
};

export default Mainlayout;
