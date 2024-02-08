import { Navigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../utils/StorageUtils";
import Login from "../Pages/Login/Login";

const LoginSignupProtectedRoute = () => {
  const token = getTokenFromLocalStorage();
  return token ? <Navigate to="/" /> : <Login />;
};

export default LoginSignupProtectedRoute;
