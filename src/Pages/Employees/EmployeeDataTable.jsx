import "../../Component/Table/Table.css";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { getEmployeeTableData } from "./EmployeeApiSlice";
import { useQuery } from "@tanstack/react-query";
import Button from "../../Component/Button/Button";
import PendingTableHead from "../../Component/PendingTable/PendingTableHead";
import PendingTableBody from "../../Component/PendingTable/PendingTableBody";
/**
 * Employee data table component that displays a table of employee information.
 */

const EmployeeDataTable = ({ handleTableEdit, handleDeleteClick }) => {
  const {
    isPending,
    error,
    data: tableData,
  } = useQuery({
    queryKey: ["EmployeeData"],
    queryFn: getEmployeeTableData,
  });
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

  // If an error occurs during data fetching, display an error message.
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="table__container">
      <table className="main__table">
        <thead>
          {isPending ? (
            <PendingTableHead />
          ) : (
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Email</th>
              <th>Phone</th>
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
                <td>{tableItem.phone}</td>
                <td className="button-gap">
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
