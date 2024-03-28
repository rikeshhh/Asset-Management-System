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
import SelectInputUser from "../Assets/SelectInputUser";
import SelectUser from "./SelectUser";
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

    // Check if all three parameters are selected
    if (
      data.user !== "None" &&
      data.status !== "None" &&
      data.verifiedBy !== "None" &&
      data.fromDate &&
      data.toDate
    ) {
      setSearchParams({
        requested_by: data.user,
        status: data.status,
        assigned_date: assignedDate,
        verified_by: data.verifiedBy,
      });
    }
    // Check if only user is selected
    else if (data.user !== "None") {
      setSearchParams({
        requested_by: data.user,
      });
    }
    // Check if only verified by is selected
    else if (data.verifiedBy !== "None") {
      setSearchParams({
        verified_by: data.verifiedBy,
      });
    }
    // Check if only status is selected
    else if (data.status !== "None") {
      setSearchParams({
        status: data.status,
      });
    }
    // Check if only fromDate and toDate are selected
    else if (data.fromDate && data.toDate) {
      setSearchParams({
        assigned_date: assignedDate,
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
