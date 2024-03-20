import React, { useEffect, useState } from "react";
import { SearchSvg } from "../svg/SearchSvg";
import { useForm } from "react-hook-form";
import "./search.css";
import { useDebounce } from "../Debounce/useDebounce";

export const SearchInput = ({
  defaultValue,
  setSearchParams,
  setPageNumber,
}) => {
  const {
    register,
    formState: { errors },
  } = useForm();
  const [inputValue, setInputValue] = useState(defaultValue);
  const debouncedSearch = useDebounce(inputValue);

  useEffect(() => {
    setPageNumber(1);
    setSearchParams({ Search: debouncedSearch });
  }, [debouncedSearch]);

  return (
    <div className="search__form">
      <SearchSvg />
      <input
        name="Search"
        {...register("Search", {
          value: inputValue,
          onChange: (e) => setInputValue(e.target.value),
        })}
        errors={errors}
        placeholder="Search"
        className="search-input"
        type={"search"}
      />
    </div>
  );
};
