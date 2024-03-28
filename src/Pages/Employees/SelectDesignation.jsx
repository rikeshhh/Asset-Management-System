import React from "react";
import { useQuery } from "@tanstack/react-query";
import { selectUser } from "../Assets/AssetsApiSlice";

const SelectInputDesignation = ({
  isDisabled,
  name,
  register,
  defaultValue,
  isRequired,
  errors,
}) => {
  const { data: designationData } = useQuery({
    queryKey: ["userData"],
    queryFn: selectUser,
  });

  const designationFilter = [
    ...new Set(
      designationData
        ?.filter((item) => item.designation !== null) // Filter out null values
        .map((item) => item.designation.toLowerCase()) // Translate to lowercase
    ),
  ];

  return (
    <>
      <select
        {...register(name, { required: isRequired })}
        disabled={isDisabled}
        className={isDisabled ? "select__disabled" : "select__enabled"}
      >
        {defaultValue ? null : (
          <option value="" disabled selected>
            Select the Designation
          </option>
        )}
        {/* Render the default option outside of the map function */}
        {/* {defaultValue && (
          <option className="select__option" value={defaultValue.id}>
            {defaultValue.name}
          </option>
        )} */}

        {/* Map over the LocationData array and render each location option */}

        {designationFilter && (
          <>
            {designationFilter.map((option, i) => (
              <option className="select__option" key={i} value={option}>
                {option}
              </option>
            ))}
          </>
        )}
      </select>
      {errors[name] && (
        <span className="error-message">"Please select designation"</span>
      )}
    </>
  );
};
export default SelectInputDesignation;
