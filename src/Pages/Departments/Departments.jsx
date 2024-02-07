import "./Departments.css";
import { useForm } from "react-hook-form";
import { DataTable } from "../../Component/DataTable/DataTable";
import { InputField } from "../../Component/Input/InputField";
import { Label } from "../../Component/Label/Label";
import Button from "../../Component/Button/Button";
import Model from "../../Component/Model/Model";
import { IoMdAdd } from "react-icons/io";
import { useMutation, useQuery } from "@tanstack/react-query";
import { departmentAdd, getDepartmentData } from "./DepartmentApiSlice";
import { queryClient } from "../../Component/Query/Query";
import DepartmentDataTable from "./DepartmentDataTable";
import { ToastContainer } from "react-toastify";
import { notify } from "../../Component/Toast/Toast";

const Departments = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const addDepartment = useMutation({
    mutationFn: (formData) => {
      return departmentAdd(formData.department);
    },
    onSuccess: () => {
      notify(successMessage)
      queryClient.invalidateQueries("DepartmentData");

    },
    onError: (error) => {
      if (error.response.status === 401) {
        console.log("Unauthorized: Please log in with valid id.");
      }
    },
  });
  const successMessage = "Department has been added successfully"
  const onSubmit = (data) => {
    addDepartment.mutate(data);
    reset();
  };

  const {
    isPending,
    error,
    data: DepartmentData,
  } = useQuery({
    queryKey: ["DepartmentData"],
    queryFn: getDepartmentData,
  });

  // if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <section className="content-wrapper">
      <div className="content-radius category">
        <div className="content__header">
          <h2>Department</h2>
        </div>
        <div className="category__content">
          <DepartmentDataTable DepartmentData={DepartmentData} isPending={isPending} />

          <div className="add__category">
            <div className="add__category--title">
              <p>Add a Department</p>
              <span>
                Enter the department to list in the employees section.
              </span>
            </div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label sup={"*"} text="Department Name" />
                <InputField
                  name="department"
                  register={register}
                  required={Model.Group.required}
                  errors={errors}
                  type={Model.Group.type}
                  placeholder="Enter the department name"
                  minLength={Model.Group.minLength}
                  maxLength={Model.Group.maxLength}
                />
              </div>
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
};
export default Departments;
