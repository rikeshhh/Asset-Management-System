import React, { useState } from "react";
import { GrStatusGoodSmall } from "react-icons/gr";
import { InputField } from "../../Component/Input/InputField";
import { useForm } from "react-hook-form";
import { Label } from "../../Component/Label/Label";
import Model from "../../Component/Model/Model";
import { SelectInput } from "../../Component/Input/SelectInput";
import Button from "../../Component/Button/Button";
import DropzoneArea from "../../Component/Dropzone/DropzoneArea";

const AssetsForm = ({
  formHeading,
  formType,
  buttonText,
  buttonCancelText,
}) => {
  const formMethod = useForm();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = formMethod;

  const submitData = (data) => {};

  const [isActive, setIsActive] = useState(false);

  const toggleSwitch = () => {
    setIsActive((prev) => !prev);
  };

  const [options, setOptions] = useState([
    "Frontend",
    "Backend",
    "UI UX",
    "QA",
    "Project Manager",
    "DevOps",
  ]);

  return (
    <div className="content-wrapper">
      <div className="content-radius">
        <div className="content__header ">
          <h2>{formHeading}</h2>
          <p>
            <span>Assets /</span> <GrStatusGoodSmall color="green" /> {formType}
          </p>
        </div>
        <form
          onSubmit={handleSubmit(submitData)}
          className="assets__form--content"
        >
          <div className="form--content__right">
            <div className="assets__form--input">
              <Label text="ID / Product Code" />
              <InputField
                name="ID / Product Code"
                register={register}
                required={Model.Group.required}
                value={Model.Group.pattern.value}
                message={Model.Group.pattern.message}
                errors={errors}
                type={Model.Group.type}
                placeholder={Model.Group.placeholder}
                minLength={Model.Group.minLength.value}
                minMessage={Model.Group.minLength.message}
                maxLength={Model.Group.maxLength.value}
                maxMessage={Model.Group.maxLength.message}
              />
            </div>

            <div className="assets__form--input">
              <Label text="ID / Product Code" />
              <InputField
                name="ID / Product Code"
                register={register}
                required={Model.Group.required}
                value={Model.Group.pattern.value}
                message={Model.Group.pattern.message}
                errors={errors}
                type={Model.Group.type}
                placeholder={Model.Group.placeholder}
                minLength={Model.Group.minLength.value}
                minMessage={Model.Group.minLength.message}
                maxLength={Model.Group.maxLength.value}
                maxMessage={Model.Group.maxLength.message}
              />
            </div>
            <div className="assets__form--input">
              <Label text="ID / Product Code" />
              <SelectInput options={options} />
            </div>
            <div className="assets__form--input">
              <Label text="ID / Product Code" />
              <SelectInput options={options} />
            </div>
            <div className="assets__form--input">
              <Label text="ID / Product Code" />
              <SelectInput options={options} />
            </div>
          </div>
          <div className="form--content__left">
            <div className="assets__form--input">
              <Label text="ID / Product Code" />
              <InputField
                name="ID / Product Code"
                register={register}
                required={Model.Group.required}
                value={Model.Group.pattern.value}
                message={Model.Group.pattern.message}
                errors={errors}
                type={Model.Group.type}
                placeholder={Model.Group.placeholder}
                minLength={Model.Group.minLength.value}
                minMessage={Model.Group.minLength.message}
                maxLength={Model.Group.maxLength.value}
                maxMessage={Model.Group.maxLength.message}
              />
            </div>
            <div className="assets__form--input">
              <Label text="ID / Product Code" />
              <SelectInput options={options} />
            </div>
            <div className="assets__form--input">
              <Label text="ID / Product Code" />
              <SelectInput options={options} />
            </div>
            <div className="assets__form--input assets__switch">
              <label className={`switch ${isActive ? "active" : "inactive"}`}>
                <input
                  type="checkbox"
                  checked={isActive}
                  onClick={toggleSwitch}
                  onChange={() => {}}
                />
                <span className="slider"></span>
                <span className="status">
                  {isActive ? "Active" : "Inactive"}
                </span>
              </label>
            </div>
            <div className="assets__form--input">
              <DropzoneArea />
            </div>
            <div className="assets__form--btn">
              <Button
                value="submit"
                text={buttonText}
                className={"button__blue"}
              />
              <Button
                value="submit"
                text={buttonCancelText}
                className={"button__red"}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetsForm;
