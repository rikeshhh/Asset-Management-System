import React from "react";
import { InputField } from "../../Component/Input/InputField";
import { Label } from "../../Component/Label/Label";
import "./profile.css";
import Button from "../../Component/Button/Button";
import Model from "../../Component/Model/Model";
import { Link } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import SelectInputDepartment from "../Departments/SelectInputDepartment";

/**
 * Profile component for displaying and editing employee profiles.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title of the profile section.
 * @param {string} props.description - The description of the profile section.
 * @param {string} props.buttonBlueText - The text for the blue button.
 * @param {Object} props.employeeData - Data of the employee profile.
 */
export const Profile = ({
  title,
  description,
  buttonBlueText,
  employeeData,
}) => {
  return (
    <section className="content-wrapper">
      <div className="user__profile content-radius">
        <div className="content__header form--header">
          <h2>{title}</h2>
          <span>{description}</span>
        </div>
        <div className="user__profile--body">
          <div className="user__profile--left">
            <div className="user__profile--image">
              <figure>
                <img src={profileImage} alt="Profile Picture" />
                <div className="profile__button--container">
                  <Button
                    type={"button"}
                    icon={<GoTrash />}
                    className={"button__red profile__delete--button"}
                    handleClick={deleteProfile}
                    isDisabled={receivedState}
                  />
                </div>
              </figure>
              <input
                type="file"
                className="user__profile--none"
                ref={fileInputRef}
                accept=".jpg,.png"
                onChange={handleProfileUpdate}
              />
              <Button
                text={"Upload new photo"}
                handleClick={handleButtonClick}
                isDisabled={receivedState}
                className={
                  receivedState
                    ? "user__profile--file-disabled"
                    : "button__blue upload__btn"
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

          <form onSubmit={handleSubmit()} className="group__form profile__form">
            <div className="form__input--section">
              <Label sup={"*"} text="Name" />
              <InputField
                name="username"
                register={register}
                value={Model.Name.pattern.value}
                message={Model.Name.pattern.message}
                required={Model.Name.required}
                errors={errors}
                inputValue={employeeData.name}
                type={Model.Name.type}
                placeholder={Model.Name.placeholder}
                minLength={Model.Name.minLength.value}
                minMessage={Model.Name.minLength.message}
                maxLength={Model.Name.maxLength.value}
                maxMessage={Model.Name.maxLength.message}
                isDisabled={receivedState}
              />
            </div>

            <div className="form__input--section">
              <Label sup={"*"} text="Job Type" />
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
            <div className="form__input--section">
              <Label sup={"*"} text="Designation" />
              <InputField
                name="designation"
                register={register}
                value={Model.Designation.pattern.value}
                message={Model.Designation.pattern.message}
                required={Model.Designation.required}
                errors={errors}
                inputValue={employeeData.designation}
                type={Model.Designation.type}
                placeholder={Model.Designation.placeholder}
                minLength={Model.Designation.minLength.value}
                minMessage={Model.Designation.minLength.message}
                maxLength={Model.Designation.maxLength.value}
                maxMessage={Model.Designation.maxLength.message}
                isDisabled={receivedState}
              />
            </div>
            <div className="form__input--section">
              <Label sup={"*"} text="Department" />
              <SelectInputDepartment isDisabled={receivedState} />
              {/* // <SelectInput isDisabled={receivedState} options={options} /> */}
            </div>
            <div className="form__input--section">
              <Label sup={"*"} text="Email" />
              <InputField
                name="email"
                register={register}
                value={Model.Email.pattern.value}
                message={Model.Email.pattern.message}
                required={Model.Email.required}
                errors={errors}
                inputValue={employeeData.email}
                type={Model.Email.type}
                placeholder={Model.Email.placeholder}
                maxLength={Model.Email.maxLength.value}
                maxMessage={Model.Email.maxLength.message}
                isDisabled={receivedState}
              />
            </div>
            <div className="form__input--section">
              <Label sup={"*"} text="Phone Number" />
              <InputField
                name="phoneNumber"
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
            <div
              className={
                receivedState
                  ? "user__profile--btn-right"
                  : "user__profile--btn"
              }
            >
              <Button
                value="submit"
                text={buttonBlueText}
                className={receivedState ? "profile-btn-none" : "button__blue"}
              />
              <Link to="/employees" className="link">
                <Button
                  className={receivedState ? "profile-btn-none" : "button__red"}
                  text="Cancel"
                  isDisabled={receivedState}
                />
              </Link>

              <Link to="/" className="link">
                <Button
                  className={
                    receivedState ? "button__red " : "profile-btn-none"
                  }
                  text="Close"
                  isDisabled={false}
                />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
