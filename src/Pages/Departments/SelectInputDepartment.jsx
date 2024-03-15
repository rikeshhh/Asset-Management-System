import React, { useState } from "react";
import { selectInputDepartment } from "../../Api/Department/DepartmentApiSlice";
import { useQuery } from "@tanstack/react-query";
/**
 * SelectInputDepartment component responsible for rendering a dropdown select input for departments.
 * @returns {JSX.Element} JSX element representing the SelectInputDepartment component.
 */
const SelectInputDepartment = ({ register, isDisabled, onTouched }) => {
  const { data: DepartmentData } = useQuery({
    queryKey: ["selectInputDepartmentData"],
    queryFn: selectInputDepartment,
  });
 

  return (
    <select
      {...register("departmentId", { required: true })}
      disabled={isDisabled}
    >
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
