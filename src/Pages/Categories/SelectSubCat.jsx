import React from "react";
import { useQuery } from "@tanstack/react-query";
import { selectSubCategoryData } from "./CategoryApiSice";

const SelectSubCat = ({
  name,
  register,
  categoryName,
  defaultValue,
  isDisabled,
}) => {
  const { data: subCategoryData } = useQuery({
    queryKey: ["selectSubCategory"],
    queryFn: () => selectSubCategoryData(categoryName),
  });
  return (
    <select
      {...register(name, { required: true })}
      disabled={isDisabled}
      className={`${isDisabled ? "input-disabled" : "input-enabled"}`}
    >
      {/* Render the default option only once outside of the map function */}
      {defaultValue && (
        <option
          className="select__option"
          value={"None" || defaultValue.id}
          disabled={isDisabled}
        >
          {"None" || defaultValue.name}
        </option>
      )}

      {/* Map over the subCategoryData array and render each subcategory option */}
      {subCategoryData &&
        subCategoryData.map((category) =>
          category.child.map((child) => (
            <option className="select__option" key={child.id} value={child.id}>
              {child.category_name}
            </option>
          ))
        )}
    </select>
  );
};

export default SelectSubCat;
