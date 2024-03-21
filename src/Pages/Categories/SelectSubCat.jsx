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
  console.log(subCategoryData);

  // Checking if any child array is empty
  const isEmptyChildArray =
    subCategoryData &&
    subCategoryData.some((category) => category.child.length === 0);

  return (
    <select
      {...register(name)}
      disabled={isDisabled} // Keep original isDisabled prop
      style={{ color: "#999" }}
      className={`${
        isDisabled || isEmptyChildArray ? "input-disabled" : "input-enabled"
      }`} // Disable if either isDisabled or isEmptyChildArray is true
    >
      {defaultValue ? null : (
        <option value="" disabled selected>
          Select the category of the asset
        </option>
      )}
      {/* Render the default option only once outside of the map function */}
      {defaultValue && (
        <option className="select__option" value={defaultValue.id}>
          {defaultValue.name}
        </option>
      )}

      {/* Map over the subCategoryData array and render each subcategory option */}
      {subCategoryData && subCategoryData.length > 0 && (
        <>
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
