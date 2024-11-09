import { createBrowserRouter, redirect } from "react-router-dom";
import { Home } from "./lazy";
import Mainlayout from "@/features/commons/components/layouts/Mainlayout";
import ComingSoonPage from "@/features/ComingSoonPage";
import NotFound from "@/features/NotFound";

export const router = createBrowserRouter([
  {
    path: "/admin",
    loader: () => {
      redirect("/admin/dashboard");
      return null;
    },
    children: [
      {
        path: "dashboard",
        element: <>dashboard admin</>,
      },
    ],
  },
  {
    path: "/",
    Component: Mainlayout,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/projects/:id",
        element: <ComingSoonPage />,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
