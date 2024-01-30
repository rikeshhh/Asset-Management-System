import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router.jsx";
import { PricingProvider } from "./Component/Context/PricingContext.jsx";
import { queryClient, QueryClientProvider } from "./Component/Query/Query.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PricingProvider>
        <RouterProvider router={router} />
      </PricingProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
