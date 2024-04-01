import "../../Component/Table/Table.css";
import { Link, useSearchParams } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { useMutation, useQuery } from "@tanstack/react-query";
import Button from "../../Component/Button/Button";
import PendingTableHead from "../../Component/PendingTable/PendingTableHead";
import PendingTableBody from "../../Component/PendingTable/PendingTableBody";
import { LuArrowUpDown } from "react-icons/lu";
import { EyeSvg } from "../../Component/svg/EyeSvg";
import { SearchInput } from "../../Component/SearchInput/SearchInput";
import { BsFunnel } from "react-icons/bs";
import { deleteRepairReplace, getReplaceTableData } from "./RepairApiSlice";
import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";
import { useState } from "react";
import { queryClient } from "../../Component/Query/Query";
import Pagination from "../../Component/Pagination/Pagination";
import { notifyError, notifySuccess } from "../../Component/Toast/Toast";
import CustomToastContainer from "../../Component/Toast/ToastContainer";
import { EmptyData } from "../../Component/EmptyData/EmptyData";

const ReplaceDataTable = ({
  onFilterClick,
  setPageNumber,
  pageNumber,
  params,
  setSearchParams,
}) => {
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);
  const [replaceId, setReplaceId] = useState();

  const [sortOrder, setSortOrder] = useState("DESC");

  const tableHeads = [
    "Product code",
    "name",
    "Category",
    "Status",
    "Assigned date",
  ];

  const searchReplace = params.get("Search") || "";
  const newOrder = params.get("sortOrder") || "DESC";
  const sortData = params.get("sortBy") || "Assigned_Date";
  const category = params.get("category") || "";
  const status = params.get("status") || "";

  const assigned_date = params.get("assigned_date") || "";

  const {
    isPending,
    error,
    data: replaceTableData,
  } = useQuery({
    queryKey: [
      "ReplaceTableData",
      searchReplace,
      sortData,
      sortOrder,
      pageNumber,
      category,
      status,
      assigned_date,
    ],
    queryFn: () =>
      getReplaceTableData(
        searchReplace,
        sortData,
        sortOrder,
        pageNumber,
        category,
        status,
        assigned_date
      ),
  });

  const handleStatusClick = (tableHead) => {
    let newOrder = sortOrder === "ASC" ? "DESC" : "ASC";
    let sortBy = "Assigned_date";
    if (tableHead === "Assigned date") {
      sortBy = "Assigned_date";
    } else if (tableHead === "Product code") {
      sortBy = "Product_Code";
    } else if (tableHead === "name") {
      sortBy = "assets_name";
    } else {
      sortBy = tableHead;
    }
    setSearchParams({
      ...params,
      sortOrder: newOrder,
      sortBy: sortBy,
    });
    setSortOrder(newOrder);
  };

  const totalData = replaceTableData?.total_data;
  const roundUp = Math.ceil(totalData / 7);

  const DeleteReplace = useMutation({
    mutationFn: () => deleteRepairReplace(replaceId),
    onSuccess: () => {
      notifySuccess("Replace Data has been deleted successfully");
      queryClient.invalidateQueries("ReplaceTableData");

      if (
        pageNumber > 1 &&
        totalData <= pageNumber * 7 &&
        totalData % 7 === 1
      ) {
        setPageNumber(pageNumber - 1); // Navigate to previous page
      }
    },
    onError: (error) => {
      notifyError("Error deleting repair data");
    },
  });

  // if (isPending) return "Loading...";

  if (error) return "An error has occurred: ";

  const handleReplaceDelete = (replaceID) => {
    setDeleteConfirationShow(true);
    setReplaceId(replaceID);
  };

  const handleCancelClick = () => {
    setDeleteConfirationShow(false);
  };

  const handleProceedClick = () => {
    DeleteReplace.mutate();
    setDeleteConfirationShow(false);
  };

  return (
    <>
      {deleteConfirationShow && (
        <DeleteConfirmation
          deleteName="Replace Request"
          handleCancelClick={handleCancelClick}
          handleProceedClick={handleProceedClick}
        />
      )}
      <div className="ams__filter ">
        <SearchInput
          defaultValue={""}
          setSearchParams={setSearchParams}
          setPageNumber={setPageNumber}
        />
        <Button
          text="Filter"
          icon={<BsFunnel />}
          className="filter--button"
          handleClick={onFilterClick}
        />
      </div>
      <div className="table__container">
        <table className="main__table">
          <thead>
            {isPending ? (
              <PendingTableHead />
            ) : (
              <tr>
                {tableHeads.map((tableHead, index) => (
                  <th key={index}>
                    {tableHead}
                    <span className="sort__icon">
                      <LuArrowUpDown
                        onClick={() => handleStatusClick(tableHead)}
                      />
                    </span>
                  </th>
                ))}

                <th>Action</th>
              </tr>
            )}
          </thead>
          <tbody>
            {isPending ? (
              <PendingTableBody />
            ) : replaceTableData?.data.length < 1 ? (
              <EmptyData />
            ) : (
              replaceTableData?.data.map((tableItem, index) => (
                <tr key={index}>
                  <td data-cell="Product Code">
                    ITJ-DA-{tableItem.Product_Code.id}
                  </td>
                  <td data-cell="Name">
                    {tableItem.Product_Code.name
                      ? tableItem.Product_Code.name
                      : "N/A"}
                  </td>
                  <td data-cell="Category">
                    {tableItem?.Category.name === null
                      ? "N/A"
                      : tableItem.Category.name}
                  </td>
                  <td data-cell="Status">{tableItem.Status}</td>
                  <td data-cell="Assigned Date">{tableItem.Assigned_Date}</td>
                  <td className="button-gap">
                    <Link to="/repair/viewRepair" state={tableItem}>
                      <Button
                        type={"button"}
                        className="view__button"
                        text={<EyeSvg />}
                      />
                    </Link>
                    <Link to="/repair/editRepairReplace" state={tableItem}>
                      <Button
                        type={"button"}
                        className="edit__button"
                        text={<CiEdit />}
                      />
                    </Link>
                    <Button
                      type={"button"}
                      className="delete__button"
                      text={<GoTrash />}
                      handleClick={() => handleReplaceDelete(tableItem.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {roundUp > 1 && (
        <Pagination
          setSearchParams={setSearchParams}
          data={replaceTableData}
          roundUp={roundUp}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
        />
      )}
    </>
  );
};
export default ReplaceDataTable;
