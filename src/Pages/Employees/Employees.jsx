import { useForm } from "react-hook-form";
import { InputField } from "../../Component/Input/InputField";
import Table from "../../Component/Table/Table";
import "./Employee.css";
import Model from "../../Component/Model/Model";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import Button from "../../Component/Button/Button";
import { IoMdAdd } from "react-icons/io";
import { BsFunnel } from "react-icons/bs";
import { Link } from "react-router-dom";
import Filter from "../../Component/Filter/Filter";
import { useState } from "react";

const Employees = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [filterShow, setFilterShow] = useState(false);

  const onFilterClick = (showHide) => {
    setFilterShow(showHide);
  };
  return (
    <>
      <section className="content-wrapper">
        <div className="content-radius employees">
          <div className="content__header employees__top">
            <h2>Employees</h2>
            <Link to="/addProfile" className="link">
              <Button
                text={"Add A Profile"}
                className={" button__blue"}
                icon={<IoMdAdd />}
              />
            </Link>
          </div>
          <div className="employees__table">
            <div className="ams__filter">
              <InputField
                name="Search"
                register={register}
                errors={errors}
                placeholder={"Search"}
                type={Model.Group.type}
                value={Model.Group.pattern.value}
                message={Model.Group.pattern.message}
                icon={<HiMiniMagnifyingGlass />}
              />
              <Button
                handleClick={() => onFilterClick(!filterShow)}
                text="Filter"
                icon={<BsFunnel />}
                className="filter--button"
              />
            </div>
            <Table serverPath={"/user"} linkTo={"/editProfile"} />
          </div>
        </div>
      </section>
      {filterShow && <Filter handleClick={() => onFilterClick(!filterShow)} />}
    </>
  );
};

export default Employees;
