import React from "react";
import "./Assets.css";
/**
 * SelectAssetType component for selecting asset types.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.register - Function from react-hook-form to register the select input
 * @param {string} props.name - Name of the select input
 * @param {string} props.defaultValue - Default value for the select input
 * @param {boolean} props.isDisabled - Boolean indicating whether the select input is disabled or not
 * @returns {JSX.Element} JSX representation of the SelectAssetType component
 */
export const SelectAssetType = ({
  register,
  name,
  errors,
  defaultValue,
  isDisabled,
}) => {
  const hasError = errors[name];

  const assetType = ["Hardware", "Software"];
  return (
    <>
      <select
        {...register(name, { required: true })}
        disabled={isDisabled}
        className={`${isDisabled ? "select__disabled" : "select__enabled"} ${
          hasError ? "input__error" : ""
        }`}
        defaultValue={defaultValue ? defaultValue : ""}
      >
        {!defaultValue && (
          <option value="" disabled selected>
            Select the asset type
          </option>
        )}
      
        {assetType.map((option, index) => (
          <>
            <option key={index} value={option}>
              {option}
            </option>
          </>
        ))}
      </select>
      {errors[name] && (
        <span className="error-message">Please choose an asset type</span>
      )}
    </>
  );
};
