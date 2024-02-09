import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { selectInputCategory } from "./CategoryApiSice";

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
