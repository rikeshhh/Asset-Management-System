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
  errors,
}) => {
  const { data: LocationData } = useQuery({
    queryKey: ["selectInputLocationData"],
    queryFn: selectInputLocation,
  });
  return (
    <>
      <select
        {...register(name, { required: true })}
        disabled={isDisabled}
        className={isDisabled ? "select__disabled" : "select__enabled"}
        onChange={onChange}
      >
        {defaultValue ? null : (
          <option value="" disabled selected>
            Select the location of the assets
          </option>
        )}
        {/* Render the default option outside of the map function */}
        {defaultValue && (
          <option className="select__option" value={defaultValue.id}>
            {defaultValue.name}
          </option>
        )}

        {/* Map over the LocationData array and render each location option */}
        {LocationData && (
          <>
            {LocationData.map((option) => (
              <option
                className="select__option"
                key={option.id}
                value={option.id}
              >
                {option.location}
              </option>
            ))}
          </>
        )}
      </select>
      {errors[name] && (
        <span className="error-message">"Please select an location"</span>
      )}
    </>
  );
};
export default SelectInputLocation;
