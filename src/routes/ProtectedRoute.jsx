import { Navigate } from "react-router-dom";
import App from "../App";
import { getTokenFromLocalStorage } from "../utils/StorageUtils";

const ProtectedRoute = () => {
  const token = getTokenFromLocalStorage();
  return token ? <App /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
