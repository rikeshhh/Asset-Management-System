import "../../Component/Table/Table.css";
import { Link } from "react-router-dom";
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
import { useState } from "react";
import { queryClient } from "../../Component/Query/Query";
import { notifySuccess } from "../../Component/Toast/Toast";

const RepairDataTable = ({ onFilterClick }) => {
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);
  const [repairId, setRepairId] = useState();
  const [searchData, setSearchData] = useState("");
  const [sortData, setSortData] = useState("id");
  const [sortOrder, setSortOrder] = useState("ASC");
  const tableHeads = [
    "Product code",
    "Name",
    "Category",
    "Status",
    "Assigned date",
  ];

  const {
    isPending,
    error,
    data: tableData,
  } = useQuery({
    queryKey: ["RepairTableData", searchData, sortData, sortOrder],
    queryFn: () => getRepairTableData(searchData, sortData, sortOrder),
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

  const submitSearch = (data) => {
    setSearchData(data.Search);
  };

  const handleStatusClick = (tableHead) => {
    const newOrder = sortOrder === "ASC" ? "DESC" : "ASC";
    setSortOrder(newOrder);
    setSortData(tableHead);
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
        <SearchInput submitSearch={submitSearch} />
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
                  <th key={index} onClick={() => handleStatusClick(tableHead)}>
                    {tableHead}
                    <span>
                      <LuArrowUpDown />
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
              tableData?.data.map((tableItem, index) => (
                <tr key={index}>
                  <td>ITJ-DA-{tableItem.id}</td>
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
    </>
  );
};
export default RepairDataTable;
