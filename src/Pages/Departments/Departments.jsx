import "./Departments.css";
import { useForm } from "react-hook-form";
import { InputField } from "../../Component/Input/InputField";
import { Label } from "../../Component/Label/Label";
import Button from "../../Component/Button/Button";
import Model from "../../Component/Model/Model";
import { IoMdAdd } from "react-icons/io";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../Component/Query/Query";
import DepartmentDataTable from "./DepartmentDataTable";
import { notifyError, notifySuccess } from "../../Component/Toast/Toast";
import { useState } from "react";
import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";
import CustomToastContainer from "../../Component/Toast/ToastContainer";
import {
  departmentAdd,
  departmentDelete,
  getDepartmentData,
} from "./DepartmentApiSlice";
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
  const [departmentName, setDepartmentName] = useState();
  const [departmentId, setDepartmentId] = useState();
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);
  const [departmentTableData, setDepartmentTableData] = useState("id");
  const [departmentTableDataOrder, setDepartmentTableDataOrder] =
    useState("ASC");
  const [disabledButton, setDisabledButton] = useState(false);
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
      notifyError(error.response.data.message.message.department);
    },
  });
  const successMessage = "Department has been added";
  // const onSubmit = (data) => {
  //   addDepartment.mutate(data);
  // };
  const onSubmit = (data) => {
    // Check if the department name contains only spaces
    if (data.department.trim() === "  ") {
      // If the department name consists only of spaces, display an error message or handle it accordingly
      // For now, let's log an error message to the console
      notifyError("Department name cannot be empty");
      return;
    }

    // If the department name is not empty after trimming, proceed with the mutation
    addDepartment.mutate(data);
  };

  const {
    isPending,
    error,
    data: DepartmentData,
  } = useQuery({
    queryKey: ["DepartmentData",departmentTableData,departmentTableDataOrder],
    queryFn: () => getDepartmentData(departmentTableData,departmentTableDataOrder),
  });

  const deleteMessage = "Department has been deleted";

  const DeleteDepartment = useMutation({
    mutationFn: () => {
      return departmentDelete(departmentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("DepartmentData");
      notifySuccess(deleteMessage);
    },
    onError: () => {
      notifyError("Error deleting department");
    },
  });
  

  const handleCancelClick = () => {
    setDeleteConfirationShow(false);
  };

  const handleProceedClick = () => {
    DeleteDepartment.mutate();
    setDeleteConfirationShow(false);
  };
  const handleDeleteClick = (departmentId) => {
    setDeleteConfirationShow(true);
    setDepartmentId(departmentId);
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
              disabledButton={disabledButton}
              setDisabledButton={setDisabledButton}
              setDepartmentTableDataOrder={setDepartmentTableDataOrder}
              departmentTableDataOrder={departmentTableDataOrder}
              setDepartmentTableData={setDepartmentTableData}
              departmentTableData={departmentTableData}
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
                    className={
                      disabledButton
                        ? "category__button--disabled"
                        : " button__blue "
                    }
                    icon={<IoMdAdd />}
                    isDisabled={disabledButton ? true : false}
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
