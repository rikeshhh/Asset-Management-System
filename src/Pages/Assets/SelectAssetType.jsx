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
  const assetType = ["hardware", "software"];
  return (
    <>
      <select
        {...register(name, { required: true })}
        disabled={isDisabled}
        className={isDisabled ? "select__disabled" : "select__enabled"}
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
        {assetType.map((option, index) => (
          <>
            <option key={index} value={option}>
              {option.toLowerCase()}
            </option>
          </>
        ))}
      </select>
      {errors[name] && (
        <span className="error-message">"Please choose an asset type"</span>
      )}
    </>
  );
};
