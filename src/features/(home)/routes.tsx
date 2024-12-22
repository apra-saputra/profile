import ComingSoonPage from "@/features/ComingSoonPage";
import Mainlayout from "@/features/commons/components/Mainlayout";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Home = lazy(() => import("@/features/(home)/home"));
// const Projects = lazy(() => import("@/features/(home)/projects"));
// const ProjectDetails = lazy(() => import("@/features/(home)/projectDetail"));

const homeRoute: RouteObject = {
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
      // element: <ProjectDetails />,
    },
  ],
};

export default homeRoute;
