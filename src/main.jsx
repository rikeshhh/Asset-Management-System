import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Layout/Dashboard/Dashboard.jsx";
import Layout from "./Layout.jsx";
import Departments from "./Pages/Layout/Departments/Departments.jsx";
import Assets from "./Pages/Layout/Assets/Assets.jsx";
import Procurement from "./Pages/Layout/Procurement/Procurement.jsx";
import Repair from "./Pages/Layout/Repair/Repair.jsx";
import Employees from "./Pages/Layout/Employees/Employees.jsx";
import Categories from "./Pages/Layout/Categories/Categories.jsx";
import Location from "./Pages/Layout/Location/Location.jsx";
import Logout from "./Pages/Layout/Logout/Logout.jsx";
import Login from "./Pages/Login/Login.jsx";
import { Signup } from "./Pages/Signup/Signup.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/layout/",
        element: <Dashboard />,
      },

      {
        path: "layout/assets",
        element: <Assets />,
      },
      {
        path: "layout/procurement",
        element: <Procurement />,
      },
      {
        path: "layout/repair",
        element: <Repair />,
      },
      {
        path: "layout/employees",
        element: <Employees />,
      },
      {
        path: "layout/categories",
        element: <Categories />,
      },
      {
        path: "layout/location",
        element: <Location />,
      },
      {
        path: "layout/departments",
        element: <Departments />,
      },

      {
        path: "",
        element: <Logout />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
