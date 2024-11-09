import { RouterProvider } from "react-router-dom";
import { router } from "./routers";
import { ThemeProvider } from "./features/commons/contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
