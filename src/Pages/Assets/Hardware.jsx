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
import Model from "../../Component/Model/Model";
import { notifyError } from "../../Component/Toast/Toast";

const Hardware = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
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
  const [filterShow, setFilterShow] = useState(false);

  const onFilterClick = (showHide) => {
    setFilterShow(showHide);
  };
  const submitSearch = async (data) => {
    try {
      const searchResult = await getSearchInput(data.search, "hardware");

      setSearchAssets(searchResult);
    } catch (error) {
      notifyError(error.message);
    }
  };
  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      {filterShow ? (
        <Filter handleClick={() => onFilterClick(!filterShow)} />
      ) : (
        <></>
      )}
      <div className="ams__filter ">
        <form className="search__form" onSubmit={handleSubmit(submitSearch)}>
          <SearchSvg className="icons" />
          <InputField
            name="search"
            register={register}
            placeholder="Search"
            className="search-input"
            value={Model.assetSearch.pattern.value}
            message={Model.assetSearch.pattern.message}
            errors={errors}
            type={Model.assetSearch.type}
            minLength={Model.assetSearch.minLength.value}
            minMessage={Model.assetSearch.minLength.message}
            maxLength={Model.assetSearch.maxLength.value}
            maxMessage={Model.assetSearch.maxLength.message}
          />
        </form>
        <Button
          text="Filter"
          icon={<BsFunnel />}
          className="filter--button"
          handleClick={() => onFilterClick(!filterShow)}
        />
      </div>
      <AssetsTableData
        handleDeleteClick={handleDeleteClick}
        handleProceedClick={handleProceedClick}
        tableData={searchAssets || HardwareData}
        isPending={isPending}
        assets_type="hardware"
      />
    </>
  );
};

export default Hardware;
