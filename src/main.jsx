import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router.jsx";
import { PricingProvider } from "./Component/Context/PricingContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PricingProvider>
    <RouterProvider router={router} />
    </PricingProvider>
  </React.StrictMode>
);
