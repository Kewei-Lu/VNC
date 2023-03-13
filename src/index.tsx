import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import React from "react";
import Routes from "./route/Routes";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </>

  // </React.StrictMode>
);
