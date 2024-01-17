import { useForm } from "react-hook-form";
import { InputField } from "../../Component/Input/InputField";
import Table from "../../Component/Table/Table";
import "./Employee.css";
import Model from "../../Component/Model/Model";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import Button from "../../Component/Button/Button";
import { IoMdAdd } from "react-icons/io";
import { BsFunnel } from "react-icons/bs";

const Employees = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  return (
    <section className="content-wrapper">
      <div className="content-radius employees">
        <div className="content__header employees__top">
          <h2>Employees</h2>
          <Button
            text={"Add A Profile"}
            className={"employees__header--button"}
            icon={<IoMdAdd />}
          />
        </div>
        <div className="employees__table">
          <div className="employees__table--top">
            <InputField
              name="Search"
              register={register}
              errors={errors}
              placeholder={Model.Group.placeholder}
              type={Model.Group.type}
              value={Model.Group.pattern.value}
              message={Model.Group.pattern.message}
              icon={<HiMiniMagnifyingGlass />}
            />
            <Button
              text="Filter"
              icon={<BsFunnel />}
              className="assets__filter__button"
            />
          </div>
          <Table />
        </div>
      </div>
    </section>
  );
};

export default Employees;
