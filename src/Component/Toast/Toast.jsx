import {toast } from "react-toastify";
import './Toast.css'
const Msg = ({ Message,title }) => (
  <div className="toastBody">
    <h1>{title}</h1>
    <p>
    {Message}
      </p> 
  </div>
);
const Success= "Success";
const Error ="Error";
const deleted= "Deleted";
export function notifySuccess (successMessage) {
    toast.success(<Msg Message={successMessage} title={Success}/>, {
      position: "bottom-right",
      className: 'success-bar'
    });
  }

  export function notifyDelete(deleteMessage) {
    toast.error(<Msg Message={deleteMessage} title={deleted}/>, {
      position: "bottom-right",
      className: 'error-bar'
    });
  }