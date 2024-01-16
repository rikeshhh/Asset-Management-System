import React, { useRef } from "react";
import { InputField } from "../../Component/Input/InputField";
import { Label } from "../../Component/Label/Label";
import { useForm } from "react-hook-form";
import "./profile.css";
import Button from "../../Component/Button/Button";
import { SelectInput } from "../../Component/Input/SelectInput";
import userProf from "/src/assets/userProf.svg";
import Model from "../../Component/Model/Model";
import { useLocation } from "react-router";
export const Profile = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const location = useLocation();
  const receivedState = location.state;

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
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
                value={Model.Username.value}
                message={Model.Username.message}
                required={Model.Username.required}
                errors={errors}
                type={Model.Username.type}
                placeholder={Model.Username.placeholder}
                minLength={Model.Username.minLength}
                maxLength={Model.Username.maxLength}
                isDisabled={receivedState}
              />
            </div>

            <div className="user__profile--section">
              <Label text="Job Type" />
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <div className="checkbox__input--label">
                  <InputField
                    name="Radio"
                    register={register}
                    pattern={Model.Radio.pattern}
                    required={Model.Radio.required}
                    errors={errors}
                    type={Model.Radio.type}
                    isDisabled={receivedState}
                  />
                  <Label text="Permanent" />
                </div>
                <div className="checkbox__input--label">
                  <InputField
                    name="Radio"
                    register={register}
                    pattern={Model.Radio.pattern}
                    required={Model.Radio.required}
                    errorMessage={Model.Radio.errorMessage}
                    errors={errors}
                    type={Model.Radio.type}
                    isDisabled={receivedState}
                  />
                  <Label text="Temporary" />
                </div>
              </div>
            </div>
            <div className="user__profile--section">
              <Label text="Designation" />
              <InputField
                name="Designation"
                register={register}
                pattern={Model.Designation.pattern}
                required={Model.Designation.required}
                errors={errors}
                type={Model.Designation.type}
                placeholder={Model.Designation.placeholder}
                minLength={Model.Designation.minLength}
                maxLength={Model.Designation.maxLength}
                isDisabled={receivedState}
              />
            </div>
            <div className="user__profile--section">
              <Label text="Department" />
              <SelectInput isDisabled={receivedState} />
            </div>
            <div className="user__profile--section">
              <Label text="Email" />
              <InputField
                name="Email"
                register={register}
                pattern={Model.Email.pattern}
                required={Model.Email.required}
                errors={errors}
                type={Model.Email.type}
                placeholder={Model.Email.placeholder}
                minLength={Model.Email.minLength.value}
                minMessage={Model.Email.minLength.message}
                maxMessage={Model.Email.maxLength.message}
                maxLength={Model.Email.maxLength.value}
                isDisabled={receivedState}
              />
            </div>
            <div className="user__profile--section">
              <Label text="Phone Number" />
              <InputField
                name="PhoneNumber"
                register={register}
                pattern={Model.PhoneNumber.pattern}
                required={Model.PhoneNumber.required}
                errors={errors}
                type={Model.PhoneNumber.type}
                placeholder={Model.PhoneNumber.placeholder}
                minLength={Model.PhoneNumber.minLength}
                maxLength={Model.PhoneNumber.maxLength}
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
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
