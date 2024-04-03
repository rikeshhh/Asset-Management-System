import "../../Component/Table/Table.css";
import { Link } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteProcurement,
  getProcurementTableData,
} from "./ProcurementApiSlice";
import Button from "../../Component/Button/Button";
import PendingTableHead from "../../Component/PendingTable/PendingTableHead";
import PendingTableBody from "../../Component/PendingTable/PendingTableBody";
import { LuArrowUpDown } from "react-icons/lu";
import { EyeSvg } from "../../Component/svg/EyeSvg";
import Pagination from "../../Component/Pagination/Pagination";
import { useState } from "react";
import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";
import { queryClient } from "../../Component/Query/Query";
import { notifySuccess } from "../../Component/Toast/Toast";
import CustomToastContainer from "../../Component/Toast/ToastContainer";
import { EmptyData } from "../../Component/EmptyData/EmptyData";

const ProcurementDataTable = ({
  setPageNumber,
  pageNumber,
  params,
  setSearchParams,
}) => {
  const [sortOrder, setSortOrder] = useState("desc");
  const [procurementId, setProcurementId] = useState();
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);
  const [sortedTableHead, setSortedTableHead] = useState("");
  const searchProcurement = params.get("Search") || "";
  const sortData = params.get("sortBy") || "approved_date";
  const newSortOrder = params.get("sortOrder") || "desc";
  const filterByApprovedDate = params.get("assigned_date") || "";
  const filterByStatus = params.get("status") || "";
  const filterByUser = params.get("requested_by") || "";
  const filterByApproved = params.get("verified_by") || "";

  const {
    isPending,
    error,
    data: procurementTableData,
  } = useQuery({
    queryKey: [
      "procurementTableData",
      pageNumber,
      searchProcurement,
      newSortOrder,
      sortData,
      filterByApprovedDate,
      filterByStatus,
      filterByUser,
      filterByApproved,
    ],
    queryFn: () =>
      getProcurementTableData(
        pageNumber,
        searchProcurement,
        newSortOrder,
        sortData,
        filterByApprovedDate,
        filterByStatus,
        filterByUser,
        filterByApproved
      ),
  });
  const totalData = procurementTableData?.totalData;
  const roundUp = Math.ceil(totalData / 7);

  const DeleteProcurement = useMutation({
    mutationFn: () => deleteProcurement(procurementId),
    onSuccess: () => {
      queryClient.invalidateQueries("procurementTableData");
      notifySuccess("Procurement Data has been deleted successfully");

      if (
        pageNumber > 1 &&
        totalData <= pageNumber * 7 &&
        totalData % 7 === 1
      ) {
        setPageNumber(pageNumber - 1); // Navigate to previous page
      }
    },
    onError: (error) => {
      console.log("Error deleting procurement data");
    },
  });

  const tableHeadOptions = [
    "Requested By",
    "No. of Items",
    "Status",
    "Verified By",
    "Verified Date",
  ];

  const handleStatusClick = (tableHead, index) => {
    setSortedTableHead(index);
    let newOrder = sortOrder === "asc" ? "desc" : "asc";
    let sortBy = "approved_date";
    if (tableHead === "No. of Items") {
      sortBy = "number_of_items";
    } else if (tableHead === "Requested By") {
      sortBy = "requested_by_id";
    } else if (tableHead === "Verified Date") {
      sortBy = "approved_date";
    } else if (tableHead === "Verified By") {
      sortBy = "approved_by_id";
    } else {
      sortBy = "status";
    }
    setSearchParams({
      ...params,
      sortOrder: newOrder,
      sortBy: sortBy,
    });
    setSortOrder(newOrder);
  };

  const handleProcurementDelete = (procurementID) => {
    setDeleteConfirationShow(true);
    setProcurementId(procurementID);
  };

  const handleCancelClick = () => {
    setDeleteConfirationShow(false);
  };

  const handleProceedClick = () => {
    DeleteProcurement.mutate();
    setDeleteConfirationShow(false);
  };

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {deleteConfirationShow && (
        <DeleteConfirmation
          deleteName="Procurement"
          handleCancelClick={handleCancelClick}
          handleProceedClick={handleProceedClick}
        />
      )}
      <div className="table__container">
        <table className="main__table">
          <thead>
            {isPending ? (
              <PendingTableHead />
            ) : (
              <tr>
                {tableHeadOptions.map((tableHead, index) => (
                  <th
                    key={tableHead}
                    className={
                      sortedTableHead === index ? "selected-tablehead" : ""
                    }
                  >
                    {tableHead}{" "}
                    <LuArrowUpDown
                      className="sort__icon"
                      onClick={() => handleStatusClick(tableHead, index)}
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
            ) : procurementTableData?.data.length < 1 ? (
              <EmptyData />
            ) : (
              procurementTableData?.data.map((tableItem, index) => (
                <tr key={index}>
                  <td data-cell="Requested By">
                    {tableItem.user.requested_by
                      ? tableItem.user.requested_by
                      : "N/A"}
                  </td>
                  <td data-cell="No. of Items">{tableItem.number_of_items}</td>
                  <td data-cell="Status">{tableItem.status}</td>
                  <td data-cell="Verified By">{tableItem.approved_by_name}</td>
                  <td data-cell="Verified Date">{tableItem.approved_date}</td>
                  <td className="button-gap">
                    <Link
                      to={"/procurement/viewProcurement"}
                      state={{ data: tableItem }}
                      className="link"
                    >
                      <Button
                        type={"button"}
                        className=" view__button"
                        text={<EyeSvg />}
                      />
                    </Link>
                    <Link
                      to={"/procurement/editProcurement"}
                      state={{ data: tableItem }}
                      className="link"
                    >
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
                      handleClick={() => handleProcurementDelete(tableItem.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {roundUp > 1 && (
          <Pagination
            setSearchParams={setSearchParams}
            data={procurementTableData}
            roundUp={roundUp}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
          />
        )}
        <CustomToastContainer />
      </div>
    </>
  );
};
export default ProcurementDataTable;
