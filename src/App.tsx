import { RouterProvider } from "react-router-dom";
import { router } from "./routers";
import { ThemeProvider } from "./features/commons/contexts/ThemeContext";
import { ParallaxProvider } from "react-scroll-parallax";
import { Analytics } from "@vercel/analytics/react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

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
