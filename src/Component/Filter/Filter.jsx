/**
 * Filter component for filtering assets data.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.handleClick - Function to handle click events
 * @param {boolean} props.filterShow - Boolean indicating whether the filter is displayed or not
 * @returns {JSX.Element} JSX representation of the Filter component
 */

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

const Filter = ({
  handleClick,
  filterShow,
  filterOptions,
  setPageNumber,
  setSearchParams,
}) => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //function to filter assets data
  const filterSubmit = (data) => {
    setPageNumber(1);
    const fromDate = data.fromDate.replace(/\+/g, " ");
    const toDate = data.toDate.replace(/\+/g, " ");
    const assignedDate = `${fromDate} to ${toDate}`;
    const updatedParams = {};

    // Check each parameter and add it to the updatedParams object if it's not null
    if (data.category !== "None") {
      updatedParams.category = data.category;
    }
    if (data.status !== "None") {
      updatedParams.status = data.status;
    }
    if (data.fromDate && data.toDate) {
      updatedParams.assigned_date = assignedDate;
    }

    // Update searchParams only with non-null values from updatedParams
    setSearchParams(updatedParams);
    setTimeout(() => {
      handleClick();
    }, 1000);
  };

  const clearInputFields = () => {
    reset();
    reset({ fromDate: "", toDate: "" });
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
                option={filterOptions}
                register={register}
                name="status"
              />
            </div>

            <div className="form__input--section ">
              <div style={{ paddingBottom: "10px" }}>
                <Label text={"Assigned Dates:"} />
              </div>
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
              <Button
                className="button__red"
                text="Clear All Filter"
                handleClick={clearInputFields}
              />
              {/* <Link to="/payment" state={receivedFeature} className="link"> */}
              <Button
                type="submit"
                className="button__blue"
                text="Apply Filter"
                // handleClick={hideFilterBox}
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
