import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../../Component/Input/InputField";
import "./Employee.css";
import Model from "../../Component/Model/Model";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import Button from "../../Component/Button/Button";
import { IoMdAdd } from "react-icons/io";
import { BsFunnel } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Filter from "../../Component/Filter/Filter";
import EmployeeDataTable from "./EmployeeDataTable";
import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";
import { employeeDelete } from "./EmployeeApiSlice";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../Component/Query/Query";
import { notifyError, notifySuccess } from "../../Component/Toast/Toast";
import CustomToastContainer from "../../Component/Toast/ToastContainer";
import { SearchInput } from "../../Component/SearchInput/SearchInput";
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

  const DeleteEmployee = useMutation({
    mutationFn: (employeeId) => {
      return employeeDelete(employeeId);
    },
    onSuccess: () => {
      notifySuccess("Employee Deleted Successfully");
      queryClient.invalidateQueries("EmployeeData");
    },
    onError: (error) => {
      notifyError(error.message);
      if (error.response.status === 401) {
        notifyError("Unauthorized: Please log in with valid id.");
      }
    },
  });

  const [filterShow, setFilterShow] = useState(false); //State to manage the visibility of the filter component.

  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);
  const [employeeId, setEmployeeId] = useState("");

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
    navigate("/editProfile", {
      state: { employeeData: employeeData },
    });
  };

  return (
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
        <Filter handleClick={() => onFilterClick(!filterShow)} />
      ) : (
        <></>
      )}
      <section className="content-wrapper">
        <div className="content-radius employees">
          <div className="content__header employees__top">
            <h2>Employees</h2>
            <Link to="/addProfile" className="link">
              <Button
                text={"Add A Profile"}
                className={" button__blue"}
                icon={<IoMdAdd />}
              />
            </Link>
          </div>
          <div className="employees__table">
            <div className="ams__filter">
              <SearchInput/>
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
            />
          </div>
        </div>
      </section>
      <CustomToastContainer />
    </>
  );
};

export default Employees;
