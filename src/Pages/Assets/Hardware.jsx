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
  const [searchAssets, setSearchAssets] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(
    parseInt(searchParams.get("page")) || 1
  );

  const updatePageNumber = (newPageNumber) => {
    setPageNumber(newPageNumber);
    setSearchParams({ page: newPageNumber });
  };
  const {
    isPending,
    error,
    data: HardwareData,
  } = useQuery({
    queryKey: ["AssetsData", "HardwareData", searchAssets],
    queryFn: () => getAssetsData("hardware", searchAssets),
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
  const [filterShow, setFilterShow] = useState(false);

  const onFilterClick = (showHide) => {
    setFilterShow(showHide);
  };
  const submitSearch = async (data) => {
    setSearchAssets(data.search);
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
        tableData={HardwareData}
        isPending={isPending}
        assets_type="hardware"
      />
      <div className="pagination">
        <Button
          icon={<FaAngleLeft />}
          handleClick={() =>
            updatePageNumber(pageNumber > 1 ? pageNumber - 1 : 1)
          }
        />
        {HardwareData &&
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
              pageNumber > Math.ceil(HardwareData.length / 7)
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

export default Hardware;
