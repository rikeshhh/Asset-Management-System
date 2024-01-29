import "./Table.css";
import { useState, useMemo } from "react";
import data from "./data/MOCK_DATA.json";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Pagination from "../Pagination/Pagination";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { useForm } from "react-hook-form";
const Table = ({ size, linkTo, handleTableEdit }) => {
  let PageSize = size ? size : 10 || 8;
  const [currentPage, setCurrentPage] = useState(1);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <div className="table__container">
      <table className="main__table">
        <thead>
          <tr>
            <th>ProductCode</th>
            <th>Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Assigned Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.productCode}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.status}</td>
                <td>{item.assignedTo}</td>
                <td>{item.AssignedDate}</td>
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
            );
          })}
        </tbody>
      </table>
      {size ? (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      ) : (
        ""
      )}
    </div>
  );
};
export default Table;
