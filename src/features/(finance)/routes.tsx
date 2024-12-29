import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import SignInPage from "@/features/(finance)/auth/Sign-in";
// import SignUpPage from "@/features/(finance)/auth/Sign-up";
import FinanceLayout from "@/features/(finance)/Layout";
import AdminFinance from "./admin";
import { protectedRouteLoader } from "./commons/utils/protectedLoader";
// import AdminLayout from "./AdminLayout";
import ComingSoonPage from "../ComingSoonPage";

const FinanceHome = lazy(() => import("@/features/(finance)"));
const Dashboard = lazy(() => import("@/features/(finance)/admin/dashboard"));
const UserSetting = lazy(() => import("@/features/(finance)/admin/setting"));
const FinanceTable = lazy(
  () => import("@/features/(finance)/admin/financeTable")
);
const Note = lazy(() => import("@/features/(finance)/admin/note"));

const financeRoute: RouteObject = {
  path: "/finance",
  element: <FinanceLayout />,
  children: [
    {
      path: "",
      element: <FinanceHome />,
    },
    { path: "sign-in", element: <SignInPage /> },
    { path: "sign-up", element: <ComingSoonPage /> },
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
        {
          path: "report",
          element: <FinanceTable />,
          children: [{ path: "create", Component: ComingSoonPage }],
        },
        {
          path: "note",
          element: <Note />,
        },
        {
          path: "setting",
          element: <UserSetting />,
        },
      ],
    },
  ],
};

export default financeRoute;
