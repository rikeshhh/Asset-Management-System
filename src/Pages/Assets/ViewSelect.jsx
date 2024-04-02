import React from "react";

const ViewSelect = ({ defaultValue, isDisabled }) => {
  return (
    <select
      disabled={isDisabled}
      className={`${isDisabled ? "select__disabled" : "select__enabled"}`} // Disable if either isDisabled or isEmptyChildArray is true
    >
      {defaultValue && (
        <option value="" disabled selected>
          {defaultValue}
        </option>
      )}
      {!defaultValue && (
        <option value="" disabled selected>
          No sub-category selected
        </option>
      )}
    </select>
  );
};

export default ViewSelect;
