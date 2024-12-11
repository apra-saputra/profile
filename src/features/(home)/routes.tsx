import ComingSoonPage from "@/features/ComingSoonPage";
import Mainlayout from "@/features/commons/components/Mainlayout";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Home = lazy(() => import("@/features/(home)"));

export const homeRoute: RouteObject = {
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
};
