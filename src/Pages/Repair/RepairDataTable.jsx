import "../../Component/Table/Table.css";
import { Link, useSearchParams } from "react-router-dom";
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
import { notifySuccess } from "../../Component/Toast/Toast";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Pagination from "../../Component/Pagination/Pagination";

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
  const [sortData, setSortData] = useState("Assigned_date");
  const [sortOrder, setSortOrder] = useState("ASC");

  const searchRepair = params.get("Search") || "";

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
      sortOrder,
      pageNumber,
    ],
    queryFn: () =>
      getRepairTableData(searchRepair, sortData, sortOrder, pageNumber),
    staleTime: 10000,
  });

  const DeleteRepair = useMutation({
    mutationFn: () => deleteRepairReplace(repairId),
    onSuccess: () => {
      queryClient.invalidateQueries("RepairTableData");
      notifySuccess("Repair Data has been deleted successfully");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const totalData = repairTableData?.total_data;
  const roundUp = Math.ceil(totalData / 7);

  const handleRepairEdit = () => {};

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
    const newOrder = sortOrder === "ASC" ? "DESC" : "ASC";
    setSortOrder(newOrder);
    if (tableHead === "Assigned date") {
      setSortData("Assigned_date");
    } else if (tableHead === "Product code") {
      setSortData("Product_Code");
    } else if (tableHead === "name") {
      setSortData("assets_name");
    } else {
      setSortData(tableHead);
    }
  };

  // if (isPending) return "Loading...";

  if (error) return "An error has occurred: ";

  return (
    <>
      {deleteConfirationShow && (
        <DeleteConfirmation
          deleteName="Replace"
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
            ) : (
              repairTableData?.data.map((tableItem, index) => (
                <tr key={index}>
                  <td>ITJ-DA-{tableItem.Product_Code.id}</td>
                  <td>
                    {tableItem.Product_Code.name
                      ? tableItem.Product_Code.name
                      : "N/A"}
                  </td>
                  <td>
                    {tableItem.Category ? tableItem.Category.name : "N/A"}
                  </td>
                  <td>{tableItem.Status}</td>
                  <td>{tableItem.Assigned_Date}</td>
                  <td className="button-gap">
                    {/* <Link  to={{ pathname: '/profile', state: false }}>
                       </Link> */}
                    <Button
                      type={"button"}
                      className="view__button"
                      // handleClick={() => viewEmployeeProfile(tableItem)}
                      text={<EyeSvg />}
                    />
                    <Link to="/editRepairReplace" state={tableItem}>
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
          params={params}
          searchParams={searchParams}
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
