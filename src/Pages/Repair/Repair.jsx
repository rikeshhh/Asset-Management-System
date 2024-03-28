import CustomToastContainer from "../../Component/Toast/ToastContainer";
import "./Repair.css";
import { Outlet } from "react-router-dom";

const Repair = () => {
  return (
    <>
      <Outlet />
      <CustomToastContainer />
    </>
  );
};

export default Repair;
