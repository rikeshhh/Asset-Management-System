import {toast } from "react-toastify";
import './Toast.css'
export function notify (successMessage,errorMessage) {
    toast.success(successMessage||errorMessage, {
      position: "bottom-right",
      className: 'success-bar'
    });
  }

