import React from 'react';
import { getDepartmentData, selectInputDepartment } from './DepartmentApiSlice';
import { useQuery } from '@tanstack/react-query';

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
      {DepartmentData && DepartmentData.map((option) => (
        <option className="select__option" key={option.id} value={option.department}>
          {option.department}
        </option>
      ))}
    </select>
  );
};

export default SelectInputDepartment;
