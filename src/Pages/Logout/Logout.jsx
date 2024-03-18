import { useMutation } from "@tanstack/react-query";
import { LogoutSvg } from "../../Component/svg/LogoutSvg";
import { clearTokenFromLocalStorage, removeUserIdToLocalStorage } from "../../utils/StorageUtils";
import { logoutUser } from "./LogoutApiSlice";
import { useNavigate } from "react-router-dom";
import { notifyError } from "../../Component/Toast/Toast";
import { queryClient } from "../../Component/Query/Query";
import { useEffect } from "react";
import useLogout from "./useLogout";
/*
 * Logout component responsible for handling user logout functionality.
 * @returns {JSX.Element} JSX element representing the SelectInputDepartment component.

 */

const Logout = ({ toggleNavbar }) => {
  const navigate = useNavigate();

  const { logout } = useLogout();

  // feat: Mutation hook for handling logout operation
  const LogoutUser = useMutation({
    mutationFn: () => {
      return logoutUser();
    },
    onSuccess: () => {
      //   notify(successMessage);
      removeUserIdToLocalStorage()
      clearTokenFromLocalStorage();
      navigate("/login");
      logout();
    },
    onError: (error) => {
      notifyError(error.message);
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
