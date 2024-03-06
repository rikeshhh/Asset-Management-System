import { ToastContainer as ReactToastContainer } from "react-toastify";
import './Toast.css'
/**
 * CustomToastContainer component responsible for rendering a customized toast container.
 * @returns {JSX.Element} JSX element representing the CustomToastContainer component.
 */
const CustomToastContainer = () => {
  return (
    <ReactToastContainer
      position="bottom-right"
      hideProgressBar={true}
      newestOnTop={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default CustomToastContainer;
