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
import SelectFilter from "./SelectFilter";

const Filter = ({ handleClick, filterShow }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  const filterSubmit = (data) => {
    console.log(data);
    const fromDate = data.fromDate.replace(/\+/g, " ");
    const toDate = data.toDate.replace(/\+/g, " ");
    const assignedDate = `${fromDate} to ${toDate}`;

    if (data.category && data.fromDate && data.toDate) {
      // Set search parameters including category, fromDate, toDate, and status
      setSearchParams({
        category: data.category,
        fromDate: data.fromDate,
        toDate: data.toDate,
        status: data.status,
        assigned_date: assignedDate,
      });
    } else if (data.status !== "None") {
      // Set search parameters including status only
      setSearchParams({
        status: data.status,
      });
    } else if (data.category !== "None") {
      setSearchParams({
        category: data.category,
      });
    } else if (data.fromDate !== "") {
      setSearchParams({
        fromDate: data.fromDate,
      });
    } else if (data.toDate !== "") {
      setSearchParams({
        toDate: data.toDate,
      });
    } else if (data.toDate && data.fromDate !== "") {
      setSearchParams({
        assigned_date: `${data.toDate} to ${data.fromDate}`,
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
              <SelectFilter register={register} name="category" />
            </div>
            {/* <div className="form__input--section ">
              <Label text={"Status"} />
              <SelectInput option={option} register={register} name="status" />
            </div> */}
            <div className="form__input--section ">
              <Label text={"Status"} />
              <SelectInput
                option={["None", "active", "inactive"]}
                register={register}
                name="status"
              />
            </div>

            <div className="form__input--section ">
              <Label text={"From"} />
              <InputField
                name="fromDate"
                register={register}
                value="\d{4}-\d{2}-\d{2}"
                message={Model.Date.pattern.message}
                errors={errors}
                type={Model.Date.type}
                placeholder={Model.Date.placeholder}
              />
              <Label text="To" />
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
