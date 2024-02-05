import "./Table.css";
import { useState, useMemo } from "react";
import data from "./data/MOCK_DATA.json";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Pagination from "../Pagination/Pagination";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { getTableData } from "./TableApiSlice";
import { useQuery } from "@tanstack/react-query";
import instance from "../../axios/Axios";

const Table = ({ size, linkTo, handleTableEdit, serverPath }) => {
  const {
    isPending,
    error,
    data: tableData,
  } = useQuery({
    queryKey: ["tableData"],
    queryFn: () => {
      const response = instance
        .get("https://dummyjson.com/products")
        .then((resp) => {
          resp = response.data;
          console.log("api response: ", resp);
        });
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!tableData) return "No data available";
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
            <th>ID</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((tableItem, index) => {
            return (
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
