import React from "react";
import { useQuery } from "@tanstack/react-query";
import { selectInputCategory } from "./CategoryApiSice";
import { useForm } from "react-hook-form";
/**
 * React component representing a select input for categories.
 * @param {Object} props - Component props.
 * @param {Function} props.register - Function from react-hook-form for registering the input.
 * @returns {JSX.Element} JSX element representing the SelectInputCategory component.
 */

const SelectInputCategory = () => {
  const { register, handleSubmit } = useForm();

  const { data: CategoryData } = useQuery({
    queryKey: ["selectInputCategory"],
    queryFn: selectInputCategory,
  });

  const submitCategory = () => {};

  return (
    <form onSubmit={handleSubmit(submitCategory)}>
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
    </form>
  );
};

export default SelectInputCategory;
