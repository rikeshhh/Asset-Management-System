import React from "react";
import "./input.css";
export const SelectInput = ({ onSelectChange, isDisabled }) => {
  return (
    <select
      id="cars"
      name="cars"
      disabled={isDisabled}
      className={isDisabled ? "select__disabled" : "select__enabled"}
      onChange={onSelectChange}
    >
      <option value="Computer">Computer</option>
      <option value="Routers">Routerss</option>
      <option value="Acesssories">Acesssories</option>
      <option value="Backups">Backups</option>
    </select>
  );
};
