import Button from "../../Component/Button/Button";
import { IoMdAdd } from "react-icons/io";
import "./Procurement.css";
import { InputField } from "../../Component/Input/InputField";
import { useForm } from "react-hook-form";
import Model from "../../Component/Model/Model";
import { BsFunnel } from "react-icons/bs";
import Table from "../../Component/Table/Table";
import { Link } from "react-router-dom";

const Procurement = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  return (
    <section className="content-wrapper">
      <div className="content-radius procurement">
        <div className="content__header procurement__header">
          <h2>Procurement </h2>
          <Link to={"/procurementForm"} className="link">
            <Button
              className="button__blue"
              icon={<IoMdAdd />}
              text="Fill Procurement"
            />
          </Link>
        </div>
        <div className="ams__filter ">
          <InputField
            name="Procurement"
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
        <div className="procurement__table">
          <Table linkTo={"/procurementForm"} />
        </div>
      </div>
    </section>
  );
};

export default Procurement;
