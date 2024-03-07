import "../../Component/Table/Table.css";
import { Link } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import Button from "../../Component/Button/Button";
import { getRepairTableData } from "./RepairApiSlice";
import PendingTableHead from "../../Component/PendingTable/PendingTableHead";
import PendingTableBody from "../../Component/PendingTable/PendingTableBody";
import { LuArrowUpDown } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { EyeSvg } from "../../Component/svg/EyeSvg";

const RepairDataTable = ({ handleTableEdit }) => {
  const {
    isPending,
    error,
    data: tableData,
  } = useQuery({
    queryKey: ["tableData"],
    queryFn: getRepairTableData,
    staleTime: 10000,
  });

  // if (isPending) return "Loading...";

  if (error) return "An error has occurred: ";

  return (
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
            tableData.map((tableItem, index) => (
              <tr key={index}>
                <td>ITJ-DA-{tableItem.id}</td>
                <td>{tableItem.name}</td>
                <td>{tableItem.Category ? tableItem.Category.name : "N/A"}</td>
                <td>{tableItem.status}</td>
                <td>{tableItem.type}</td>
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
                    onClick={handleTableEdit}
                    text={<CiEdit />}
                  />
                  {/* </Link> */}
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
export default RepairDataTable;
