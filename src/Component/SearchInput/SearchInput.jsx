import React from "react";
import { SearchSvg } from "../svg/SearchSvg";
import { InputField } from "../Input/InputField";
import { useForm } from "react-hook-form";
import "./search.css";

export const SearchInput = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitSearch = (data) => {
    console.log("hello");
  };
  return (
    <form className="search__form" onSubmit={handleSubmit(submitSearch)}>
      <SearchSvg />
      <InputField
        name="Search"
        register={register}
        errors={errors}
        placeholder={"Search"}
        className="search-input"
      />
    </form>
  );
};
