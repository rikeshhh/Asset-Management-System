import "../../Component/Table/Table.css";
import { Link } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import Button from "../../Component/Button/Button";
import { getAssetsTableData } from "./AssetsApiSlice";
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
                <td data-cell="id">{tableItem.id}</td>
                <td
                  data-cell="name"
                  className={
                    `${tableItem.name}`.length >= 12 ? "hoverEffect" : ""
                  }
                  data-name={`${tableItem.name}`}
                >
                  {tableItem.name}
                </td>
                <td data-cell="designation">
                  {/* {tableItem.designation} */}
                  <Skeleton width={127} height={10} />
                </td>
                <td data-cell="department">
                  <Skeleton width={127} height={10} />
                  {/* {tableItem.department} */}
                </td>
                <td data-cell="email">{tableItem.email}</td>
                <td data-cell="phone">
                  <Skeleton width={127} height={10} />
                  {/* Shows loadiing skeleton on not received data */}

                  {/* {tableItem.phone} */}
                </td>
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
