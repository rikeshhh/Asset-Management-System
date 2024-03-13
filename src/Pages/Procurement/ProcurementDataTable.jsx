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

const ProcurementDataTable = ({ linkTo, handleTableEdit }) => {
  const {
    isPending,
    error,
    data: procurementTableData,
  } = useQuery({
    queryKey: ["procurementTableData"],
    queryFn: getProcurementTableData,
    staleTime: 10000,
  });

  const tableHeadOptions = [
    "Requested By",
    "No. of Items",
    "Status",
    "Verified By",
    "Verified Data",
  ];

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
                  {tableHead} <LuArrowUpDown />
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
            procurementTableData.map((tableItem, index) => (
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
                      onClick={handleTableEdit}
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
    </div>
  );
};
export default ProcurementDataTable;
