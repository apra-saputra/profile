import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import SignInPage from "@/features/(finance)/auth/Sign-in";
import SignUpPage from "@/features/(finance)/auth/Sign-up";
import FinanceLayout from "@/features/(finance)/Layout";
import AdminFinance from "./admin";
import { protectedRouteLoader } from "./commons/utils/protectedLoader";

const FinanceHome = lazy(() => import("@/features/(finance)"));
const Dashboard = lazy(() => import("@/features/(finance)/admin/dashboard"));
// const Book = lazy(() => import("@/features/(finance)/admin/book"));

export const financeRoute: RouteObject = {
  path: "/finance",
  element: <FinanceLayout />,
  children: [
    {
      path: "",
      element: <FinanceHome />,
    },
    { path: "sign-in", element: <SignInPage /> },
    { path: "sign-up", element: <SignUpPage /> },
    {
      path: "admin",
      loader: protectedRouteLoader,
      children: [
        {
          path: "",
          element: <AdminFinance />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
      ],
    },
    // {
    //   path: "/admin",
    //   Component: FinanceLayout,
    //   children: [
    //     {
    //       path: "",
    //       element: <>Hello admin</>,
    //     },
    //     {
    //       path: "/dashboard",
    //       Component: Dashboard,
    //     },
    //     {
    //       path: "/book",
    //       Component: Book,
    //     },
    //   ],
    // },
  ],
};
