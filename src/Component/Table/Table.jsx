import "./Table.css";
import { useState, useMemo } from "react";
import data from "./data/MOCK_DATA.json";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Pagination from "../Pagination/Pagination";
import { RiDeleteBin5Line, RiEdit2Fill } from "react-icons/ri";
import { InputField } from "../Input/InputField";
import { useForm } from "react-hook-form";
const Table = ({ size }) => {
  let PageSize = size ? size : 10 || 8;
  const [isEditMode, setIsEditMode] = useState(false);
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
    <>
      <table>
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
              <tr>
                <td>{item.productCode}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.status}</td>
                <td>{item.assignedTo}</td>
                <td>{item.AssignedDate}</td>
                <td className="button-gap">
                  {/* <Link  to={{ pathname: '/profile', state: false }}>
                   </Link> */}
                  <Link to="/profile" state={isEditMode}>
                    <Button className="edit_button" text={<RiEdit2Fill />} />
                  </Link>
                  <Button
                    className="delete__button"
                    text={<RiDeleteBin5Line />}
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
    </>
  );
};
export default Table;
