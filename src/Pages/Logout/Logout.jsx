import { useMutation } from "@tanstack/react-query";
import { LogoutSvg } from "../../Component/svg/LogoutSvg";
import { clearTokenFromLocalStorage } from "../../utils/StorageUtils";
import { logoutUser } from "./LogoutApiSlice";
import { useNavigate } from "react-router-dom";
import { notifyError } from "../../Component/Toast/Toast";
import { useEffect } from "react";

const Logout = ({ toggleNavbar }) => {
  const navigate = useNavigate();

  const LogoutUser = useMutation({
    mutationFn: () => {
      return logoutUser();
    },
    onSuccess: () => {
      //   notify(successMessage);
      clearTokenFromLocalStorage();
      // localStorage.setItem("logoutFlag", Date.now().toString());
      navigate("/login");
    },
    onError: (error) => {
      notifyError(error.message);
      if (error.response.status === 401) {
        notifyError("Error");
      }
    },
  });
  useEffect(() => {
    const handleStorageChange = () => {
      window.location.reload();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
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
