import { useForm } from "react-hook-form";
import Button from "../../Component/Button/Button";
import { InputField } from "../../Component/Input/InputField";
import { Label } from "../../Component/Label/Label";
import Model from "../../Component/Model/Model";
import { SelectInput } from "../../Component/Input/SelectInput";
import { IoMdAdd } from "react-icons/io";
import { GrStatusGoodSmall } from "react-icons/gr";
import { Link } from "react-router-dom";
import AddProcurementTable from "./AddProcurementTable";
import { useRef, useState } from "react";

const ProcurementForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [procurementTableLine, setProcurementTableLine] = useState(false);
  const [editProcurementLine, setEditProcurementLine] = useState(false);

  const handleAddProcurement = () => {
    setEditProcurementLine(false);
    setProcurementTableLine(true);
  };

  const submitProcurement = () => {};

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
                name="username"
                register={register}
                pattern={Model.Name.pattern}
                required={Model.Name.required}
                errorMessage={Model.Name.errorMessage}
                errors={errors}
                type={Model.Name.type}
                placeholder={Model.Name.placeholder}
                minLength={Model.Name.minLength}
                maxLength={Model.Name.maxLength}
              />
            </div>
            <div className="user__auth--input procurement__form--input">
              <Label sup={"*"} text="Request Urgency" />
              <SelectInput />
            </div>
          </div>
          <div className="procurement__product">
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
        <div className="procurement__product--list">
          <h3>Product List</h3>
          <Button
            type={"button"}
            text="Add a table line"
            className={
              editProcurementLine
                ? "procurement--button procurement--button-not__allowed"
                : "procurement--button"
            }
            handleClick={handleAddProcurement}
            icon={<IoMdAdd />}
            isDisabled={editProcurementLine ? true : false}
          />
        </div>
        <AddProcurementTable
          procurementTableLine={procurementTableLine}
          setProcurementTableLine={setProcurementTableLine}
          editProcurementLine={editProcurementLine}
          setEditProcurementLine={setEditProcurementLine}
        />
      </div>
    </section>
  );
};

export default ProcurementForm;
