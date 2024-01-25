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

const ProcurementForm = () => {
  const [options, setOptions] = useState(["Urgent", "High", "Low", "Very Low"]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  return (
    <section className="content-wrapper">
      <div className="content-radius procurement">
        <div className="procurement__header form--header">
          <h2>Procurement Form</h2>
          <p>
            <span>Procurement /</span>{" "}
            <GrStatusGoodSmall className="form__circle" /> Request an asset
          </p>
        </div>
        <div className="procurement__request">
          <div className="user__auth--input">
            <Label text="Requested By" />
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
          <div className="user__auth--input">
            <Label text="Requeat Urgency" />
            <SelectInput options={options} />
          </div>
        </div>
        <div className="procurement__product">
          <div className="procurement__product--list">
            <h3>Product List</h3>
            <Button
              text="Add a table line"
              className={"procurement--button"}
              icon={<IoMdAdd />}
            />
          </div>
          <Table size="5" linkTo={"/"} />
          <div className="procurement__bottom--buttons">
            <Button text="Fill Procurement" className={"procurement--button"} />
            <Button text="Cancel" className={"procurement__error--button"} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcurementForm;
