import { useForm } from "react-hook-form";
import Button from "../../Component/Button/Button";
import { InputField } from "../../Component/Input/InputField";
import { Label } from "../../Component/Label/Label";
import Table from "../../Component/Table/Table";
import Model from "../../Component/Model/Model";
import { SelectInput } from "../../Component/Input/SelectInput";
import { IoMdAdd } from "react-icons/io";
import { GrStatusGoodSmall } from "react-icons/gr";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProcurementForm = () => {
  const [options, setOptions] = useState(["Urgent", "High", "Low", "Very Low"]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitProcurement = () => {
  };
  return (
    <section className="content-wrapper">
      <div className="content-radius procurement">
        <div className="procurement__header--form form--header">
          <h2>Procurement Form</h2>
          <p>
            <span>Procurement /</span>{" "}
            <GrStatusGoodSmall className="form__circle" /> Request an asset
          </p>
        </div>
        <form
          onSubmit={handleSubmit(submitProcurement)}
          className="procurement__request"
        >
          <div className="procurement__employee--dets">
            <div className="user__auth--input procurement__form--input">
              <Label sup={"*"} text="Requested By" />
              <InputField
                name="Username"
                register={register}
                pattern={Model.Username.pattern}
                required={Model.Username.required}
                errorMessage={Model.Username.errorMessage}
                errors={errors}
                type={Model.Username.type}
                placeholder={Model.Username.placeholder}
                minLength={Model.Username.minLength}
                maxLength={Model.Username.maxLength}
              />
            </div>
            <div className="user__auth--input procurement__form--input">
              <Label sup={"*"} text="Request Urgency" />
              <SelectInput options={options} />
            </div>
          </div>
          <div className="procurement__product">
            <div className="procurement__product--list">
              <h3>Product List</h3>
              <Button
                type={"button"}
                text="Add a table line"
                className={"procurement--button"}
                icon={<IoMdAdd />}
              />
            </div>
            <Table size="5" linkTo={""} />
            <div className="procurement__bottom--buttons">
              <Button
                text="Fill Procurement"
                className={"procurement--button"}
              />
              <Link to={"/procurement"} className="link">
                <Button
                  text="Cancel"
                  className={"procurement__error--button"}
                />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProcurementForm;
