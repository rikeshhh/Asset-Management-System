import "../../Component/Table/Table.css";
import {
  Link,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
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
/**
 * Component to display assets data in a table format.
 * @param {object} props - Component props
 * @param {boolean} props.isPending - Flag indicating whether data is pending
 * @param {Array} props.tableData - Array of table data
 * @param {string} props.assets_type - Type of assets
 * @returns {JSX.Element} Table component
 */
const AssetsTableData = ({ isPending, tableData, assets_type }) => {
  const options = [
    "ID",
    "Name",
    "Category",
    "Status",
    "Assigned to",
    "Assigned Date",
  ];
  const [searchParams, setSearchParams] = useSearchParams();
  const [assetTableData, setAssetTableData] = useState(null);

  /**
   * Handles click event for sorting table data by status.
   * @param {string} stats - Status to sort by
   */
  const handleStatusClick = async (stats) => {
    const assetTableDataOrder = searchParams.get("order") || "asc";
    console.log(stats, "status");
    setSearchParams({
      sortBy: stats,
      order: assetTableDataOrder === "asc" ? "desc" : "asc",
    });
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
                <th>Action</th>
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
