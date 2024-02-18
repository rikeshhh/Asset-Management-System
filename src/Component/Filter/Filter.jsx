import { useForm } from "react-hook-form";
import "./Filter.css";
import { RxCross1 } from "react-icons/rx";
import Button from "../Button/Button";
import { Label } from "../Label/Label";
import { SelectInput } from "../Input/SelectInput";
import { useEffect, useState } from "react";
import { InputField } from "../Input/InputField";
import Model from "../Model/Model";

const Filter = ({ handleClick, filterShow }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // const handleBodyClick = (e) => {
  //   if (
  //     !e.target.closest(".filter") &&
  //     !e.target.closest(".filter--button") &&
  //     !e.target.closest(".filter__form")
  //   ) {
  //     toggleFilter(); // Close the filter component
  //   }
  // };

  // useEffect(() => {
  //   document.body.addEventListener("click", handleBodyClick);

  //   return () => {
  //     document.body.removeEventListener("click", handleBodyClick);
  //   };
  // }, [toggleFilter]);

  const options = [{ options: "frontend", value: "frontend" }];
  const filterSubmit = () => {};

  return (
    <>
      <div className="filter__container" onClick={handleClick}></div>
      <div className={`filter ${filterShow ? "open" : ""} `}>
        <div className="filter__heading">
          <h3>Filter</h3>
          <div className="filter__hide" onClick={handleClick}>
            <RxCross1 className="filter__heading--icon" />
          </div>
        </div>
        <form onSubmit={handleSubmit(filterSubmit)} className="filter__form">
          <div className="group__form filter__gap ">
            <div className="form__input--section ">
              <Label text={"Categories"} />
              <SelectInput options={options} />
            </div>
            <div className="form__input--section ">
              <Label text={"Status"} />
              <SelectInput options={options} />
            </div>
            <div className="form__input--section ">
              <Label text={"Status"} />
              <SelectInput options={options} />
            </div>
            <div className="form__input--section ">
              <Label text={"Status"} />
              <SelectInput options={options} />
            </div>
            <div className="form__input--section ">
              <Label text={"Assigned Date"} />
              <InputField
                name="Expiration Date"
                register={register}
                value={Model.Date.pattern.value}
                message={Model.Date.pattern.message}
                errors={errors}
                type={Model.Date.type}
                placeholder={Model.Date.placeholder}
              />
            </div>
          </div>
          <div className="filter__button">
            <div className="filter__button--flex">
              <Button className="button__red" text="Clear All Filter" />
              {/* <Link to="/payment" state={receivedFeature} className="link"> */}
              <Button
                type="submit"
                className="button__blue"
                text="Apply Filter"
              />
              {/* </Link> */}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Filter;
