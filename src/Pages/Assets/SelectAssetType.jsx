import React from "react";

export const SelectAssetType = ({ register, name, defaultValue }) => {
  const assetType = ["hardware", "software"];
  console.log(assetType);
  return (
    <select {...register(name, { required: true })}>
      {assetType.map((option, index) => (
        <option key={index} value={defaultValue}>
          {option.toLowerCase()}
        </option>
      ))}
    </select>
  );
};
