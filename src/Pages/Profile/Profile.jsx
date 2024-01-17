import React, { useRef, useState } from "react";
import { InputField } from "../../Component/Input/InputField";
import { Label } from "../../Component/Label/Label";
import { useForm } from "react-hook-form";
import "./profile.css";
import Button from "../../Component/Button/Button";
import { SelectInput } from "../../Component/Input/SelectInput";
import userProf from "/src/assets/userProf.svg";
import Model from "../../Component/Model/Model";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
export const Profile = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const location = useLocation();
  const receivedState = location.state;

  const fileInputRef = useRef(null);

  const [options, setOptions] = useState([
    "Frontend",
    "Backend",
    "UI UX",
    "QA",
    "Project Manager",
    "DevOps",
  ]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleCancel = () => <Link to="/employees"></Link>;

  return (
    <section className="content-wrapper">
      <div className="user__profile content-radius">
        <div className="content__header">
          <h2>Amod Suman</h2>
          <span>Developer | Frontend</span>
        </div>
        <div className="user__profile--body">
          <div className="user__profile--left">
            <div className="user__profile--image">
              <figure>
                <img src={userProf} alt="amod suman" />
              </figure>
              <input
                type="file"
                className="user__profile--none"
                ref={fileInputRef}
                accept=".jpg,.png"
                onChange={(e) => {
                  // Handle file selection if needed
                  console.log("Selected file:", e.target.files[0]);
                }}
              />
              <Button
                text={"Upload new photo"}
                onClick={handleButtonClick}
                isDisabled={receivedState}
                className={
                  receivedState
                    ? "user__profile--file-disabled"
                    : "user__profile--file"
                }
              />
              <span>
                Max file size: 3MB <br /> Larger image will be resized
                automatically. <br />
                Supported File Type: JPG, PNG
              </span>
              <p>
                <span style={{ fontSize: "0.875rem" }}>Created on: </span>24th
                September 2019
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit()} className="user__profile--form">
            <div className="user__profile--section">
              <Label text="Name" />
              <InputField
                name="Username"
                register={register}
                value={Model.Username.pattern.value}
                message={Model.Username.pattern.message}
                required={Model.Username.required}
                errors={errors}
                type={Model.Username.type}
                placeholder={Model.Username.placeholder}
                minLength={Model.Username.minLength.value}
                minMessage={Model.Username.minLength.message}
                maxLength={Model.Username.maxLength.value}
                maxMessage={Model.Username.maxLength.message}
                isDisabled={receivedState}
              />
            </div>

            <div className="user__profile--section">
              <Label text="Job Type" />
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <div className="radio__label">
                  <div className="checkbox__input--label">
                    <InputField
                      name="Radio"
                      register={register}
                      errors={errors}
                      type={Model.Radio.type}
                      isDisabled={receivedState}
                    />
                  </div>
                  <Label text="Permanent" />
                </div>
                <div className="radio__label">
                  <div className="checkbox__input--label">
                    <InputField
                      name="Radio"
                      register={register}
                      required={Model.Radio.required}
                      errors={errors}
                      type={Model.Radio.type}
                      isDisabled={receivedState}
                    />
                  </div>
                  <Label text="Temporary" />
                </div>
              </div>
            </div>
            <div className="user__profile--section">
              <Label text="Designation" />
              <InputField
                name="Designation"
                register={register}
                value={Model.Designation.pattern.value}
                message={Model.Designation.pattern.message}
                required={Model.Designation.required}
                errors={errors}
                type={Model.Designation.type}
                placeholder={Model.Designation.placeholder}
                minLength={Model.Designation.minLength.value}
                minMessage={Model.Designation.minLength.message}
                maxLength={Model.Designation.maxLength.value}
                maxMessage={Model.Designation.maxLength.message}
                isDisabled={receivedState}
              />
            </div>
            <div className="user__profile--section">
              <Label text="Department" />
              <SelectInput isDisabled={receivedState} options={options} />
            </div>
            <div className="user__profile--section">
              <Label text="Email" />
              <InputField
                name="Email"
                register={register}
                value={Model.Email.pattern.value}
                message={Model.Email.pattern.message}
                required={Model.Email.required}
                errors={errors}
                type={Model.Email.type}
                placeholder={Model.Email.placeholder}
                maxLength={Model.Email.maxLength.value}
                maxMessage={Model.Email.maxLength.message}
                isDisabled={receivedState}
              />
            </div>
            <div className="user__profile--section">
              <Label text="Phone Number" />
              <InputField
                name="PhoneNumber"
                register={register}
                value={Model.PhoneNumber.pattern.value}
                message={Model.PhoneNumber.pattern.message}
                required={Model.PhoneNumber.required}
                errors={errors}
                type={Model.PhoneNumber.type}
                placeholder={Model.PhoneNumber.placeholder}
                minLength={Model.PhoneNumber.minLength.value}
                minMessage={Model.PhoneNumber.minLength.message}
                maxLength={Model.PhoneNumber.maxLength.value}
                maxMessage={Model.PhoneNumber.maxLength.message}
                isDisabled={receivedState}
              />
            </div>
            <div className="user__profile--btn">
              <Button
                value="submit"
                text={"Save changes"}
                className={receivedState ? "profile-btn-none" : "profile-btn"}
              />
              <Button
                className={"button__one"}
                text="Cancel"
                isDisabled={receivedState}
                hanldeClick={handleCancel}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
