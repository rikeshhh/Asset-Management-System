import React from "react";
import { useQuery } from "@tanstack/react-query";
import { selectInputCategory } from "../Categories/CategoryApiSice";
import "./Assets.css";
const SelectAssetCategory = ({
  name,
  register,
  setCategoryName,
  defaultValue,
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
    console.log(selectedCategory.id)
  };
  return (
    <select
      {...register(name, { required: true })}
      disabled={isDisabled || !isEditable}
      onChange={addCategoryId}
      className={`${isDisabled ? "input-disabled" : "input-enabled"}`}
    >
      {defaultValue ? (
        <>
          <option
            className="select__option"
            value={defaultValue.id}
            style={{ color: "#999" }}
          >
            {defaultValue.name}
          </option>
        </>
      ) : (
        <option
          value="None"
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
  );
};

export default SelectAssetCategory;
