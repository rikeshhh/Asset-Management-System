import React, { useEffect } from "react";
/**
 * Custom hook for handling logout functionality by reloading the window when storage changes.
 */
const useLogout = () => {
  useEffect(() => {
    const handleStorageChange = () => {
      window.location.reload();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
};

export default useLogout;
