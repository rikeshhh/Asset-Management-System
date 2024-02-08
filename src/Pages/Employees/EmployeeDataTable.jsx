import "../../Component/Table/Table.css";
import { Link } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { getEmployeeTableData } from "./EmployeeApiSlice";
import { useQuery } from "@tanstack/react-query";
import Button from "../../Component/Button/Button";
import PendingTableHead from "../../Component/PendingTable/PendingTableHead";
import PendingTableBody from "../../Component/PendingTable/PendingTableBody";

const EmployeeDataTable = ({
  size,
  linkTo,
  handleTableEdit,
  handleDeleteClick,
}) => {
  const {
    isPending,
    error,
    data: tableData,
  } = useQuery({
    queryKey: ["EmployeeData"],
    queryFn: getEmployeeTableData,
  });


  
  const handleDeleteEmployee = (employeeId) => {
    handleDeleteClick(employeeId);
  };

  // if (isPending) return "Loading...";
  // if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="table__container">
      <table className="main__table">
        <thead>
          {isPending ? <PendingTableHead /> :
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          }
        </thead>
        <tbody>
          {isPending ? <PendingTableBody /> : (
                  tableData.map((tableItem, index) => (
                    <tr key={index}>
                      <td>{tableItem.id}</td>
                      <td>{tableItem.name}</td>
                      <td>{tableItem.designation}</td>
                      <td>{tableItem.department}</td>
                      <td>{tableItem.email}</td>
                      <td>{tableItem.phone}</td>
                      <td className="button-gap">
                        {/* <Link  to={{ pathname: '/profile', state: false }}>
                           </Link> */}
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
