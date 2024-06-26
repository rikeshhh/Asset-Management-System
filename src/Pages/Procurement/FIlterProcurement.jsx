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
import "../../Component/Filter/Filter.css";
import { RxCross1 } from "react-icons/rx";
import { Label } from "../../Component/Label/Label";
import { SelectInput } from "../../Component/Input/SelectInput";
import { InputField } from "../../Component/Input/InputField";
import Button from "../../Component/Button/Button";
import Model from "../../Component/Model/Model";
import SelectFilterUser from "./SelectFilterUser";

const FilterProcurement = ({
  handleClick,
  filterShow,
  filterOptions,
  setPageNumber,
  setSearchParams,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  //function to filter assets data
  const filterSubmit = (data) => {
    setPageNumber(1);
    const fromDate = data.fromDate.replace(/\+/g, " ");
    const toDate = data.toDate.replace(/\+/g, " ");
    const assignedDate = `${fromDate} to ${toDate}`;

    const updatedParams = {};

    // Check each parameter and add it to the updatedParams object if it's not null
    if (data.user !== "None") {
      updatedParams.requested_by = data.user;
    }
    if (data.status !== "None") {
      updatedParams.status = data.status;
    }
    if (data.verifiedBy !== "None") {
      updatedParams.verified_by = data.verifiedBy;
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
              <Label text={"Requested By"} />
              <SelectFilterUser register={register} name="user" />
            </div>
            <div className="form__input--section ">
              <Label text={"Verified By"} />
              <SelectFilterUser register={register} name="verifiedBy" />
            </div>
            <div className="form__input--section ">
              <Label text={"Status"} />
              <SelectInput
                option={filterOptions}
                register={register}
                name="status"
              />
            </div>

            <div className="form__input--section ">
              <Label text={"Assigned Date: From"} />
              <InputField
                name="fromDate"
                register={register}
                value="\d{4}-\d{2}-\d{2}"
                message={Model.Date.pattern.message}
                errors={errors}
                type={Model.Date.type}
                placeholder={Model.Date.placeholder}
              />
            </div>
            <div className="form__input--section">
              <Label text="Assigned Date: To" />
              <InputField
                name="toDate"
                register={register}
                value="\d{4}-\d{2}-\d{2}"
                message={Model.Date.pattern.message}
                errors={errors}
                type={Model.Date.type}
                placeholder={Model.Date.placeholder}
              />
            </div>
          </div>
          <div className="filter__button">
            <div className="filter__button--flex">
              <Button
                type="button"
                className="button__red"
                text="Clear All Filter"
                handleClick={() => {
                  reset();
                  setSearchParams("");
                }}
              />

              <Button
                type="submit"
                className="button__blue"
                text="Apply Filter"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FilterProcurement;
