import { toast } from "react-toastify";
import "./Toast.css";
const Msg = ({ Message, title }) => (
  <div className="toastBody">
    <h4 className="toast__heading">{title}</h4>
    <p className="toast__paragraph">{Message}</p>
  </div>
);
const Success = "Success";
const Error = "Error";
const deleted = "Deleted";

export function notifySuccess(successMessage) {
  toast.success(<Msg Message={successMessage} title={Success} />, {
    position: "bottom-right",
    className: "success-bar",
  });
}

export function notifyDelete(deleteMessage) {
  toast.success(<Msg Message={deleteMessage} title={deleted} />, {
    position: "bottom-right",
    className: "success-bar",
  });
}

export function notifyError(errorMessage) {
  toast.error(<Msg Message={errorMessage} title={Error} />, {
    position: "bottom-right",
    className: "error-bar",
  });
}
