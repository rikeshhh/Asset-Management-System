import "../../Component/Table/Table.css";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { getEmployeeTableData } from "./EmployeeApiSlice";
import { useQuery } from "@tanstack/react-query";
import Button from "../../Component/Button/Button";
import PendingTableHead from "../../Component/PendingTable/PendingTableHead";
import PendingTableBody from "../../Component/PendingTable/PendingTableBody";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LuArrowUpDown } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";

/**
 * Employee data table component that displays a table of employee information.
 */

const EmployeeDataTable = ({
  handleTableEdit,
  handleDeleteClick,
  handleViewEmployee,
}) => {
  const {
    isPending,
    error,
    data: tableData,
  } = useQuery({
    queryKey: ["EmployeeData"],
    queryFn: getEmployeeTableData,
  });

  console.log("TableData", tableData);
  /**
   * Handles deleting an employee.
   * @param {number} employeeId - The ID of the employee to be deleted.
   */

  const handleDeleteEmployee = (employeeId) => {
    handleDeleteClick(employeeId);
  };

  /**
   * Handles editing an employee's information.
   * @param {Object} tableItem - The employee data to be edited.
   */
  const handleEditEmployee = (tableItem) => {
    handleTableEdit(tableItem);
  };

  const viewEmployeeProfile = (employee) => {
    handleViewEmployee(employee);
  };
  // If an error occurs during data fetching, display an error message.
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="table__container">
      <table className="main__table">
        <thead>
          {isPending ? (
            <PendingTableHead />
          ) : (
            <tr className="table__heading__row">
              <th>
                ID{" "}
                <span>
                  <LuArrowUpDown />
                </span>
              </th>
              <th>
                User{" "}
                <span>
                  <LuArrowUpDown />
                </span>
              </th>
              <th>
                Designation{" "}
                <span>
                  <LuArrowUpDown />
                </span>
              </th>
              <th>
                Department{" "}
                <span>
                  <LuArrowUpDown />
                </span>
              </th>
              <th>
                Email{" "}
                <span>
                  <LuArrowUpDown />
                </span>
              </th>
              <th>
                Phone{" "}
                <span>
                  <LuArrowUpDown />
                </span>
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
                <td data-cell="id">{tableItem.id}</td>
                <td data-cell="name">{tableItem.name}</td>
                <td data-cell="designation">
                  {tableItem.designation}
                </td>
                <td data-cell="department">
                  {tableItem.department.name}
                </td>
                <td data-cell="email">{tableItem.email}</td>
                <td data-cell="phone">
                  {tableItem.phone_number}
                </td>
                <td className="button-gap">
                  <Button
                    type={"button"}
                    className="edit__button"
                    handleClick={() => viewEmployeeProfile(tableItem)}
                    text={<MdOutlineRemoveRedEye />}
                  />
                  <Button
                    type={"button"}
                    className="edit__button"
                    handleClick={() => handleEditEmployee(tableItem)}
                    text={<CiEdit />}
                  />
                  <Button
                    type={"button"}
                    className="delete__button"
                    text={<GoTrash />}
                    handleClick={() => handleDeleteEmployee(tableItem.id)}
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
export default EmployeeDataTable;
