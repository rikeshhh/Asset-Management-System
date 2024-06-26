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
import { EyeSvg } from "../../Component/svg/EyeSvg";
import { EmptyData } from "../../Component/EmptyData/EmptyData";
import { getUserIdFromLocalStorage } from "../../utils/StorageUtils";
import { notifyError } from "../../Component/Toast/Toast";

/**
 * Employee data table component that displays a table of employee information.
 */

const EmployeeDataTable = ({
  handleTableEdit,
  handleDeleteClick,
  handleViewEmployee,
  tableData,
  error,
  isPending,
  handleSort,
  selectedColumn,
}) => {
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
  const option = ["ID", "User", "Designation", "Department", "Email"];
  return (
    <div className="table__container">
      <table className="main__table">
        <thead>
          {isPending ? (
            <PendingTableHead />
          ) : (
            <>
              {option.map((tableHead, index) => (
                <th
                  key={index}
                  onClick={() => handleSort(tableHead, index)}
                  className={
                    selectedColumn === index ? "selected-tablehead" : ""
                  }
                >
                  {tableHead}{" "}
                  <span className="sort__icon">
                    <LuArrowUpDown />
                  </span>
                </th>
              ))}
              <th>Phone</th>
              <th>Action</th>
            </>
          )}
        </thead>
        <tbody>
          {isPending ? (
            <PendingTableBody />
          ) : tableData.data.length > 0 ? (
            tableData?.data.map((tableItem, index) => (
              <tr key={index}>
                <td data-cell="id">ITJ-{tableItem.id}</td>

                <td data-cell="User">
                  {tableItem.name ? tableItem.name : "N/A"}
                </td>
                {/* </> */}
                {/* <td data-cell="name">{tableItem.name}</td> */}
                <td data-cell="designation">
                  {tableItem.designation ? tableItem.designation : "N/A"}
                </td>
                <td data-cell="department">
                  {tableItem.department.name
                    ? tableItem.department.name
                    : "N/A"}
                </td>
                <td data-cell="email">
                  {tableItem.email ? tableItem.email : "N/A"}
                </td>
                <td data-cell="phone">
                  {tableItem.phone_number ? tableItem.phone_number : "N/A"}
                </td>
                <td className="button-gap">
                  <Button
                    type={"button"}
                    className="view__button"
                    handleClick={() => viewEmployeeProfile(tableItem)}
                    text={<EyeSvg />}
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
          ) : (
            <EmptyData />
          )}
        </tbody>
      </table>
    </div>
  );
};
export default EmployeeDataTable;
