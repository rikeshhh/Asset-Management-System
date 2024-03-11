import React from "react";
import { useQuery } from "@tanstack/react-query";
import { selectUser } from "./AssetsApiSlice";

const SelectInputUser = ({ name, register, defaultValue, isDisabled }) => {
  const { data: userData } = useQuery({
    queryKey: ["selectUserData"],
    queryFn: selectUser,
  });

  return (
    <select
      {...register(name, { required: true })}
      disabled={isDisabled}
      className={`${isDisabled ? "input-disabled" : "input-enabled"}`}
    >
      {/* Render the default option outside of the map function */}
      <option className="select__option" value={null || defaultValue}>
        {defaultValue || "none"}
      </option>

      {/* Map over the userData array and render each user option */}
      {userData &&
        userData.map((user) => (
          <option className="select__option" key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
    </select>
  );
};
export default SelectInputUser;
