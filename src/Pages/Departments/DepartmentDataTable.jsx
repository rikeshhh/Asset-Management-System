import "../../Component/DataTable/DataTable.css";
import { useMutation } from "@tanstack/react-query";
import { InputField } from "../../Component/Input/InputField";
import { LuArrowDownUp, LuArrowUpDown } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { useState } from "react";
import Button from "../../Component/Button/Button";
import { queryClient } from "../../Component/Query/Query";
import { FaCheck } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import Model from "../../Component/Model/Model";
import "./Departments.css";
import { RxCross1 } from "react-icons/rx";
import "react-toastify/dist/ReactToastify.css";
import { notifySuccess, notifyError } from "../../Component/Toast/Toast";
import SmallTablePendingHead from "../../Component/PendingTableSmall/SmallTablePendingHead";
import SmallTablePendingBody from "../../Component/PendingTableSmall/SmallTablePendingBody";

import {
  sortByStatusDepartment,
  updateDepartmentData,
} from "../../Api/Department/DepartmentApiSlice";
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
  disabledButton,
  setDisabledButton,
  departmentTableData,
  departmentTableDataOrder,
  setDepartmentTableDataOrder,
  setDepartmentTableData,
}) => {
  const successMessage = "Department has been updated successfully";

  /**
   * React Query hook for handling department update mutation.
   */

  const EditDepartment = useMutation({
    mutationFn: (editData) => {
      return updateDepartmentData(editData.data, editData.id);
    },
    onSuccess: () => {
      notifySuccess(successMessage);
      queryClient.invalidateQueries("DepartmentData");
      setDisabledButton(false);
      setShow(false);
      reset();
    },
    onError: (error) => {
      notifyError(error.response.data.message.message.newDepartment);
    },
  });
  const [show, setShow] = useState(false);

  /**
   * Handles the update of department data.
   * @param {Object} data - The department data.
   */

  const onUpdateData = (data) => {
    if (previousDepartment === data.department) {
      setShow(false);
      setDisabledButton(false);
    } else {
      const editData = {
        data: data.department,
        id: departmentId,
      };
      EditDepartment.mutate(editData);
    }
  };
  const [previousDepartment, setPreviousDepartment] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  /**
   * Handles the click event for the edit button.
   * @param {Object} option - The department option to be edited.
   */
  const handleEditButtonClick = (option) => {
    setDisabledButton(true);
    setPreviousDepartment(option.department);
    setDepartmentId(option.id);
    setShow(true);
    reset();
  };

  /**
   * React Hook Form instance for managing form state.
   */
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onMiniDelete = () => {
    setDisabledButton(false);
    setShow(false);
    reset();
  };

  /**
   * Handles the click event for deleting a department.
   * @param {string} departmentName - The name of the department to be deleted.
   */
  const handleDeleteDepartment = (departmentId) => {
    handleDeleteClick(departmentId);
  };

  const handleStatusClick = async () => {
    const newOrder = departmentTableDataOrder === "ASC" ? "DESC" : "ASC";
    setDepartmentTableData("department");
    setDepartmentTableDataOrder(newOrder);
  };

  return (
    <>
      <section className="cateogries department table__container">
        <table>
          <thead>
            {isPending ? (
              <SmallTablePendingHead />
            ) : (
              <tr>
                <th>S.N.</th>
                <th
                  className={
                    departmentTableData === "department"
                      ? "selected-tablehead"
                      : ""
                  }
                >
                  Department{" "}
                  <span className="sort__icon">
                    <LuArrowUpDown onClick={handleStatusClick} />
                  </span>
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
                    <td
                      className={
                        show && !errors.department
                          ? "universal__td--border"
                          : "universal__td--border error__validation__outline"
                      }
                    >
                      <form
                        onSubmit={handleSubmit(onUpdateData)}
                        className="universal__update--form"
                      >
                        <div className="universal__input--container">
                          <InputField
                            name="department"
                            defaultValue={options.department}
                            register={register}
                            errors={errors}
                            type={Model.department.type}
                            value={Model.department.pattern.value}
                            message={Model.department.pattern.message}
                            placeholder={options.department}
                            minLength={Model.department.minLength.value}
                            minMessage={Model.department.minLength.message}
                            maxLength={Model.department.maxLength.value}
                            required={"Please enter a department name"}
                            maxMessage={Model.department.maxLength.message}
                            // autoComplete={"off"}
                            className={
                              show ? "universal__table--input || universal" : ""
                            }
                          ></InputField>
                        </div>
                        <div className="universal__FormButton">
                          <Button className="" text={<FaCheck />} />
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
                    <td
                      className={
                        options.department.length > 20
                          ? "hoverEffect  universal-input__container--editable-padding"
                          : ""
                      }
                      data-name={`${options.department}`}
                    >
                      {options.department.length > 20
                        ? `${options.department.substring(0, 20)}...`
                        : options.department}
                    </td>
                  )}
                  <td className="button-gap">
                    <Button
                      className={
                        disabledButton
                          ? "small-button__disabled"
                          : "edit__button"
                      }
                      text={<CiEdit />}
                      isDisabled={disabledButton ? true : false}
                      handleClick={() => handleEditButtonClick(options)}
                    />
                    <Button
                      className={
                        disabledButton
                          ? "small-button__disabled"
                          : "delete__button"
                      }
                      text={<GoTrash />}
                      isDisabled={disabledButton ? true : false}
                      handleClick={() => handleDeleteDepartment(options.id)}
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
