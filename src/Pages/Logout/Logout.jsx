import { useMutation } from "@tanstack/react-query";
import { LogoutSvg } from "../../Component/svg/LogoutSvg";
import { clearTokenFromLocalStorage } from "../../utils/StorageUtils";
import { logoutUser } from "./LogoutApiSlice";
import { notify } from "../../Component/Toast/Toast";
import { useNavigate } from "react-router-dom";

const Logout = ({ toggleNavbar }) => {
  const navigate = useNavigate();
  const LogoutUser = useMutation({
    mutationFn: () => {
      return logoutUser();
    },
    onSuccess: () => {
      //   notify(successMessage);
      clearTokenFromLocalStorage();
      navigate("/login");
    },
    onError: (error) => {
      if (error.response.status === 401) {
        console.log("Error");
      }
    },
  });
  const handleLogout = () => {
    LogoutUser.mutate();
  };

  return (
    <li
      onClick={handleLogout}
      style={{ cursor: "pointer" }}
      className={toggleNavbar ? "link" : "navbar__list--toggle link "}
    >
      <span>
        <LogoutSvg />
      </span>
      <p>Logout</p>
    </li>
  );
};

export default Logout;
