// import Footer from "./Footer";
// import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
// import AlertDialogComponent from "../ui/AlertComponent";
import { Suspense } from "react";
import SplashScreen from "../SplashScreen";
import Footer from "../Footer";
import ButtonChangeTheme from "../ButtonChangeTheme";

const Mainlayout = () => {
  return (
    <>
      {/* <Navbar /> */}

      <Suspense fallback={<SplashScreen />}>
        <main className="w-full min-h-screen flex flex-col items-center relative">
          <Outlet />
          <ButtonChangeTheme />
        </main>
      </Suspense>
      <Footer />
    </>
  );
};

export default Mainlayout;
