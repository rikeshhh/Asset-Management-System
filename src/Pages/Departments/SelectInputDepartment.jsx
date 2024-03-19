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
  // onChange
}) => {
  const { data: DepartmentData } = useQuery({
    queryKey: ["selectInputDepartmentData"],
    queryFn: selectInputDepartment,
  });

  return (
    <select
      {...register(name)}
      disabled={isDisabled}
      className={`${isDisabled ? "input-disabled" : "input-enabled"}`}
      required={isRequired}
    >
      {defaultValue ? null : (
        <option value="" disabled selected>
          Select the Department
        </option>
      )}

      {defaultValue && (
        <option className="select__option" value={defaultValue.id}>
          {defaultValue.name}
        </option>
      )}

      {DepartmentData &&
        DepartmentData.map((option) => (
          <option className="select__option" key={option.id} value={option.id}>
            {option.department}
          </option>
        ))}
    </select>
  );
};

export default SelectInputDepartment;
