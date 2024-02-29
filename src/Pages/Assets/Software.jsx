import "./Assets.css";
import { Link, useLocation } from "react-router-dom";
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
import { queryClient } from "../../Component/Query/Query";
import Model from "../../Component/Model/Model";
import { notifyError } from "../../Component/Toast/Toast";
import Pagination from "../../Component/Pagination/Pagination";

const Software = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const handleButtonClick = () => {
    setIsActive((prev) => !prev);
  };

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
  const [searchAssets, setSearchAssets] = useState();
  const submitSearch = async (data) => {
    try {
      const searchResult = await getSearchInput(data.search, "software");
      setSearchAssets(searchResult);
    } catch (error) {
      notifyError(error.message);
    }
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

  const [filterShow, setFilterShow] = useState(false);

  const onFilterClick = (showHide) => {
    setFilterShow(showHide);
  };
  const {
    isPending,
    error,
    data: softwareData,
  } = useQuery({
    queryKey: ["AssetsData", "SoftwareData"],
    queryFn: () => getAssetsData("software"),
    staleTime: 10000,
  });

  // if (isPending) return "Loading...";
  const handleSoftwareClick = () => {
    console.log("software");
  };
  const handleHardwareClick = () => {
    console.log("hardware");
  };
  if (error) return "An error has occurred: " + error.message;
  const [paginationData, setPaginationData] = useState();
  console.log(paginationData);
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
            placeholder="search"
            className="search-input"
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
      <Pagination
        assets_type="software"
        searchAssets={searchAssets}
        asssets_data={softwareData}
        isPending={isPending}
      />
    </>
  );
};

export default Software;
