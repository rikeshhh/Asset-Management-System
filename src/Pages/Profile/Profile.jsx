import React from "react";
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
  return (
    <section className="content-wrapper">
      <div className="user__profile content-radius">
        <div className="user__profile--header">
          <h2>Amod Suman</h2>
          <span>Developer | Frontend</span>
        </div>
        <div className="user__profile--body">
          <div className="user__profile--left">
            <div className="user__profile--image">
              <figure>
                <img src={userProf} alt="amod suman" />
              </figure>
              <Button
                text="Upload new photo"
                className={"user__profile--image button"}
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
                pattern={Model.Username.pattern}
                required={Model.Username.required}
                errorMessage={Model.Username.errorMessage}
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
                errorMessage={Model.Radio.errorMessage}
                errors={errors}
                type={Model.Radio.type}
                placeholder={Model.Radio.placeholder}
                minLength={Model.Radio.minLength}
                maxLength={Model.Radio.maxLength}
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
                placeholder={Model.Radio.placeholder}
                minLength={Model.Radio.minLength}
                maxLength={Model.Radio.maxLength}
                isDisabled={receivedState}
                />
                  <Label text="Temporary" />
                </div>
              </div>
            </div>
            <div className="user__profile--section">
              <Label text="Designation" />
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
                isDisabled={receivedState}

              />
            </div>
            <div className="user__profile--section">
              <Label text="Department" />
              <SelectInput />
            </div>
            <div className="user__profile--section">
              <Label text="Email" />
              <InputField
                name="Email"
                register={register}
                pattern={Model.Email.pattern}
                required={Model.Email.required}
                errorMessage={Model.Email.errorMessage}
                errors={errors}
                type={Model.Email.type}
                placeholder={Model.Email.placeholder}
                minLength={Model.Email.minLength}
                maxLength={Model.Email.maxLength}
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
                errorMessage={Model.PhoneNumber.errorMessage}
                errors={errors}
                type={Model.PhoneNumber.type}
                placeholder={Model.PhoneNumber.placeholder}
                minLength={Model.PhoneNumber.minLength}
                maxLength={Model.PhoneNumber.maxLength}
                isDisabled={receivedState}

              />
            </div>
            <Button
              className={"button__one"}
              value="submit"
              text="Cancel"
              isDisabled={true}
            />
          </form>
        </div>
      </div>
    </section>
  );
};
