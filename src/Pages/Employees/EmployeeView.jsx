import React, { useEffect, useRef, useState } from "react";
import { InputField } from "../../Component/Input/InputField";
import { Label } from "../../Component/Label/Label";
import { useForm } from "react-hook-form";
import "./Employee.css";
import Button from "../../Component/Button/Button";
import { SelectInput } from "../../Component/Input/SelectInput";
import Model from "../../Component/Model/Model";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { profileCover } from "../../Component/Images/Image";
import { GoTrash } from "react-icons/go";
import { showHide } from "../../Component/Images/Image";
import DateComponent from "../../Component/FormatDate/Date";
import { useQuery } from "@tanstack/react-query";
import { getEmployeeTableData } from "./EmployeeApiSlice";
import ImagePath from "../../Component/Images/ImagePath";
/**
 * Functional component for viewing user profile information.
 * @returns {JSX.Element} The JSX representation of the component.
 */

const EmployeeView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const receivedData = location.state;
  const viewEmployeeData = receivedData.viewEmployeeData;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const receivedState = true;
  // const image = {<ImagePath file = {viewEmployeeData.user_image} />}
  // console.log(viewEmployeeData.user_image);
  /**
   * Handles the update of the profile image when a new file is selected.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the file input.
   */

  const date = viewEmployeeData.created_at;
  const [profileImage, setProfileImage] = useState(profileCover);

  // const [profileImage, setProfileImage] = useState(profileCover);
  // const file = viewEmployeeData.user_image ? viewEmployeeData.user_image : "";
  // const backendUrl = import.meta.env.VITE_APP_AMS_API;
  // const userProfile = `${backendUrl}/image?image_path=${file}`;
  // console.log("userProfile", userProfile);

  // console.log("profileImage", profileImage.user_image);
  console.log(viewEmployeeData);
  return (
    <section className="content-wrapper">
      <div className="user__profile content-radius">
        <div className="content__header form--header">
          <h2>{viewEmployeeData.name}</h2>
          <p>
            <span>{viewEmployeeData.designation}</span> |
            <span>{viewEmployeeData.department.name}</span>
          </p>
        </div>
        <div className="user__profile--body">
          <div className="user__profile--left">
            <div className="user__profile--image">
              <figure>
                {/* <img src={profileImage} alt="Profile Image" /> */}
                <ImagePath
                  file={
                    viewEmployeeData.user_image
                      ? viewEmployeeData.user_image
                      : " "
                  }
                  state={{ profileImage, setProfileImage }}
                />
                <div className="profile__button--container">
                  <Button
                    type={"button"}
                    icon={<GoTrash />}
                    className={"button__red profile__delete--button"}
                    isDisabled={receivedState}
                  />
                </div>
              </figure>

              <Button
                text={"Upload new photo"}
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
              <div className="date__created">
                <span style={{ fontSize: "0.875rem" }}>Created on: </span>
                {<DateComponent date={date} /> || "24th September 2019"}
              </div>
            </div>
          </div>

          <form className="group__form profile__form">
            <div className="form__input--section">
              <Label sup={"*"} text="Name" />
              <InputField
                name="username"
                defaultValue={viewEmployeeData.name}
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
                      // isChecked={receivedState}
                      isChecked={
                        viewEmployeeData.job_type === "Permanent"
                          ? receivedState
                          : null
                      }
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
                      isChecked={
                        viewEmployeeData.job_type === "Temporary"
                          ? receivedState
                          : null
                      }
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
                defaultValue={
                  viewEmployeeData.designation
                    ? viewEmployeeData.designation
                    : "designation"
                }
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
              <select name="" id="" disabled className="view-profile__select">
                <option>{viewEmployeeData.department.name}</option>
              </select>
            </div>

            <div className="form__input--section toggleBtn__email__parent">
              <Label sup={"*"} text="Email" />
              <InputField
                name="email"
                defaultValue={viewEmployeeData.email}
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
              >
                <button className="toggleBtn__email" type="button">
                  <img src={showHide} alt="show-hide" />
                </button>
              </InputField>
            </div>
            <div className="form__input--section">
              <Label sup={"*"} text="Phone Number" />
              <InputField
                name="phoneNumber"
                defaultValue={viewEmployeeData.phone_number}
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
              {/* <Link to="/employees" className="link">
                <Button
                  className={receivedState ? "profile-btn-none" : "button__red"}
                  text="Cancel"
                  isDisabled={receivedState}
                />
              </Link> */}

              <Link to="/employees" className="link">
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

export default EmployeeView;
