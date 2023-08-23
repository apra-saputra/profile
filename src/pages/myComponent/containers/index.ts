import { lazy } from "react";

const Components = lazy(() => import("./Components"));
const Tables = lazy(() => import("./Tables"));
const Forms = lazy(() => import("./Forms"));

export { Components, Tables, Forms };
