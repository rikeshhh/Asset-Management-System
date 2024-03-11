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
    {/* Render the default option outside of the map function */}
    <option className="select__option" value={defaultValue || "None"}>
      {defaultValue || "None"}
    </option>

    {/* Map over the LocationData array and render each location option */}
    {LocationData &&
      LocationData.map((option) => (
        <option
          className="select__option"
          key={option.id}
          value={option.id}
        >
          {option.location}
        </option>
      ))}
  </select>
  );
};
export default SelectInputLocation;
