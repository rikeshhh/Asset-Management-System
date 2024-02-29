import "./Assets.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../Component/Button/Button";
import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import { BsFunnel } from "react-icons/bs";
import Filter from "../../Component/Filter/Filter";
import { SearchInput } from "../../Component/SearchInput/SearchInput";
import AssetsTableData from "./AssetsTableData";
import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";
import {
  deleteAssetsTableData,
  getAssetsData,
  getAssetsTableData,
  getSearchInput,
} from "./AssetsApiSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SearchSvg } from "../../Component/svg/SearchSvg";
import { InputField } from "../../Component/Input/InputField";

const Hardware = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isActive, setIsActive] = useState(true);

  const [activeButton, setActiveButton] = useState("hardware");

  const handleButtonClick = () => {
    setIsActive((prev) => !prev);
  };

  const [filterShow, setFilterShow] = useState(false);

  const onFilterClick = (showHide) => {
    setFilterShow(showHide);
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
  const {
    isPending,
    error,
    data: HardwareData,
  } = useQuery({
    queryKey: ["AssetsData", "HardwareData"],
    queryFn: () => getAssetsData("hardware"),
    staleTime: 10000,
  });
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
  const [searchAssets, setSearchAssets] = useState();
  const [showSearchItem, setShowSearchItem] = useState(true);
  const submitSearch = async (data) => {
    try {
      const searchResult = await getSearchInput(data.search);
      setShowSearchItem((prev) => !prev);
      console.log(searchResult);
      setSearchAssets(searchResult);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSoftwareClick = () => {
    console.log("software");
  };
  const handleHardwareClick = () => {
    console.log("hardware");
  };
  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <AssetsTableData
        handleDeleteClick={handleDeleteClick}
        handleProceedClick={handleProceedClick}
        tableData={HardwareData}
        isPending={isPending}
      />
    </>
  );
};

export default Hardware;
