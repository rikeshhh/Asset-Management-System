import "../../Component/Table/Table.css";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { useMutation, useQuery } from "@tanstack/react-query";
import Button from "../../Component/Button/Button";
import {
  deleteAssetsTableData,
  getAssetsTableData,
  sortByStatus,
} from "./AssetsApiSlice";
import PendingTableHead from "../../Component/PendingTable/PendingTableHead";
import PendingTableBody from "../../Component/PendingTable/PendingTableBody";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import Tablerow from "./Tablerow";
import { LuArrowUpDown } from "react-icons/lu";
import Pagination from "../../Component/Pagination/Pagination";
const AssetsTableData = ({ isPending, tableData, assets_type }) => {
  const options = [
    "ID",
    "Name",
    "Category",
    "Status",
    "Assigned to",
    "Assigned Date",
    "Action",
  ];
  const [assetTableData, setAssetTableData] = useState(null);
  const [assetTableDataOrder, setAssetTableDataOrder] = useState("asc");
  const [active, setActive] = useState("inactive");
  const handleStatusClick = async (stats) => {
    try {
      const newOrder = assetTableDataOrder === "asc" ? "desc" : "asc";
      const response = await sortByStatus(stats, assets_type, newOrder);
      setAssetTableData(response);
      setAssetTableDataOrder(newOrder);
    } catch (error) {
      console.log(error);
    }
  };

  const dataToRender = assetTableData || tableData;
  return (
    <>
      <div className="table__container">
        <table className="main__table">
          <thead>
            {isPending ? (
              <PendingTableHead />
            ) : (
              <>
                {options.map((tableHead, index) => (
                  <th key={index} onClick={() => handleStatusClick(tableHead)}>
                    {tableHead}
                    <span>
                      <LuArrowUpDown />
                    </span>
                  </th>
                ))}
              </>
            )}
          </thead>
          <tbody>
            {isPending ? (
              <PendingTableBody />
            ) : (
              dataToRender.map((tableItem, index) => (
                <Tablerow tableItem={tableItem} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default AssetsTableData;
