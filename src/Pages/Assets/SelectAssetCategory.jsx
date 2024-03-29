import React from "react";
import { useQuery } from "@tanstack/react-query";
import { selectInputCategory } from "../Categories/CategoryApiSice";
import "./Assets.css";
const SelectAssetCategory = ({
  name,
  register,
  setCategoryName,
  defaultValue,
  errors,
  isDisabled,
  isEditable = true,
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
    setCategoryName(selectedCategory.id);
  };
  const hasError = errors[name];

  return (
    <>
      <select
        {...register(name, { required: true })}
        onInput={addCategoryId}
        disabled={isDisabled || !isEditable}
        className={`${isDisabled ? "select__disabled" : "select__enabled"} ${
          hasError ? "input__error" : ""
        }`}
        defaultValue={defaultValue ? defaultValue.parent : ""}
      >
        {!defaultValue && (
          <option
            value=""
            disabled
            selected
            className="option__disabled"
            style={{ color: "#999" }}
          >
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
        <span className="error-message">Please select an category</span>
      )}
    </>
  );
};

export default SelectAssetCategory;
