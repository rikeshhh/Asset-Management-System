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
  const [sortOrder, setSortOrder] = useState("ASC");
  const [orderByData, setOrderByData] = useState("id");
  const [searchData, setSearchData] = useState("");
  const [designationData, setDesignationData] = useState("");
  const [departmentData, setDepartmentData] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 7;

  const params = new URLSearchParams(searchParams);
  const searchUser = params.get("Search") || "";

  const {
    isPending,
    error,
    data: tableData,
  } = useQuery({
    queryKey: [
      "EmployeeData",
      // "searchedData",
      searchUser,
      sortOrder,
      orderByData,
      designationData,
      departmentData,
      page,
    ],
    queryFn: () =>
      getEmployeeTableData(
        searchUser,
        sortOrder,
        orderByData,
        designationData,
        departmentData,
        page
      ),
    staleTime: 10000,
    keepPreviousData: true,
  });

  const handlePrevClick = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSort = (thead) => {
    setSortOrder((sortOrder) => (sortOrder === "ASC" ? "DESC" : "ASC"));

    if (thead === "User") {
      setOrderByData("name");
    } else if (thead === "Phone") {
      setOrderByData("phone_number");
    } else {
      setOrderByData(thead.toLowerCase());
    }
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
      notifyError(error.message);
    },
  });

  const [filterShow, setFilterShow] = useState(false); //State to manage the visibility of the filter component.

  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);

  const [employeeId, setEmployeeId] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
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
  const handleProceedClick = () => {
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
  // const submitSearch = (data) => {
  //   setSearchData(data.Search);
  // };

  const designationSubmit = (data) => {
    setDesignationData(data.designation);
    setDepartmentData(data.department);
  };
  // useEffect(() => {
  let totalItems;
  if (tableData && typeof tableData.total_data === "string") {
    const totalEntries = parseInt(tableData.total_data, 10);
    if (!isNaN(totalEntries)) {
      totalItems = Math.ceil(totalEntries / itemsPerPage);
    }
  }
  // }, [tableData, itemsPerPage]);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

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
              designationSubmit={designationSubmit}
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
                    setPageNumber={setPageNumber}
                    setSearchParams={setSearchParams}
                    defaultValue={""}
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
                  // searchedData={searchEmployeeData}
                  tableData={tableData}
                  isPending={isPending}
                  error={error}
                  handleSort={handleSort}
                />
                {isPending ? (
                  <PendingPagination />
                ) : (
                  <div className="pagination">
                    <Button
                      className="inactivePage"
                      icon={<FaAngleLeft />}
                      handleClick={handlePrevClick}
                      isDisabled={page === 1 ? true : false}
                    />
                    {tableData &&
                      [...Array(totalItems)].map((_, index) => (
                        <Button
                          key={index}
                          className={
                            page === index + 1 ? "activePage" : "inactivePage"
                          }
                          text={index + 1}
                          handleClick={() => handlePageClick(index + 1)}
                          isDisabled={index + 1 === page ? true : false}
                        />
                      ))}
                    <Button
                      className="inactivePage"
                      icon={<FaAngleRight />}
                      handleClick={handleNextClick}
                      isDisabled={page === totalItems ? true : false}
                    />
                  </div>
                )}
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
