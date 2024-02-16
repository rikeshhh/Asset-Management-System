import React, { useEffect } from 'react'

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
}

export default useLogout