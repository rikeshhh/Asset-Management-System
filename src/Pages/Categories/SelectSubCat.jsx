import React from "react";
import { useQuery } from "@tanstack/react-query";
import { selectSubCategoryData } from "./CategoryApiSice";
import "../Assets/Assets.css";
const SelectSubCat = ({
  name,
  register,
  categoryName,
  defaultValue,
  isDisabled,
}) => {
  const {
    data: subCategoryData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["selectSubCategory", categoryName],
    queryFn: () => selectSubCategoryData(categoryName),
  });
  console.log("ugugyug", categoryName);
  // Checking if any child array is empty
  const isEmptyChildArray =
    subCategoryData &&
    subCategoryData.some((category) => category.child.length === 0);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  return (
    <select
      {...register(name)}
      disabled={isDisabled}
      className={`${isDisabled ? "select__disabled" : "select__enabled"}`} // Disable if either isDisabled or isEmptyChildArray is true
      defaultValue={(defaultValue && defaultValue.id) || defaultValue}
    >
      {!defaultValue && (
        <option value="" disabled selected>
          Select the category of the asset
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
