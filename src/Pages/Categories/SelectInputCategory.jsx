import React from "react";
import { useQuery } from "@tanstack/react-query";
import { selectInputCategory } from "./CategoryApiSice";
/**
 * React component representing a select input for categories.
 * @param {Object} props - Component props.
 * @param {Function} props.register - Function from react-hook-form for registering the input.
 * @returns {JSX.Element} JSX element representing the SelectInputCategory component.
 */

const SelectInputCategory = ({
  name,
  register,
  setCategoryName,
  defaultValue,
  isDisabled,
  className,
  isEditable = true,
  errors,
  required = true,
}) => {
  const { data: CategoryData } = useQuery({
    queryKey: ["selectInputCategory"],
    queryFn: selectInputCategory,
  });
  const addCategoryId = (event) => {
    const selectedCategoryId = event.target.value;
    const selectedCategory = CategoryData.find(
      (category) => category.id === selectedCategoryId
    );
    setCategoryName(selectedCategory);
  };

  return (
    <>
      <select
        {...register(name, { required: required })}
        onInput={addCategoryId}
        disabled={isDisabled || !isEditable}
        className={`${isDisabled ? "input-disabled" : "input-enabled"}
      ${className}
      ${errors[name] ? "select__border" : ""}
      `}
        defaultValue={(defaultValue && defaultValue.id) || defaultValue}
      >
        {!defaultValue && (
          <option value="" disabled selected style={{ color: "#999" }}>
            Select the Category of the asset
          </option>
        )}

        {/* Render the default option only once outside of the map function */}

        {/* Map over the CategoryData array and render each category option */}
        {CategoryData && (
          <>
            {/* <option value={null}>None</option> */}
            {CategoryData.map((option) => (
              <option
                className="select__option"
                key={option.id}
                value={option.id}
              >
                {option.parent}
              </option>
            ))}
          </>
        )}
      </select>
      {errors[name] && (
        <p className="error-message">Please select a category</p>
      )}
    </>
  );
};

export default SelectInputCategory;
