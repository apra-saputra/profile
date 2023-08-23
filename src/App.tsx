import { RouterProvider } from "react-router-dom";
import router from "@/pages/routes";
import AuthContextProvider from "./contexts/AuthContext";
import { Provider } from "react-redux";
import { store } from "@/stores";

function App() {
  
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </Provider>
  );
}

export default App;
