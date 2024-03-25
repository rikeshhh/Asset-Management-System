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
import { notifyError, notifySuccess } from "../../Component/Toast/Toast";
import CustomToastContainer from "../../Component/Toast/ToastContainer";
import Model from "../../Component/Model/Model";

const Assets = () => {
  // Define state to manage the active state of a component
  const [isActive, setIsActive] = useState(true);

  // Extracting the pageNumber parameter from the URL using useParams hook
  const { pageNumber } = useParams();

  // Function to handle button click events and toggle the isActive state
  const handleButtonClick = () => {
    setIsActive((prev) => !prev);
  };

  // Define state to manage the visibility of the delete confirmation modal
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);

  // Define state to store the ID of the assets to be deleted
  const [assetsId, setAssetsId] = useState();

  // Define state to manage the visibility of search items
  const [showSearchItem, setShowSearchItem] = useState(true);

  // Define state to manage the active button (e.g., hardware, software, etc.)
  const [activeButton, setActiveButton] = useState("hardware");

  // Access the navigate function from the react-router-dom package to handle navigation
  const navigate = useNavigate();

  /**
   * Handles the click to navigate to software.
   */
  const handleSoftwareClick = () => {
    navigate(`/assets/software/${pageNumber}`);
  };

  /**
   * Handles the click to navigate to hardware.
   */
  const handleHardwareClick = () => {
    navigate("/assets/*");
  };

  return (
    <>
    
      <section className="content-wrapper">
       
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
              <div className="">
                <Outlet />
              </div>

              {/* )} */}
            </>
        <CustomToastContainer />
      </section>
    </>
  );
};

export default Assets;
