import React from "react";
import { useQuery } from "@tanstack/react-query";
import { selectInputCategory } from "../../Pages/Categories/CategoryApiSice";
/**
 * React component representing a select input for categories.
 * @param {Object} props - Component props.
 * @param {Function} props.register - Function from react-hook-form for registering the input.
 * @returns {JSX.Element} JSX element representing the SelectInputCategory component.
 */

const SelectFilter = ({
  name,
  register,
  setCategoryName,
  defaultValue,
  isDisabled,
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
    <select
      {...register(name, { required: true })}
      disabled={isDisabled}
      className={`${isDisabled ? "input-disabled" : "input-enabled"}`}
    >
      <option className="select__option" value="None">
        None
      </option>
      {/* Map over the CategoryData array and render each category option */}
      {CategoryData &&
        CategoryData.map((option) => (
          <option
            className="select__option"
            key={option.id}
            value={option.parent}
          >
            {option.parent}
          </option>
        ))}
    </select>
  );
};

export default SelectFilter;
