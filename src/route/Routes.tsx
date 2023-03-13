import { RouteObject, useRoutes } from "react-router-dom";
import React from "react";
import App from "../App";
import Vnc from "../Vnc";

const routes: RouteObject[] = [
  { index: true, element: <App /> },
  { path: "vnc", element: <Vnc /> },
];

const Routes = () => useRoutes(routes);
export default Routes;
