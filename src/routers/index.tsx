import { createBrowserRouter } from "react-router-dom";
import NotFound from "@/features/NotFound";
import homeRoute from "@/features/(home)/routes";
import financeRoute from "@/features/(finance)/routes";
import HomeV2 from "@/features/(home)/home-v2";

export const router = createBrowserRouter([
  homeRoute,
  financeRoute,
  {
    path: "/",
    children: [
      {
        path: "",
        Component: HomeV2,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
