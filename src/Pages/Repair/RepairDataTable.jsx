import "../../Component/Table/Table.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { useMutation, useQuery } from "@tanstack/react-query";
import Button from "../../Component/Button/Button";
import { deleteRepairReplace, getRepairTableData } from "./RepairApiSlice";
import PendingTableHead from "../../Component/PendingTable/PendingTableHead";
import PendingTableBody from "../../Component/PendingTable/PendingTableBody";
import { LuArrowUpDown } from "react-icons/lu";
import { EyeSvg } from "../../Component/svg/EyeSvg";
import { SearchInput } from "../../Component/SearchInput/SearchInput";
import { BsFunnel } from "react-icons/bs";
import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";
import { useEffect, useState } from "react";
import { queryClient } from "../../Component/Query/Query";
import { notifyError, notifySuccess } from "../../Component/Toast/Toast";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Pagination from "../../Component/Pagination/Pagination";
import CustomToastContainer from "../../Component/Toast/ToastContainer";

const RepairDataTable = ({
  onFilterClick,
  setPageNumber,
  pageNumber,
  params,
  searchParams,
  setSearchParams,
}) => {
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);
  const [repairId, setRepairId] = useState();
  const [sortOrder, setSortOrder] = useState("DESC");

  const searchRepair = params.get("Search") || "";
  const newOrder = params.get("sortOrder") || "DESC";
  const sortData = params.get("sortBy") || "Assigned_Date";
  const category = params.get("category") || "";
  const status = params.get("status") || "";
  const assigned_date = params.get("assigned_date") || "";

  const tableHeads = [
    "Product code",
    "name",
    "Category",
    "Status",
    "Assigned date",
  ];

  const {
    isPending,
    error,
    data: repairTableData,
  } = useQuery({
    queryKey: [
      "RepairTableData",
      searchRepair,
      sortData,
      newOrder,
      pageNumber,
      category,
      status,
      assigned_date,
    ],
    queryFn: () =>
      getRepairTableData(
        searchRepair,
        sortData,
        newOrder,
        pageNumber,
        category,
        status,
        assigned_date
      ),
  });

  const DeleteRepair = useMutation({
    mutationFn: () => deleteRepairReplace(repairId),
    onSuccess: () => {
      queryClient.invalidateQueries("RepairTableData");
      notifySuccess("Repair Data has been deleted successfully");

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
  const navigate = useNavigate();
  const totalData = repairTableData?.total_data;
  const roundUp = Math.ceil(totalData / 7);

  const handleRepairDelete = (repairID) => {
    setDeleteConfirationShow(true);
    setRepairId(repairID);
  };

  const handleCancelClick = () => {
    setDeleteConfirationShow(false);
  };

  const handleProceedClick = () => {
    DeleteRepair.mutate();
    setDeleteConfirationShow(false);
  };

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

  // if (isPending) return "Loading...";

  if (error) return "An error has occurred: ";

  return (
    <>
      {deleteConfirationShow && (
        <DeleteConfirmation
          deleteName="Repair"
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
                    <LuArrowUpDown
                      className="sort__icon"
                      onClick={() => handleStatusClick(tableHead)}
                    />
                  </th>
                ))}

                <th>Action</th>
              </tr>
            )}
          </thead>
          <tbody>
            {isPending ? (
              <PendingTableBody />
            ) : (
              repairTableData?.data.map((tableItem, index) => (
                <tr key={index}>
                  <td data-cell="Product Code">
                    ITJ-DA-{tableItem.Product_Code.id}
                  </td>
                  <td data-cell="Verified Date">
                    {tableItem.Product_Code.name
                      ? tableItem.Product_Code.name
                      : "N/A"}
                  </td>
                  <td data-cell="Name">
                    {tableItem?.Category.name === null
                      ? "N/A"
                      : tableItem.Category.name}
                  </td>
                  <td data-cell="Category">{tableItem.Status}</td>
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
                      handleClick={() => handleRepairDelete(tableItem.id)}
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
          data={repairTableData}
          roundUp={roundUp}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
        />
      )}
    </>
  );
};
export default RepairDataTable;
