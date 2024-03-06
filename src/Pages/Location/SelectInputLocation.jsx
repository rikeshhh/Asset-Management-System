import React from "react";
import { selectInputLocation } from "./LocationApiSlice";
import { useQuery } from "@tanstack/react-query";

const SelectInputLocation = ({
  onChange,
  value,
  isDisabled,
  name,
  register,
  defaultValue,
}) => {
  const { data: LocationData } = useQuery({
    queryKey: ["selectInputLocationData"],
    queryFn: selectInputLocation,
  });

  return (
    <select
      {...register(name)}
      disabled={isDisabled}
      required
      className={isDisabled ? "select__disabled" : "select__enabled"}
      onChange={onChange}
    >
      {LocationData &&
        LocationData.map((option) => (
          <>
            <option className="select__option" value={defaultValue || null}>
              {defaultValue || "none"}
            </option>
            <option
              className="select__option"
              key={option.id}
              value={option.id}
            >
              {option.location}
            </option>
          </>
        ))}
    </select>
  );
};
export default SelectInputLocation;
