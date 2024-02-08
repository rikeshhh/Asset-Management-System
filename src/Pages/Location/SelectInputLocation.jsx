import React from 'react'
import { selectInputLocation } from './LocationApiSlice';
import { useQuery } from '@tanstack/react-query';

const SelectInputLocation = () => {
    const { data: LocationData } = useQuery({
        queryKey: ["selectInputLocationData"],
        queryFn: selectInputLocation,
      });
    
      return (
        <select required>
          <option className="select__option" value="none">
            None
          </option>
          {LocationData && LocationData.map((option) => (
            <option className="select__option" key={option.id} value={option.location}>
              {option.location}
            </option>
          ))}
        </select>
      );
    };
export default SelectInputLocation