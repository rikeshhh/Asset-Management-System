import React from "react";
import { selectInputDepartment } from "../../Api/Department/DepartmentApiSlice";
import { useQuery } from "@tanstack/react-query";
/**
 * SelectInputDepartment component responsible for rendering a dropdown select input for departments.
 * @returns {JSX.Element} JSX element representing the SelectInputDepartment component.
 */
const SelectInputDepartment = () => {
  const { data: DepartmentData } = useQuery({
    queryKey: ["selectInputDepartmentData"],
    queryFn: selectInputDepartment,
  });

  return (
    <select required>
      <option className="select__option" value="none">
        None
      </option>
      {DepartmentData &&
        DepartmentData.map((option) => (
          <option
            className="select__option"
            key={option.id}
            value={option.department}
          >
            {option.department}
          </option>
        ))}
    </select>
  );
};

export default SelectInputDepartment;
