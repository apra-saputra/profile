import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import SplashScreen from "../SplashScreen";
import Footer from "../Footer";
import ButtonChangeTheme from "../ButtonChangeTheme";

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
