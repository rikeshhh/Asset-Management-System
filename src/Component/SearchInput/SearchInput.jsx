import React from "react";
import { SearchSvg } from "../svg/SearchSvg";
import { InputField } from "../Input/InputField";
import { useForm } from "react-hook-form";
import "./search.css";

export const SearchInput = ({ submitSearch }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleSearchSubmit = (data) => {
    submitSearch(data);
  };

  return (
    <form className="search__form" onSubmit={handleSubmit(handleSearchSubmit)}>
      <SearchSvg />
      <InputField
        name="Search"
        register={register}
        errors={errors}
        placeholder="Search"
        className="search-input"
      />
    </form>
  );
};
