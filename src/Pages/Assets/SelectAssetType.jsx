import React from "react";

export const SelectAssetType = ({
  register,
  name,
  defaultValue,
  isDisabled,
}) => {
  const assetType = ["hardware", "software"];
  console.log(assetType);
  return (
    <select
      {...register(name, { required: true })}
      disabled={isDisabled}
      className={`${isDisabled ? "input-disabled" : "input-enabled"}`}
    >
      {defaultValue ? null : (
        <option value="" disabled selected>
          Select the Asset type
        </option>
      )}
      {defaultValue && (
        <option className="select__option" value={defaultValue.toLowerCase()}>
          {defaultValue.toLowerCase()}
        </option>
      )}
      <option value={null}>None</option>
      {assetType.map((option, index) => (
        <>
          <option key={index} value={option}>
            {option.toLowerCase()}
          </option>
        </>
      ))}
    </select>
  );
};
