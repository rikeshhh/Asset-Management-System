import React, { useState } from "react";
import { SearchSvg } from "../svg/SearchSvg";
import { useForm } from "react-hook-form";
import "./search.css";

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

  const handleSearchChange = (e) => {
    setPageNumber(1);
    const data = e.target.value;
    setInputValue(data);
    setSearchParams({ Search: data });
  };

  return (
    <div className="search__form">
      <SearchSvg />
      <input
        name="Search"
        {...register("Search", {
          value: inputValue,
          onChange: handleSearchChange,
        })}
        errors={errors}
        placeholder="Search"
        className="search-input"
        type={"search"}
      />
    </div>
  );
};
