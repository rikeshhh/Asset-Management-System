import { Navigate } from "react-router-dom";
import { useAmsContext } from "../Component/Context/AmsContext";
import App from "../App";

const ProtectedRoute = () => {
  const { auth } = useAmsContext();

  return auth.status ? <App /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
