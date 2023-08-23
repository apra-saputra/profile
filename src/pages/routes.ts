import { createBrowserRouter, redirect, RouteObject } from "react-router-dom";
import { CMSLayout, AuthLayout, MainLayout } from "@/components/Layouts";
import { Login } from "@/pages/auth";
import { MyComponent } from "@/pages/myComponent";
import { Dashboard } from "@/pages/dashboard";
import { Home } from "@/pages/home";

const routes: RouteObject[] = [
  {
    Component: AuthLayout,
    loader: () => {
      /**
       * protected route check seessionStorage
       */
      // if (
      //   sessionStorage.getItem("auth") &&
      //   sessionStorage.getItem("auth") !== "null"
      // ) {
      //   return redirect("/");
      // } else {
      //   return null;
      // }

      return null;
    },
    path: "/auth",
    children: [
      {
        path: "",
        loader: () => redirect("/auth/login"),
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
  {
    Component: MainLayout,
    loader: () => {
      /**
       * protected route check seessionStorage
       */
      // if (
      //   sessionStorage.getItem("auth") &&
      //   sessionStorage.getItem("auth") !== "null"
      // ) {
      //   return null
      // } else {
      //   return redirect("/");
      // }

      return null;
    },
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/component",
        Component: MyComponent,
      },
    ],
  },
  {
    Component: CMSLayout,
    loader: () => {
      /**
       * protected route check seessionStorage
       */
      // if (
      //   sessionStorage.getItem("auth") &&
      //   sessionStorage.getItem("auth") !== "null"
      // ) {
      //   return null
      // } else {
      //   return redirect("/");
      // }

      return null;
    },
    path: "/admin",
    children: [
      {
        path: "",
        loader: () => redirect("/admin/dashboard"),
      },
      {
        path: "dashboard",
        Component: Dashboard,
      },
    ],
  },
];

export default createBrowserRouter(routes);
