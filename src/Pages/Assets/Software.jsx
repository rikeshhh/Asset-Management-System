import "./Assets.css";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
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
import {
  deleteAssetsTableData,
  getAssetsData,
  getAssetsTableData,
} from "./AssetsApiSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SearchSvg } from "../../Component/svg/SearchSvg";
import { InputField } from "../../Component/Input/InputField";
import { queryClient } from "../../Component/Query/Query";
import Model from "../../Component/Model/Model";
import { notifyError } from "../../Component/Toast/Toast";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
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
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(
    parseInt(searchParams.get("page")) || 1
  );
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
  const submitSearch = (data) => {
    setSearchAssets(data.search);
  };

  const DeleteAssets = useMutation({
    mutationFn: (assetsid) => {
      return deleteAssetsTableData(assetsid);
    },
    onSuccess: () => {
      notifySuccess("Asset Deleted Successfully");
      queryClient.invalidateQueries("softwareData");
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
    queryKey: ["AssetsData", "SoftwareData", searchAssets, pageNumber],
    queryFn: () => getAssetsData("software", searchAssets, pageNumber),
    staleTime: 10000,
  });

  // if (isPending) return "Loading...";
  const handleSoftwareClick = () => {
    console.log("software");
  };
  const handleHardwareClick = () => {
    console.log("hardware");
  };
  const updatePageNumber = (newPageNumber) => {
    setPageNumber(newPageNumber);
    setSearchParams({ page: newPageNumber });
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
      <AssetsTableData
        handleDeleteClick={handleDeleteClick}
        handleProceedClick={handleProceedClick}
        tableData={softwareData}
        isPending={isPending}
        assets_type="software"
      />
      <div className="pagination">
        <Button
          icon={<FaAngleLeft />}
          handleClick={() =>
            updatePageNumber(pageNumber > 1 ? pageNumber - 1 : 1)
          }
        />
        {softwareData &&
          [...Array(4)].map((_, index) => (
            <Button
              key={index}
              text={index + 1}
              className={
                pageNumber === index + 1 ? "activePage" : "inactivePage"
              }
              handleClick={() => updatePageNumber(index + 1)}
            />
          ))}{" "}
        <Button
          handleClick={() =>
            updatePageNumber(
              pageNumber > Math.ceil(softwareData["total data"] / 7)
                ? pageNumber + 1
                : pageNumber + 1
            )
          }
          icon={<FaAngleRight />}
          // isDisabled={pageNumber < 4}
        />
      </div>
    </>
  );
};

export default Software;
