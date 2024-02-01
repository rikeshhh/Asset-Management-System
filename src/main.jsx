import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router.jsx";
import { queryClient, QueryClientProvider } from "./Component/Query/Query.jsx";
import { AmsProvider } from "./Component/Context/AmsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AmsProvider>
        <RouterProvider router={router} />
      </AmsProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
