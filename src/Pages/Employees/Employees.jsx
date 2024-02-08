import { useForm } from "react-hook-form";
import { InputField } from "../../Component/Input/InputField";
import Table from "../../Component/Table/Table";
import "./Employee.css";
import Model from "../../Component/Model/Model";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import Button from "../../Component/Button/Button";
import { IoMdAdd } from "react-icons/io";
import { BsFunnel } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Filter from "../../Component/Filter/Filter";
import { useState } from "react";
import EmployeeDataTable from "./EmployeeDataTable";
import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";
import { employeeDelete } from "./EmployeeApiSlice";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../Component/Query/Query";

const Employees = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const DeleteEmployee = useMutation({
    mutationFn: (employeeId) => {
      return employeeDelete(employeeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("EmployeeData");
    },
    onError: (error) => {
      if (error.response.status === 401) {
        console.log("Unauthorized: Please log in with valid id.");
      }
    },
  });

  const [filterShow, setFilterShow] = useState(false);
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);
  const [employeeId, setEmployeeId] = useState("");

  const onFilterClick = (showHide) => {
    setFilterShow(showHide);
  };

  const handleDeleteClick = (employee) => {
    setDeleteConfirationShow(true);
    setEmployeeId(employee);
  };

  const handleCancelClick = () => {
    setDeleteConfirationShow(false);
  };

  const handleProceedClick = () => {
    DeleteEmployee.mutate(employeeId);
    setDeleteConfirationShow(false);
  };

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
              <InputField
                name="Search"
                register={register}
                errors={errors}
                placeholder={"Search"}
                type={Model.Group.type}
                value={Model.Group.pattern.value}
                message={Model.Group.pattern.message}
                icon={<HiMiniMagnifyingGlass />}
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
            />
          </div>
        </div>
      </section>
      {filterShow && <Filter handleClick={() => onFilterClick(!filterShow)} />}
    </>
  );
};

export default Employees;
