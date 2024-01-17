import React from "react";
import "./input.css";
export const SelectInput = ({ onSelectChange, isDisabled, options }) => {
  return (
    <select
      id="cars"
      name="cars"
      disabled={isDisabled}
      className={isDisabled ? "select__disabled" : "select__enabled"}
      onChange={onSelectChange}
      required
    >
      <option value="" disabled selected>
        Select an option
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
