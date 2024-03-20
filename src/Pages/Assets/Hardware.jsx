import "./Assets.css";
import {
  Link,
  useLocation,
  useNavigate,
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
import Model from "../../Component/Model/Model";
import { notifyError } from "../../Component/Toast/Toast";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
/**
 * Hardware component for managing hardware assets.
 *
 * @component
 * @returns {JSX.Element} JSX representation of the Hardware component
 */
const Hardware = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);
  const [searchAssets, setSearchAssets] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  // Extracting search parameters from the URL
  // Search keyword
  const searchHardware = searchParams.get("search");
  // Category filter
  const searchCategory = searchParams.get("category");
  // Start date filter
  const fromDate = searchParams.get("fromDate");
  // End date filter
  const toDate = searchParams.get("toDate");
  // Date range for search
  const searchDate = `${fromDate} to ${toDate}`; 
  // Type of assets
  const assets_type = searchParams.get("assets_type");
  // Assigned date filter
  const assignedDate = searchParams.get("assigned_date");
  const searchStatus = searchParams.get("status"); // Status filter
  const [filterShow, setFilterShow] = useState(false);
  const by_assets_type = searchParams.get("sortBy");
  const byStatus = searchParams.get("assets_type");
  const order = searchParams.get("order") || "asc";


  // Function to update the page number and update the URL with the new page number
  const updatePageNumber = (newPageNumber) => {
    // Set the new page number
    setPageNumber(newPageNumber); 
    // Update the URL with the new page number
    setSearchParams({ page: newPageNumber });
  };

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
    queryKey: [
      "AssetsData",
      "HardwareData",
      "hardware",
      searchHardware,
      pageNumber,
      searchCategory,
      searchStatus,
      assignedDate,
      byStatus,
      by_assets_type,
      order
    ],
    queryFn: () =>
      getAssetsData(
        "hardware",
        searchHardware,
        pageNumber,
        searchCategory,
        searchStatus,
        assignedDate,
        byStatus,
        by_assets_type,
        order
      ),
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
    },
  });

  /**
   * Handles the click event for proceeding with the employee deletion.
   */
  const handleProceedClick = () => {
    DeleteAssets.mutate(assetsId);
    setDeleteConfirationShow(false);
  };

  const onFilterClick = (showHide) => {
    setFilterShow(showHide);
  };
  const submitSearch = async (data) => {
    setSearchParams({
      ...data,
    });
  };

  if (error) return "An error has occurred: " + error.message;
  let totalData;

  if (HardwareData) {
    totalData = HardwareData.totalData;
  }
  const roundUp = Math.ceil(totalData / 7);
  const [pageNumberForEllipsis, setPageNumberForEllipsis] = useState(null);
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
            // value={Model.assetSearch.pattern.value}
            message={Model.assetSearch.pattern.message}
            errors={errors}
            type={Model.assetSearch.type}
            // minLength={Model.assetSearch.minLength.value}
            // minMessage={Model.assetSearch.minLength.message}
            // maxLength={Model.assetSearch.maxLength.value}
            // maxMessage={Model.assetSearch.maxLength.message}
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
        tableData={HardwareData?.data}
        isPending={isPending}
        assets_type="hardware"
      />
      <div className="pagination">
        <Button
          className="inactivePage"
          icon={<FaAngleLeft />}
          handleClick={() =>
            updatePageNumber(pageNumber > 1 ? pageNumber - 1 : 1)
          }
        />
        {HardwareData &&
          [...Array(roundUp)].map((_, index) => (
            <>
              {index === roundUp - 2 && pageNumber > 2 ? (
                <Button
                  key={index}
                  text={
                    pageNumberForEllipsis !== null
                      ? pageNumberForEllipsis.toString()
                      : "..."
                  }
                  className={
                    pageNumber === index + 1 ? "activePage" : "inactivePage"
                  }
                  handleClick={() => {
                    updatePageNumber(index + 1);
                    setPageNumberForEllipsis(index + 1);
                  }}
                />
              ) : (
                <Button
                  key={index}
                  text={index + 1}
                  className={
                    pageNumber === index + 1 ? "activePage" : "inactivePage"
                  }
                  handleClick={() => updatePageNumber(index + 1)}
                />
              )}
            </>
          ))}
        <Button
          className="inactivePage"
          handleClick={() =>
            updatePageNumber(pageNumber < roundUp ? pageNumber + 1 : pageNumber)
          }
          icon={<FaAngleRight />}
        />
      </div>
    </>
  );
};

export default Hardware;
