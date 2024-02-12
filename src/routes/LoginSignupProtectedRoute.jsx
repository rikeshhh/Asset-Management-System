import { Navigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../utils/StorageUtils";
import Login from "../Pages/Login/Login";
import { Signup } from "../Pages/Signup/Signup";

const LoginSignupProtectedRoute = ({ children }) => {
  const token = getTokenFromLocalStorage();
  return token ? <Navigate to="/" /> : children;
};

export default LoginSignupProtectedRoute;
