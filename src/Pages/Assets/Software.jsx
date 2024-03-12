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
import CustomToastContainer from "../../Component/Toast/ToastContainer";
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
  const searchSoftware = searchParams.get("search");
  const searchCategory = searchParams.get("category");
  const fromDate = searchParams.get("fromDate");
  const assets_type = searchParams.get("assets_type");
  const toDate = searchParams.get("toDate");
  const searchDate = `${fromDate} to ${toDate}`;
  const searchStatus = searchParams.get("status");
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
    setSearchParams({
      ...data,
    });
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
  const {
    isPending,
    error,
    refetch,
    data: softwareData,
  } = useQuery({
    queryKey: [
      "AssetsData",
      "SoftwareData",
      "software",
      searchSoftware,
      pageNumber,
      searchCategory,
      searchStatus,
      fromDate,
      toDate,
    ],
    queryFn: () =>
      getAssetsData(
        "software",
        searchSoftware,
        pageNumber,
        searchCategory,
        searchStatus,
        searchDate
      ),
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

  const onFilterClick = (showHide) => {
    setFilterShow(showHide);
  };
  if (error)
    return (
      <div>
        <h2>No item found</h2>
      </div>
    );
  // const totalData = softwareData.totalData;
  console.log(softwareData);
  let totalData;

  if (softwareData) {
    totalData = softwareData.totalData;
  }
  const roundUp = Math.ceil(totalData / 7);
  return (
    <>
      {filterShow ? (
        <Filter
          assetsType="software"
          handleClick={() => onFilterClick(!filterShow)}
        />
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
            message={"hii"}
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
        tableData={softwareData?.data}
        isPending={isPending}
        assets_type="software"
      />
      <div className="pagination">
        <Button
          className="inactivePage"
          icon={<FaAngleLeft />}
          handleClick={() =>
            updatePageNumber(pageNumber > 1 ? pageNumber - 1 : 1)
          }
        />
        {softwareData &&
          [...Array(roundUp)].map((_, index) => (
            <>
              {index === roundUp - 2 ? (
                <Button
                  key={index}
                  text="..."
                  className={
                    pageNumber === index + 1 ? "activePage" : "inactivePage"
                  }
                  handleClick={() => updatePageNumber(index + 1)}
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
      <CustomToastContainer />
    </>
  );
};

export default Software;
