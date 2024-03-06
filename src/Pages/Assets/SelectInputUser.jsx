import React from "react";
import { useQuery } from "@tanstack/react-query";
import { selectUser } from "./AssetsApiSlice";

const SelectInputUser = ({ name, register, defaultValue }) => {
  const { data: userData } = useQuery({
    queryKey: ["selectUserData"],
    queryFn: selectUser,
  });
  return (
    <select {...register(name, { required: true })}>
      {userData &&
        userData.map((user) => (
          <>
            <option className="select__option" value={null || defaultValue}>
              {defaultValue || "none"}
            </option>
            <option className="select__option" key={user.id} value={user.id}>
              {user.name}
            </option>
          </>
        ))}
    </select>
  );
};

export default SelectInputUser;
