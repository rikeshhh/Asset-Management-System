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
      {defaultValue ? null : (
        <option value="" disabled selected>
          Select the category of the asset
        </option>
      )}
      {/* Render the default option only once outside of the map function */}
      {defaultValue && (
        <option
          className="select__option"
          value={defaultValue.id}
          disabled={isDisabled}
        >
          {defaultValue.name}
        </option>
      )}

      {/* Map over the subCategoryData array and render each subcategory option */}
      {subCategoryData && (
        <>
          <option value={null}>None</option>
          {subCategoryData.map((category) =>
            category.child.map((child) => (
              <option
                className="select__option"
                key={child.id}
                value={child.id}
              >
                {child.category_name}
              </option>
            ))
          )}
        </>
      )}
    </select>
  );
};

export default SelectSubCat;
