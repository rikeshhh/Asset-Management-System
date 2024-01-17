import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Assets from "../Pages/Assets/Assets";
import Categories from "../Pages/Categories/Categories";
import Employees from "../Pages/Employees/Employees";
import Repair from "../Pages/Repair/Repair";
import Procurement from "../Pages/Procurement/Procurement";
import Departments from "../Pages/Departments/Departments";
import Logout from "../Pages/Logout/Logout";
import Login from "../Pages/Login/Login";
import { Signup } from "../Pages/Signup/Signup";
import { Profile } from "../Pages/Profile/Profile";
import Location from "../Pages/Location/Location";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Plans from "../Pages/Plans/Plans";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        path: "/profile",
        element: <Profile />,
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
        path: "/plans",
        element: <Plans />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
