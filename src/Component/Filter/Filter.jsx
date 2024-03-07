import { useForm } from "react-hook-form";
import "./Filter.css";
import { RxCross1 } from "react-icons/rx";
import Button from "../Button/Button";
import { Label } from "../Label/Label";
import { SelectInput } from "../Input/SelectInput";
import { useEffect, useState } from "react";
import { InputField } from "../Input/InputField";
import Model from "../Model/Model";
import SelectInputCategory from "../../Pages/Categories/SelectInputCategory";
import { useQuery } from "@tanstack/react-query";
import {
  getAssetsData,
  getFilterData,
} from "../../Pages/Assets/AssetsApiSlice";
import { useSearchParams } from "react-router-dom";

const Filter = ({ handleClick, filterShow }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  const filterSubmit = (data) => {
    if (data.category && data.status === "none") {
      setSearchParams({
        fromDate: data.fromDate,
        toDate: data.toDate,
      });
    } else {
      setSearchParams({
        ...data,
      });
    }
  };

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
              <SelectInputCategory register={register} name="category" />
            </div>
            {/* <div className="form__input--section ">
              <Label text={"Status"} />
              <SelectInput option={option} register={register} name="status" />
            </div> */}
            <div className="form__input--section ">
              <Label text={"Status"} />
              <SelectInput
                option={["none", "Active", "Inactive"]}
                register={register}
                name="status"
              />
            </div>

            <div className="form__input--section ">
              <Label text={"Assigned Date"} />
              <InputField
                name="fromDate"
                register={register}
                value="\d{4}-\d{2}-\d{2}"
                message={Model.Date.pattern.message}
                errors={errors}
                type={Model.Date.type}
                placeholder={Model.Date.placeholder}
              />

              <InputField
                name="toDate"
                register={register}
                value="\d{4}-\d{2}-\d{2}"
                message={Model.Date.pattern.message}
                errors={errors}
                type={Model.Date.type}
              />
              {/* <input
                type="date"
                {...register("startDate")}
                pattern="\d{4}-\d{2}-\d{2}"
              />
              <input
                type="date"
                {...register("endDate")}
                pattern="\d{4}-\d{2}-\d{2}"
              /> */}
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
