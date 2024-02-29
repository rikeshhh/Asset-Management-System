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
import { MdOutlineRemoveRedEye } from "react-icons/md";

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

  const tableData = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      department: "Engineering",
      email: "john.doe@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      designation: "UX Designer",
      department: "Design",
      email: "jane.smith@example.com",
    },
    // Add more objects as needed
  ];
  // if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="table__container">
      <table className="main__table">
        <thead>
          {isPending ? (
            <PendingTableHead />
          ) : (
            <tr>
              <th>
                Requested By <LuArrowUpDown />
              </th>
              <th>
                No. of Items
                <LuArrowUpDown />
              </th>
              <th>
                Status <LuArrowUpDown />
              </th>
              <th>
                Approved By <LuArrowUpDown />
              </th>
              <th>
                Approved By
                <LuArrowUpDown />
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
                <td>{tableItem.id}</td>
                <td>{tableItem.name}</td>
                <td>{tableItem.designation}</td>
                <td>{tableItem.department}</td>
                <td>{tableItem.email}</td>
                <td className="button-gap">
                  <Button
                    type={"button"}
                    className="edit__button"
                    // handleClick={() => viewEmployeeProfile(tableItem)}
                    text={<MdOutlineRemoveRedEye />}
                  />
                  <Link to={linkTo} className="link">
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
