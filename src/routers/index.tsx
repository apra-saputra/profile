import { createBrowserRouter } from "react-router-dom";
import NotFound from "@/features/NotFound";
import { homeRoute } from "@/features/(home)/routes";
import { financeRoute } from "@/features/(finance)/routes";

export const router = createBrowserRouter([
  homeRoute,
  financeRoute,
  {
    path: "*",
    Component: NotFound,
  },
]);
