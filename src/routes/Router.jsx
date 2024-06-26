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
// import AddProfile from "../Pages/Profile/AddProfile";
// import EditProfile from "../Pages/Profile/EditProfile";
import { ViewProfile } from "../Pages/Profile/ViewProfile";
import PricingForm from "../Pages/Plans/PricingForm";
import PricingPayment from "../Pages/Plans/PricingPayment";
import PaymentSuccess from "../Pages/Plans/PaymentSuccess";
import ProtectedRoute from "./ProtectedRoute";
import LoginSignupProtectedRoute from "./LoginSignupProtectedRoute";
// import EmployeeView from "../Pages/Employees/EmployeeView";
import Hardware from "../Pages/Assets/Hardware";
import Software from "../Pages/Assets/Software";
import ViewAssets from "../Pages/Assets/ViewAssets";
import AddRepair from "../Pages/Repair/AddRepair";
import EditProcurement from "../Pages/Procurement/EditProcurement";
import EditRepairReplace from "../Pages/Repair/EditRepairReplace";
import AddProfile from "../Pages/Profile/AddProfile";
import EmployeeView from "../Pages/Employees/EmployeeView";
import EditProfile from "../Pages/Profile/EditProfile";
import EmployeeDataTable from "../Pages/Employees/EmployeeDataTable";
import AssetsHead from "../Pages/Assets/AssetsHead";
import RepairReplace from "../Pages/Repair/RepairReplace";
import ViewRepair from "../Pages/Repair/ViewRepair";
import ViewProcurement from "../Pages/Procurement/ViewProcurement";

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
        path: "/assets/*",
        element: <Assets />,
        children: [
          {
            path: "", // Relative path for AssetsHead
            element: <AssetsHead />,
            children: [
              {
                index: true,
                element: <Hardware />, // Render the Hardware component by default
              },
              {
                path: "hardware",
                element: <Hardware />,
              },

              {
                path: "software",
                element: <Software />,
              },
            ],
          },
          {
            path: "viewAssets",
            element: <ViewAssets />,
          },
          {
            path: "addAssets",
            element: <AddAssets />,
          },
          {
            path: "editAssets",
            element: <EditAssets />,
          },
        ],
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
        children: [
          {
            index: true,
            path: "procurementForm",
            element: <ProcurementForm />,
          },
          {
            path: "editProcurement",
            element: <EditProcurement />,
          },
          {
            path: "viewProcurement",
            element: <ViewProcurement />,
          },
        ],
      },
      {
        path: "/repair/",
        element: <Repair />,
        children: [
          {
            index: true,
            path: "",
            element: <RepairReplace />,
          },
          {
            path: "/repair/replace",
            element: <RepairReplace />,
          },
          {
            path: "/repair/repair",
            element: <RepairReplace />,
          },
          {
            path: "viewRepair",
            element: <ViewRepair />,
          },
          {
            path: "addRepair",
            element: <AddRepair />,
          },
          {
            path: "editRepairReplace",
            element: <EditRepairReplace />,
          },
        ],
      },

      {
        path: "/employees",
        element: <Employees />,
        children: [
          {
            path: "addProfile",
            element: <AddProfile />,
          },
          {
            path: "viewEmployee",
            element: <EmployeeView />,
          },
          {
            path: "editProfile",
            element: <EditProfile />,
          },
        ],
      },
      // {
      //   path: "/viewEmployee",
      //   element: <EmployeeView />,
      // },
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
      // {
      //   path: "/addAssets",
      //   element: <AddAssets />,
      // },
      // {
      //   path: "/editAssets",
      //   element: <EditAssets />,
      // },
      // {
      //   path: "/viewAssets",
      //   element: <ViewAssets />,
      // },
    ],
  },
  {
    path: "/login",
    element: (
      <LoginSignupProtectedRoute>
        <Login />
      </LoginSignupProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <LoginSignupProtectedRoute>
        <Signup />
      </LoginSignupProtectedRoute>
    ),
  },
]);
