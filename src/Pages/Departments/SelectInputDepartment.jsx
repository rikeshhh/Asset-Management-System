import React, { useState } from "react";
import { selectInputDepartment } from "../../Api/Department/DepartmentApiSlice";
import { useQuery } from "@tanstack/react-query";
// import { onChange } from "react-toastify/dist/core/store";
/**
 * SelectInputDepartment component responsible for rendering a dropdown select input for departments.
 * @returns {JSX.Element} JSX element representing the SelectInputDepartment component.
 */
const SelectInputDepartment = ({
  register,
  isDisabled,
  defaultValue,
  name,
  isRequired,
  errors,
}) => {
  const { data: DepartmentData } = useQuery({
    queryKey: ["selectInputDepartmentData"],
    queryFn: selectInputDepartment,
  });

  return (
    <>
      <select
        {...register(name, { required: isRequired })}
        disabled={isDisabled}
        className={`${isDisabled ? "input-disabled" : "input-enabled"} ${
          errors[name] ? "error__validation__outline" : ""
        }`}
        defaultValue={(defaultValue && defaultValue.id) || defaultValue}
      >
        {!defaultValue && (
          <option value="" selected disabled>
            None
          </option>
        )}

        {DepartmentData && (
          <>
            {DepartmentData.map((option) => (
              <option
                className="select__option"
                key={option.id}
                value={option.id}
              >
                {option.department}
              </option>
            ))}
          </>
        )}
      </select>
      {errors[name] && (
        <span className="error-message">Please select department</span>
      )}
    </>
  );
};

export default SelectInputDepartment;
