import React from "react";
import { useQuery } from "@tanstack/react-query";
import { selectInputCategory } from "./CategoryApiSice";
/**
 * React component representing a select input for categories.
 * @param {Object} props - Component props.
 * @param {Function} props.register - Function from react-hook-form for registering the input.
 * @returns {JSX.Element} JSX element representing the SelectInputCategory component.
 */

const SelectInputCategory = ({ register }) => {
  const { data: CategoryData } = useQuery({
    queryKey: ["selectInputCategory"],
    queryFn: selectInputCategory,
  });

  return (
    <select {...register("parent", { required: true })}>
      <option className="select__option" value={null}>
        None
      </option>
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

export default SelectInputCategory;
