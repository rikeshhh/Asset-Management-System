import React from "react";
import { useQuery } from "@tanstack/react-query";
import { selectUser } from "../Assets/AssetsApiSlice";
import { ErrorMessage } from "@hookform/error-message";
/**
 * SelectInputUser component for selecting an assigned user.
 *
 * @param {Object} props - Component props
 * @param {string} props.name - The name of the select input field
 * @param {Function} props.register - The function to register the input field with React Hook Form
 * @param {Object} props.defaultValue - The default value of the select input field
 * @param {boolean} props.isDisabled - Boolean indicating if the select input field is disabled
 * @returns {JSX.Element} JSX representation of the SelectInputUser component
 */
const SelectUserRepair = ({ name, register, defaultValue, errors }) => {
  const { data: userData } = useQuery({
    queryKey: ["selectFilterUserData"],
    queryFn: selectUser,
  });

  const errorMessage = "Please select device owner";
  return (
    <>
      <select
        {...register(name, { required: true })}
        defaultValue={defaultValue ? defaultValue.name : ""}
      >
        {!defaultValue && (
          <option value="" disabled selected>
            Select the device owner
          </option>
        )}
        {/* {defaultValue && (
        <option className="select__option" value={defaultValue.name}>
        {defaultValue.name}
        </option>
    )} */}
        {Array.isArray(userData) &&
          userData.map((user) => (
            <option className="select__option" key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
      </select>
      {errors[name] && (
        <p className="error-message">Please select device owner</p>
      )}
    </>
  );
};
export default SelectUserRepair;
