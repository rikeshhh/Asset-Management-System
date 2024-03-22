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

const ProcurementDataTable = ({
  setPageNumber,
  pageNumber,
  params,
  setSearchParams,
}) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortData, setSortData] = useState("approved_date");
  const [procurementId, setProcurementId] = useState();
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);

  const searchProcurement = params.get("Search") || "";

  const {
    isPending,
    error,
    data: procurementTableData,
  } = useQuery({
    queryKey: [
      "procurementTableData",
      pageNumber,
      searchProcurement,
      sortOrder,
    ],
    queryFn: () => getProcurementTableData(pageNumber, searchProcurement),
    staleTime: 10000,
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
      console.log(error);
    },
  });

  const tableHeadOptions = [
    "Requested By",
    "No. of Items",
    "Status",
    "Verified By",
    "Verified Data",
  ];

  const handleStatusClick = (tableHead) => {
    const newOrder = sortOrder === "ASC" ? "DESC" : "ASC";
    setSortOrder(newOrder);
    if (tableHead === "No. of Items") {
      setSortData("number_of_items");
    } else if (tableHead === "Requested By") {
      setSortData("Product_Code");
    } else if (tableHead === "Name") {
      setSortData("assets_name");
    } else {
      setSortData(tableHead);
    }
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
          deleteName="Repair"
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
                  <th>
                    {tableHead} <LuArrowUpDown onClick={handleStatusClick} />
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
              procurementTableData?.data.map((tableItem, index) => (
                <tr key={index}>
                  <td>{tableItem.user.requested_by}</td>
                  <td>{tableItem.number_of_items}</td>
                  <td>{tableItem.status}</td>
                  <td>{tableItem.approved_by}</td>
                  <td>2024-02-21 07:31:19</td>
                  <td className="button-gap">
                    <Button
                      type={"button"}
                      className=" view__button"
                      // handleClick={() => viewEmployeeProfile(tableItem)}
                      text={<EyeSvg />}
                    />
                    <Link
                      to={"/editProcurement"}
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

        <Pagination
          setPageNumber={setPageNumber}
          data={procurementTableData}
          pageNumber={pageNumber}
          setSearchParams={setSearchParams}
          roundUp={roundUp}
        />
      </div>
    </>
  );
};
export default ProcurementDataTable;
