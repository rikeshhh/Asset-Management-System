import "../../Component/Table/Table.css";
import {
  Link,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import PendingTableHead from "../../Component/PendingTable/PendingTableHead";
import PendingTableBody from "../../Component/PendingTable/PendingTableBody";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";
import Tablerow from "./Tablerow";
import { LuArrowUpDown } from "react-icons/lu";
import "./Assets.css";
import CustomToastContainer from "../../Component/Toast/ToastContainer";
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
    {
      value: "id",
      label: "ID",
    },
    {
      value: "name",
      label: "Name",
    },
    {
      value: "category",
      label: "category",
    },
    {
      value: "status",
      label: "Status",
    },
    {
      value: "assigned_to",
      label: "Assigned to",
    },
    {
      value: "assigned_date",
      label: "Assigned Date",
    },
  ];
  const [searchParams, setSearchParams] = useSearchParams();
  const [assetTableData, setAssetTableData] = useState(null);

  /**
   * Handles click event for sorting table data by status.
   * @param {string} stats - Status to sort by
   */
  const [tableHeadColor, setTableHeadColor] = useState();
  const handleStatusClick = async (stats) => {
    setTableHeadColor(stats);
    const assetTableDataOrder = searchParams.get("order") || "desc";
    console.log(stats, "status");
    setSearchParams({
      sortBy: stats,
      order: assetTableDataOrder === "desc" ? "asc" : "desc",
    });
  };
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
                  <th
                    key={index}
                    onClick={() => handleStatusClick(tableHead.value)}
                  >
                    <span
                      className={`${
                        tableHead.value === tableHeadColor ? "boldy" : ""
                      }`}
                    >
                      {tableHead.label} <LuArrowUpDown />
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
            ) : tableData?.length > 0 ? (
              tableData?.map((tableItem, index) => (
                <Tablerow key={index} tableItem={tableItem} />
              ))
            ) : (
              <tr>
                <td colSpan="8" className="empty-table-cell">
                  <div className="empty-table-message">
                    <p className="">No data available</p>
                    <p>Please try again later or refresh the page</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <CustomToastContainer />
    </>
  );
};
export default AssetsTableData;
