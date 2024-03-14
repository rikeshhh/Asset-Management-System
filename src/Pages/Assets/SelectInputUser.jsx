import React from "react";
import { useQuery } from "@tanstack/react-query";
import { selectUser } from "./AssetsApiSlice";

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
