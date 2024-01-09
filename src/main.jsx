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
    children:[
      {
        path: "/layout",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          
          {
            path: "/assets",
            element: <Assets />,
          },
          {
            path: "/procurement",
            element: <Procurement />,
          },
          {
            path: "/repair",
            element: <Repair />,
          },
          {
            path: "/employees",
            element: <Employees />,
          },
          {
            path: "/categories",
            element: <Categories />,
          },
          {
            path: "/location",
            element: <Location />,
          },
          {
            path: "/departments",
            element: <Departments />,
          },
  
          {
            path: "/logout",
            element: <Logout />,
          },
        ],
      }
    ]
   
  },
  {
    path: "/signup",
    element: <Signup/>,
  }
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
