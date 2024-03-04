import "./Assets.css";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import Button from "../../Component/Button/Button";
import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import { BsFunnel } from "react-icons/bs";
import Filter from "../../Component/Filter/Filter";
import { SearchInput } from "../../Component/SearchInput/SearchInput";
import AssetsTableData from "./AssetsTableData";
import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";
import { deleteAssetsTableData, getAssetsTableData } from "./AssetsApiSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SearchSvg } from "../../Component/svg/SearchSvg";
import { InputField } from "../../Component/Input/InputField";
import { notifyError } from "../../Component/Toast/Toast";
import CustomToastContainer from "../../Component/Toast/ToastContainer";
import Model from "../../Component/Model/Model";

const Assets = () => {
  const [isActive, setIsActive] = useState(true);
  const { pageNumber } = useParams();
  console.log(pageNumber);
  const handleButtonClick = () => {
    setIsActive((prev) => !prev);
  };

  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);
  const [assetsId, setAssetsId] = useState();
  /**
   * Handles the click event for deleting an employee.
   * @param {Object} employee - The employee object to be deleted.
   */
  const handleDeleteClick = (assets) => {
    setDeleteConfirationShow(true);
    setAssetsId(assets);
  };

  /**
   * Handles the click event for canceling the employee deletion.
   */
  const handleCancelClick = () => {
    setDeleteConfirationShow(false);
  };

  const DeleteAssets = useMutation({
    mutationFn: (assetsid) => {
      return deleteAssetsTableData(assetsid);
    },
    onSuccess: () => {
      notifySuccess("Asset Deleted Successfully");
      queryClient.invalidateQueries("AssetsData");
    },
    onError: (error) => {
      notifyError(error.message);
      if (error.response.status === 401) {
        notifyError("Unauthorized: Please log in with valid id.");
      }
    },
  });
  /**
   * Handles the click event for proceeding with the employee deletion.
   */
  const handleProceedClick = () => {
    DeleteAssets.mutate(assetsId);
    setDeleteConfirationShow(false);
  };
  const [showSearchItem, setShowSearchItem] = useState(true);

  const [activeButton, setActiveButton] = useState("hardware");
  const navigate = useNavigate();
  const handleSoftwareClick = () => {
    navigate(`/assets/software/${pageNumber}`);
  };
  const handleHardwareClick = () => {
    navigate("/assets/*");
  };

  return (
    <>
      {deleteConfirationShow ? (
        <DeleteConfirmation
          deleteName="assetsId"
          handleCancelClick={handleCancelClick}
          handleProceedClick={handleProceedClick}
        />
      ) : (
        <></>
      )}


      <section className="content-wrapper">
        <div className="assets content-radius">
          <div className="content__header assets__header">
            <h2>Assets</h2>
            <Link to="/addAssets" className="link">
              <Button
                text="Add an Asset"
                className={"button__blue"}
                icon={<IoMdAdd />}
              />
            </Link>
          </div>

          <div className="assets__content">
            <div className="assets__navigation">
              <NavLink
                to="/assets/*"
                className={({ isActive }) =>
                  isActive ? "assets__active" : "assets__inactive"
                }
              >
                <Button
                  text="Hardware"
                  handleClick={handleHardwareClick}
                  className="assets__btn"
                />
              </NavLink>
              <NavLink
                to="/assets/software"
                className={({ isActive }) =>
                  isActive ? "assets__active" : "assets__inactive"
                }
              >
                <Button
                  text="Software"
                  handleClick={handleSoftwareClick}
                  className="assets__btn"
                />
              </NavLink>
            </div>


            <>
              {/* {searchAssets ? (
                <AssetsTableData
                  handleDeleteClick={handleDeleteClick}
                  handleProceedClick={handleProceedClick}
                  tableData={searchAssets}
                  isPending={isPending}
                  assets_type='hardware'
                />
              ) : ( */}
              <div className="assets__content">
                <Outlet />
              </div>
             
              {/* )} */}
            </>
          </div>
        </div>
        <CustomToastContainer />
      </section>
    </>
  );
};

export default Assets;
