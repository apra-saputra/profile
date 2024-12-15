import { RouterProvider } from "react-router-dom";
import { router } from "./routers";
import { ThemeProvider } from "./features/commons/contexts/ThemeContext";
import { ParallaxProvider } from "react-scroll-parallax";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <ThemeProvider>
        <ParallaxProvider>
          <RouterProvider router={router} />
        </ParallaxProvider>
      </ThemeProvider>
      <Analytics />
    </>
  );
}

export default App;
