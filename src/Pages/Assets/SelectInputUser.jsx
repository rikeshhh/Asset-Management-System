import React from "react";
import { useQuery } from "@tanstack/react-query";
import { selectUser } from "./AssetsApiSlice";
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
const SelectInputUser = ({ name, register, defaultValue, isDisabled }) => {
  const { data: userData } = useQuery({
    queryKey: ["selectUserData"],
    queryFn: selectUser,
  });
  console.log(defaultValue);
  return (
    <select
      {...register(name, { required: true })}
      disabled={isDisabled}
      style={{ color: "#999" }}
      className={`${isDisabled ? "input-disabled" : "input-enabled"}`}
    >
      {defaultValue ? null : (
        <option value="" disabled selected>
          Select the Assigned Employee
        </option>
      )}

      {defaultValue && (
        <option className="select__option" value={defaultValue.id}>
          {defaultValue.name}
        </option>
      )}
      {userData && (
        <>
          <option value={null}>None</option>
          {userData.map((user) => (
            <option className="select__option" key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </>
      )}
    </select>
  );
};
export default SelectInputUser;
