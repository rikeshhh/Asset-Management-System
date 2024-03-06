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
    setCategoryName(selectedCategory.parent);
  };
  return (
    <select {...register(name, { required: true })} onChange={addCategoryId}>
      <option className="select__option" value={null || defaultValue}>
        {defaultValue || "none"}
      </option>
      {CategoryData &&
        CategoryData.map((option) => (
          <>
            <option
              className="select__option"
              key={option.id}
              value={option.id}
            >
              {option.parent}
            </option>
          </>
        ))}
    </select>
  );
};

export default SelectInputCategory;
