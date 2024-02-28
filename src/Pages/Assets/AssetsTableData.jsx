import "../../Component/Table/Table.css";
import { Link } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import Button from "../../Component/Button/Button";
import { getAssetsTableData } from "../../Api/Assets/AssetsApiSlice";
import PendingTableHead from "../../Component/PendingTable/PendingTableHead";
import PendingTableBody from "../../Component/PendingTable/PendingTableBody";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const AssetsTableData = ({ size, linkTo, handleTableEdit }) => {
  const {
    isPending,
    error,
    data: tableData,
  } = useQuery({
    queryKey: ["tableData"],
    queryFn: getAssetsTableData,
    staleTime: 10000,
  });

  // if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="table__container">
      <table className="main__table ">
        <thead>
          {isPending ? (
            <PendingTableHead />
          ) : (
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Assignedto</th>
              <th>Assigneddate</th>
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
                <td data-cell="name">
                  <p
                    className={
                      `${tableItem.name}`.length >= 4 ? "hoverEffect" : ""
                    }
                    data-name={`${tableItem.name}`}
                  >
                    {" "}
                    {tableItem.name}
                  </p>
                </td>
                <td data-cell="designation">{tableItem.category}</td>
                <td data-cell="status">{tableItem.status}</td>
                <td data-cell="assigned to">{tableItem.assigned_to_name}</td>
                <td data-cell="phone">{tableItem.phone}</td>
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
export default AssetsTableData;
