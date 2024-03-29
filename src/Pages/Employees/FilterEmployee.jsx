import { useForm } from "react-hook-form";
import "../../Component/Filter/Filter.css";
import { RxCross1 } from "react-icons/rx";
import Button from "../../Component/Button/Button";
import { Label } from "../../Component/Label/Label";
import { SelectInput } from "../../Component/Input/SelectInput";
import { InputField } from "../../Component/Input/InputField";
import Model from "../../Component/Model/Model";
import { useSearchParams } from "react-router-dom";
import SelectFilter from "../../Component/Filter/SelectFilter";
import SelectInputDepartment from "../Departments/SelectInputDepartment";
import { SearchInput } from "../../Component/SearchInput/SearchInput";
import SelectInputDesignation from "./SelectDesignation";
const FilterEmployee = ({
  handleClick,
  filterShow,
  designationSubmit,
  setPage,
  setSearchParams,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();

  const designationFilterSubmit = (data) => {
    console.log("data", "data", data);
    if (data.designation || data.department) {
      setPage(1);
      designationSubmit(data);
      setTimeout(() => {
        handleClick();
      }, 1000);
    } else {
      handleClick(); // Hide filter
    }
  };
  const handleResetForm = () => {
    setSearchParams("");
    reset();
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
        <form
          className="filter__form"
          onSubmit={handleSubmit(designationFilterSubmit)}
        >
          <div className="group__form filter__gap ">
            <div className="form__input--section ">
              <Label text={"Department"} />
              <SelectInputDepartment
                register={register}
                isRequired={false}
                name="department"
                errors={errors}
              />
            </div>
            <div>
              <Label text={"Designation"} />

              <SelectInputDesignation
                register={register}
                isRequired={false}
                name="designation"
                errors={errors}
              />
            </div>
          </div>
          <div className="filter__button">
            <div className="filter__button--flex">
              <Button
                type="button"
                className="button__red"
                text="Clear All Filter"
                handleClick={handleResetForm}
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

export default FilterEmployee;
