import "../../Component/Table/Table.css";
import { Link } from "react-router-dom";
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

const ReplaceDataTable = ({ handleTableEdit, onFilterClick }) => {
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);
  const [replaceId, setReplaceId] = useState();
  const [searchData, setSearchData] = useState("");

  const tableHeads = ["Product Code", "Name", "Category"];
  const {
    isPending,
    error,
    data: replaceTableData,
  } = useQuery({
    queryKey: ["ReplaceTableData", searchData],
    queryFn: () => getReplaceTableData(searchData),
    staleTime: 10000,
  });

  const DeleteReplace = useMutation({
    mutationFn: () => deleteRepairReplace(replaceId),
    onSuccess: () => {
      queryClient.invalidateQueries("ReplaceTableData");
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

  const submitSearch = (data) => {
    setSearchData(data.Search);
  };

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
                <th>
                  Product Code <LuArrowUpDown />
                </th>
                <th>
                  Name
                  <LuArrowUpDown />
                </th>
                <th>
                  Category
                  <LuArrowUpDown />
                </th>
                <th>
                  Status <LuArrowUpDown />
                </th>
                <th>
                  Assigned Date <LuArrowUpDown />
                </th>

                <th>Action</th>
              </tr>
            )}
          </thead>
          <tbody>
            {isPending ? (
              <PendingTableBody />
            ) : (
              replaceTableData.map((tableItem, index) => (
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
                    {/* <Link to={linkTo} className="link"> */}
                    <Button
                      type={"button"}
                      className="edit__button"
                      handleClick={handleTableEdit}
                      text={<CiEdit />}
                    />
                    {/* </Link> */}
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
    </>
  );
};
export default ReplaceDataTable;
