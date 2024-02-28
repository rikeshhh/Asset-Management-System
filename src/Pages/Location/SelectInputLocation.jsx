import React from "react";
import { selectInputLocation } from "./LocationApiSlice";
import { useQuery } from "@tanstack/react-query";

const SelectInputLocation = ({ onChange, value, isDisabled }) => {
  const { data: LocationData } = useQuery({
    queryKey: ["selectInputLocationData"],
    queryFn: selectInputLocation,
  });

  return (
    <select
      disabled={isDisabled}
      required
      className={isDisabled ? "select__disabled" : "select__enabled"}
      onChange={onChange}
    >
      <option className="select__option" value={value || "none"}>
        {value || "none"}
      </option>
      {LocationData &&
        LocationData.map((option) => (
          <option
            className="select__option"
            key={option.id}
            value={option.location}
          >
            {option.location}
          </option>
        ))}
    </select>
  );
};
export default SelectInputLocation;
