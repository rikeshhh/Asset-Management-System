import { useMutation } from "@tanstack/react-query";
import { InputField } from "../../Component/Input/InputField";
import { LuArrowDownUp } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { useState } from "react";
import Button from "../../Component/Button/Button";
import { queryClient } from "../../Component/Query/Query";
import { updateDepartmentData } from "./DepartmentApiSlice";
import { FaCheck } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import Model from "../../Component/Model/Model";
import "./Departments.css";
import { RxCross1 } from "react-icons/rx";
import "react-toastify/dist/ReactToastify.css";
import { notifySuccess, notifyError } from "../../Component/Toast/Toast";
import SmallTablePendingHead from "../../Component/PendingTableSmall/SmallTablePendingHead";
import SmallTablePendingBody from "../../Component/PendingTableSmall/SmallTablePendingBody";
/**
 * Functional component representing the data table for departments.
 * @component
 * @param {Object} props - Component props.
 * @param {Array} props.DepartmentData - Array of department data.
 * @param {boolean} props.isPending - Indicates whether data is still being fetched.
 * @param {Function} props.handleDeleteClick - Function to handle the deletion of a department.
 * @returns {JSX.Element} JSX element representing the DepartmentDataTable component.
 */

const DepartmentDataTable = ({
  DepartmentData,
  isPending,
  handleDeleteClick,
}) => {
  const successMessage = "Department has been updated successfully";

  /**
   * React Query hook for handling department update mutation.
   */

  const EditDepartment = useMutation({
    mutationFn: (editData) => {
      return updateDepartmentData(editData.data, editData.editedDepartment);
    },
    onSuccess: () => {
      notifySuccess(successMessage);
      queryClient.invalidateQueries("DepartmentData");
      setShow(false);
      reset();

    },
    onError: (error) => {
      notifyError(error.message);

      if (error.response.status === 401) {
        notifyError("Unauthorized: Please log in with valid id.");
      }
    },
  });
  const [show, setShow] = useState(false);

  /**
   * Handles the update of department data.
   * @param {Object} data - The department data.
   */

  const onUpdateData = (data) => {
    const editData = {
      data: data.department,
      editedDepartment: previousDepartment,
    };

    EditDepartment.mutate(editData);
    setShow(false);
  };
  const [previousDepartment, setPreviousDepartment] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  /**
   * Handles the click event for the edit button.
   * @param {Object} option - The department option to be edited.
   */
  const handleEditButtonClick = (option) => {
    setPreviousDepartment(option.department);
    setDepartmentId(option.id);
    setShow(true);
  };

  /**
   * React Hook Form instance for managing form state.
   */
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: { location: previousDepartment },
  });
  const onMiniDelete = () => {
    setShow(false);
    reset();
  };

 
  /**
   * Handles the click event for deleting a department.
   * @param {string} departmentName - The name of the department to be deleted.
   */
  const handleDeleteDepartment = (departmentName) => {
    handleDeleteClick(departmentName);
  };
  return (
    <>
      <section className="cateogries table__container">
        <table>
          <thead>
            {isPending ? (
              <SmallTablePendingHead />
            ) : (
              <tr>
                <th>
                  SN <LuArrowDownUp />
                </th>
                <th>
                  Category <LuArrowDownUp />
                </th>
                <th>Action</th>
              </tr>
            )}
          </thead>
          <tbody>
            {isPending ? (
              <SmallTablePendingBody />
            ) : (
              DepartmentData.map((options, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {departmentId === options.id && show ? (
                    <td className={show ? "universal__td--border" : ""}>
                      <form
                        onSubmit={handleSubmit(onUpdateData)}
                        className="universal__update--form"
                      >
                        <div className="universal__input--container">
                          <InputField
                            name="department"
                            inputValue={options.department}
                            defaultValue={options.department}
                            register={register}
                            errors={errors}
                            type={Model.department.type}
                            value={Model.department.pattern.value}
                            message={Model.department.pattern.message}
                            minLength={Model.department.minLength.value}
                            minMessage={Model.department.minLength.message}
                            maxLength={Model.department.maxLength.value}
                            maxMessage={Model.department.maxLength.message}
                            autoComplete={"off"}
                            className={show ? "universal__table--input" : ""}
                          />
                        </div>
                        <div className="universal__FormButton">
                          <Button
                            className=""
                            text={<FaCheck />}
                          />
                          <Button
                            type="button"
                            className=""
                            text={<RxCross1 />}
                            handleClick={onMiniDelete}
                          />
                        </div>
                      </form>
                    </td>
                  ) : (
                    <td>{options.department}</td>
                  )}

                  <td className="button-gap">
                    <Button
                      className="edit__button"
                      text={<CiEdit />}
                      handleClick={() => handleEditButtonClick(options)}
                    />
                    <Button
                      className="delete__button"
                      text={<GoTrash />}
                      handleClick={() =>
                        handleDeleteDepartment(options.department)
                      }
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default DepartmentDataTable;
