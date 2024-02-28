import "./Departments.css";
import { useForm } from "react-hook-form";
import { InputField } from "../../Component/Input/InputField";
import { Label } from "../../Component/Label/Label";
import Button from "../../Component/Button/Button";
import Model from "../../Component/Model/Model";
import { IoMdAdd, IoMdOptions } from "react-icons/io";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  departmentAdd,
  departmentDelete,
  getDepartmentData,
} from "../../Api/Department/DepartmentApiSlice";
import { queryClient } from "../../Component/Query/Query";
import DepartmentDataTable from "./DepartmentDataTable";
import {
  notifyDelete,
  notifyError,
  notifySuccess,
} from "../../Component/Toast/Toast";
import { useState } from "react";
import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";
import ToastContainer from "../../Component/Toast/ToastContainer";
import CustomToastContainer from "../../Component/Toast/ToastContainer";
/**
 * Department component responsible for rendering department UI .
 * @returns {JSX.Element} JSX element representing the Department component.
 */
const Departments = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      department: "",
    },
  });
  const addDepartment = useMutation({
    //Function that performs the mutation, adding a new department.
    mutationFn: (formData) => {
      return departmentAdd(formData.department);
    },
    //func:Callback function invoked on successful completion of the mutation.
    onSuccess: () => {
      notifySuccess(successMessage);
      queryClient.invalidateQueries("DepartmentData");
      reset();
    },
    //func:Callback function invoked if an error occurs during the mutation.
    onError: (error) => {
      notifyError(error.response.data.message);
    },
  });
  const successMessage = "Department has been added successfully";
  const onSubmit = (data) => {
    addDepartment.mutate(data);
  };

  const {
    isPending,
    error,
    data: DepartmentData,
  } = useQuery({
    queryKey: ["DepartmentData"],
    queryFn: getDepartmentData,
  });

  const deleteMessage = "Department has been deleted successfully";

  const DeleteDepartment = useMutation({
    mutationFn: (department) => {
      return departmentDelete(department);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("DepartmentData");
      notifySuccess(deleteMessage);
    },
    onError: (error) => {
      if (error.response.status === 401) {
        notifyError("Unauthorized: Please log in with valid id.");
      }
    },
  });
  const [departmentName, setDepartmentName] = useState();
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);

  const handleCancelClick = () => {
    setDeleteConfirationShow(false);
  };

  const handleProceedClick = () => {
    DeleteDepartment.mutate(departmentName);
    setDeleteConfirationShow(false);
  };
  const handleDeleteClick = (department) => {
    setDeleteConfirationShow(true);
    setDepartmentName(department);
  };

  // if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {deleteConfirationShow ? (
        <DeleteConfirmation
          deleteName="department"
          handleCancelClick={handleCancelClick}
          handleProceedClick={handleProceedClick}
        />
      ) : (
        <></>
      )}

      <section className="content-wrapper">
        <div className="content-radius category">
          <div className="content__header">
            <h2>Department</h2>
          </div>
          <div className="category__content">
            <DepartmentDataTable
              DepartmentData={DepartmentData}
              isPending={isPending}
              handleDeleteClick={handleDeleteClick}
              handleProceedClick={handleProceedClick}
            />

            <div className="add__category">
              <div className="add__category--title">
                <p>Add a Department</p>
                <span>
                  Enter the department to list in the employees section.
                </span>
              </div>
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                {/* Department Name input field */}

                <div>
                  <Label sup={"*"} text="Department Name" />
                  <InputField
                    name="department"
                    register={register}
                    required={Model.department.required}
                    errors={errors}
                    type={Model.department.type}
                    value={Model.department.pattern.value}
                    message={Model.department.pattern.message}
                    placeholder="Enter the department name"
                    minLength={Model.department.minLength.value}
                    minMessage={Model.department.minLength.message}
                    maxLength={Model.department.maxLength.value}
                    maxMessage={Model.department.maxLength.message}
                  />
                </div>
                {/* Add Department button */}
                <div className="">
                  <Button
                    text="Add Department"
                    type="submit"
                    className={"category--button button__blue"}
                    icon={<IoMdAdd />}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Custom Toast Container */}
        <CustomToastContainer />
      </section>
    </>
  );
};
export default Departments;
