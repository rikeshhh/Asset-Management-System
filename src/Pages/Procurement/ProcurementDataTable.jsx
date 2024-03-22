import "../../Component/Table/Table.css";
import { Link } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import { getProcurementTableData } from "./ProcurementApiSlice";
import Button from "../../Component/Button/Button";
import PendingTableHead from "../../Component/PendingTable/PendingTableHead";
import PendingTableBody from "../../Component/PendingTable/PendingTableBody";
import { LuArrowUpDown } from "react-icons/lu";
import { EyeSvg } from "../../Component/svg/EyeSvg";
import Pagination from "../../Component/Pagination/Pagination";
import { useState } from "react";

const ProcurementDataTable = ({
  setPageNumber,
  pageNumber,
  params,
  setSearchParams,
}) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortData, setSortData] = useState("approved_date");

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

  const totalData = procurementTableData?.totalData;
  const roundUp = Math.ceil(totalData / 7);

  if (error) return "An error has occurred: " + error.message;

  return (
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
  );
};
export default ProcurementDataTable;
