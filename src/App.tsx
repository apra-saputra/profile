import { RouterProvider } from "react-router-dom";
import { router } from "./routers";
import { ThemeProvider } from "./features/commons/contexts/ThemeContext";
import { ParallaxProvider } from "react-scroll-parallax";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "./features/commons/components/ui/toaster";

function App() {
  return (
    <>
      <ThemeProvider>
        <ParallaxProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ParallaxProvider>
      </ThemeProvider>
      <Analytics />
    </>
  );
}

export default App;
