import React, { useRef, useState } from "react";
import { InputField } from "../../Component/Input/InputField";
import { Label } from "../../Component/Label/Label";
import { useForm } from "react-hook-form";
import "./profile.css";
import Button from "../../Component/Button/Button";
import { SelectInput } from "../../Component/Input/SelectInput";
import Model from "../../Component/Model/Model";
import { Link } from "react-router-dom";
import { profileCover } from "../../Component/Images/Image";
import { GoTrash } from "react-icons/go";
/**
 * Functional component for viewing user profile information.
 * @returns {JSX.Element} The JSX representation of the component.
 */

const ViewProfile = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const receivedState = true;

  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(profileCover);

  /**
   * Handles the update of the profile image when a new file is selected.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the file input.
   */

  const handleProfileUpdate = (e) => {
    const file = e.target.files[0];
    if (file) {
      const profileUrl = URL.createObjectURL(file);
      setProfileImage(profileUrl);
    }
  };
  /**
   * Deletes the current profile image and sets it back to the default image.
   */

  const deleteProfile = () => {
    setProfileImage(profileCover);
  };

  /**
   * Handles the click event for the file input, triggering the file selection dialog.
   */
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <section className="content-wrapper">
      <div className="user__profile content-radius">
        <div className="content__header form--header">
          <h2>Edit Profile</h2>
          <span>Edit this profile with valid details</span>
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
              <SelectInput isDisabled={receivedState} options={options} />
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
                text="Add Profile"
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

export { ViewProfile };