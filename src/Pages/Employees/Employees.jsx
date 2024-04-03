import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../../Component/Input/InputField";
import "./Employee.css";
import Model from "../../Component/Model/Model";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import Button from "../../Component/Button/Button";
import { IoMdAdd } from "react-icons/io";
import { BsFunnel } from "react-icons/bs";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
// import "../../Component/Pagination/Pagination.css";
import Filter from "../../Component/Filter/Filter";
import EmployeeDataTable from "./EmployeeDataTable";
import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";
import { employeeDelete, getEmployeeTableData } from "./EmployeeApiSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../Component/Query/Query";
import { notifyError, notifySuccess } from "../../Component/Toast/Toast";
import CustomToastContainer from "../../Component/Toast/ToastContainer";
import { SearchInput } from "../../Component/SearchInput/SearchInput";
import { SearchSvg } from "../../Component/svg/SearchSvg";
import FilterEmployee from "./FilterEmployee";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import PendingPagination from "../../Component/Pagination/PendingPagination";
import Pagination from "../../Component/Pagination/Pagination";
import { getUserIdFromLocalStorage } from "../../utils/StorageUtils";
/**
 * Functional component representing the Employees page.
 */
const Employees = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  /**
   * React Query hook for handling employee deletion mutation.
   */
  // const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [page, setPage] = useState(parseInt(params.get("page")) || 1);
  const itemsPerPage = 7;
  const [selectedColumn, setSelectedColumn] = useState(null);

  const searchUser = params.get("Search") || "";
  const order = params.get("orderby") || "DESC";
  const sortData = params.get("sortBy") || "id";
  const selectedDepartment = params.get("department") || "";
  const searchedDesignation = params.get("designation") || "";

  const {
    isPending,
    error,
    data: tableData,
  } = useQuery({
    queryKey: [
      "EmployeeData",
      searchUser,
      order,
      sortData,
      searchedDesignation,
      selectedDepartment,
      page,
    ],
    queryFn: () =>
      getEmployeeTableData(
        searchUser,
        order,
        sortData,
        searchedDesignation,
        selectedDepartment,
        page
      ),
    staleTime: 10000,
    keepPreviousData: true,
  });

  const handleSort = (thead, index) => {
    let newOrderByData;
    if (thead === "User") {
      newOrderByData = "name";
    } else {
      newOrderByData = thead.toLowerCase();
    }
    setSearchParams({
      sortBy: newOrderByData,
      orderby: order === "ASC" ? "DESC" : "ASC",
    });
    setSelectedColumn(index);
  };

  const DeleteEmployee = useMutation({
    mutationFn: (employeeId) => {
      return employeeDelete(employeeId);
    },
    onSuccess: () => {
      notifySuccess("Employee Deleted Successfully");
      if (tableData && tableData.data.length === 1) {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
      }
      queryClient.invalidateQueries("EmployeeData");
    },
    onError: (error) => {
      notifyError(error.response.data.message.message.user);
    },
  });

  const [filterShow, setFilterShow] = useState(false); //State to manage the visibility of the filter component.

  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);

  const [employeeId, setEmployeeId] = useState("");

  const location = useLocation();

  /**
   * Toggles the visibility of the filter component.
   * @param {boolean} showHide - Indicates whether to show or hide the filter component.
   */
  const onFilterClick = (showHide) => {
    setFilterShow(showHide);
  };

  /**
   * Handles the click event for deleting an employee.
   * @param {Object} employee - The employee object to be deleted.
   */

  const handleDeleteClick = (employee) => {
    setDeleteConfirationShow(true);
    setEmployeeId(employee);
  };

  /**
   * Handles the click event for canceling the employee deletion.
   */
  const handleCancelClick = () => {
    setDeleteConfirationShow(false);
  };

  /**
   * Handles the click event for proceeding with the employee deletion.
   */
  const userId = getUserIdFromLocalStorage();
  const handleProceedClick = () => {
    if (userId === employeeId) {
      notifyError("You cannot delete yourself");
      return;
    }
    DeleteEmployee.mutate(employeeId);
    setDeleteConfirationShow(false);
  };

  /**
   * Handles the click event for editing an employee's information.
   * @param {Object} employeeData - The employee data to be edited.
   */
  const handleTableEdit = (employeeData) => {
    navigate("/employees/editProfile", {
      state: { employeeData: employeeData },
    });
  };
  const handleViewEmployee = (viewEmployeeData) => {
    navigate("/employees/viewEmployee", {
      state: { viewEmployeeData: viewEmployeeData },
    });
  };

  const filterSubmit = (data) => {
    setSearchParams({
      designation: data.designation,
      department: data.department,
    });
  };
  // useEffect(() => {
  let roundUp;

  if (tableData?.total_data) {
    roundUp = Math.ceil(tableData?.total_data / itemsPerPage);
  }

  return (
    <>
      {location.pathname === "/employees" ? (
        <>
          {deleteConfirationShow ? (
            <DeleteConfirmation
              deleteName="employee"
              handleCancelClick={handleCancelClick}
              handleProceedClick={handleProceedClick}
            />
          ) : (
            <></>
          )}
          {filterShow ? (
            <FilterEmployee
              handleClick={() => onFilterClick(!filterShow)}
              // filterShow={filterShow}
              designationSubmit={filterSubmit}
              setPage={setPage}
              setSearchParams={setSearchParams}
            />
          ) : (
            <></>
          )}
          <section className="content-wrapper">
            <div className="content-radius employees">
              <div className="content__header employees__top">
                <h2>Employees</h2>
                <Link to="/employees/addProfile" className="link">
                  <Button
                    text={"Add A Profile"}
                    className={" button__blue"}
                    icon={<IoMdAdd />}
                  />
                </Link>
              </div>
              <div className="employees__table">
                <div className="ams__filter">
                  <SearchInput
                    defaultValue={""}
                    setPageNumber={setPage}
                    setSearchParams={setSearchParams}
                  />
                  <Button
                    handleClick={() => onFilterClick(!filterShow)}
                    text="Filter"
                    icon={<BsFunnel />}
                    className="filter--button"
                  />
                </div>
                <EmployeeDataTable
                  handleDeleteClick={handleDeleteClick}
                  handleProceedClick={handleProceedClick}
                  handleTableEdit={handleTableEdit}
                  handleViewEmployee={handleViewEmployee}
                  tableData={tableData}
                  isPending={isPending}
                  error={error}
                  handleSort={handleSort}
                  selectedColumn={selectedColumn}
                />

                <div className="pagination">
                  {roundUp > 1 && (
                    <Pagination
                      setSearchParams={setSearchParams}
                      data={tableData?.data}
                      roundUp={roundUp}
                      setPageNumber={setPage}
                      pageNumber={page}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
          <CustomToastContainer />
        </>
      ) : (
        <div>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default Employees;
