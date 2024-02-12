import { ToastContainer as ReactToastContainer } from "react-toastify";
import './Toast.css'
const CustomToastContainer = () => {
  return (
    <ReactToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default CustomToastContainer;
