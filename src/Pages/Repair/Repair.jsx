import { Link } from "react-router-dom";
import Button from "../../Component/Button/Button";
import { InputField } from "../../Component/Input/InputField";
import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import "./Repair.css";
import Model from "../../Component/Model/Model";
import { useState } from "react";
import Table from "../../Component/Table/Table";
import { BsFunnel } from "react-icons/bs";

const Repair = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isActive, setIsActive] = useState(true);
  const [activeButton, setActiveButton] = useState("hardware");
  const handleButtonClick = () => {
    setIsActive((prev) => !prev);
  };
  return (
    <section className="content-wrapper">
      <div className="repair content-radius">
        <div className="content__header repair__header">
          <h2>Repair & Replace</h2>
          <Button
            text="Send for Repair / Replace"
            className={"category--buttons button__blue"}
            icon={<IoMdAdd />}
          />
        </div>

        <div className="repair__content">
          <div className="repair__navigation">
            <Button
              text="Repair"
              onClick={handleButtonClick}
              isActive={isActive}
              className="assets__btn"
            />
            <Button
              text="Replace"
              onClick={handleButtonClick}
              isActive={!isActive}
              className="assets__btn"
            />
          </div>

          <div className="repair__filter ">
            <InputField
              name="Repair"
              register={register}
              pattern={Model.Group.pattern}
              required={Model.Group.required}
              errors={errors}
              type="search"
              placeholder="Search"
            />
            <Button
              text="Filter"
              icon={<BsFunnel />}
              className="filter--button"
            />
          </div>
          {isActive && <Table size="8" />}
        </div>
      </div>
    </section>
  );
};

export default Repair;
