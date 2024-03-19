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
const FilterEmployee = ({ handleClick, filterShow, designationSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const designationFilterSubmit = (data) => {
    designationSubmit(data);
  };

  return (
    <>
      <div className={`filter ${filterShow ? "open" : ""}`}>
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
              />
            </div>
            <div>
              <div className="form__input--section">
                <Label text="Designation" />
                <InputField
                  name="designation"
                  register={register}
                  value={Model.Designation.pattern.value}
                  message={Model.Designation.pattern.message}
                  required={false}
                  errors={errors}
                  type={Model.Designation.type}
                  placeholder={Model.Designation.placeholder}
                  isDisabled={false}
                />
              </div>
            </div>
          </div>
          <div className="filter__button">
            <div className="filter__button--flex">
              <Button className="button__red" text="Clear All Filter" />
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
