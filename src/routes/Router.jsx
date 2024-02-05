import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Assets from "../Pages/Assets/Assets";
import Categories from "../Pages/Categories/Categories";
import Employees from "../Pages/Employees/Employees";
import Repair from "../Pages/Repair/Repair";
import Procurement from "../Pages/Procurement/Procurement";
import Departments from "../Pages/Departments/Departments";
import Login from "../Pages/Login/Login";
import { Signup } from "../Pages/Signup/Signup";
import Location from "../Pages/Location/Location";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Plans from "../Pages/Plans/Plans";
import AddAssets from "../Pages/Assets/AddAssets";
import EditAssets from "../Pages/Assets/EditAssets";
import ProcurementForm from "../Pages/Procurement/ProcurementForm";
import AddProfile from "../Pages/Profile/AddProfile";
import EditProfile from "../Pages/Profile/EditProfile";
import { ViewProfile } from "../Pages/Profile/ViewProfile";
import PricingForm from "../Pages/Plans/PricingForm";
import PricingPayment from "../Pages/Plans/PricingPayment";
import PaymentSuccess from "../Pages/Plans/PaymentSuccess";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
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
        path: "/viewProfile",
        element: <ViewProfile />,
      },
      {
        path: "/addProfile",
        element: <AddProfile />,
      },
      {
        path: "/editProfile",
        element: <EditProfile />,
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
        path: "/pricingForm",
        element: <PricingForm />,
      },
      {
        path: "/payment",
        element: <PricingPayment />,
      },
      {
        path: "/success",
        element: <PaymentSuccess />,
      },
      {
        path: "/addAssets",
        element: <AddAssets />,
      },
      {
        path: "/editAssets",
        element: <EditAssets />,
      },
      {
        path: "/procurementForm",
        element: <ProcurementForm />,
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
