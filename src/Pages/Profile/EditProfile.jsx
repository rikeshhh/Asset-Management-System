import { useLocation, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import { InputField } from "../../Component/Input/InputField";
import { Label } from "../../Component/Label/Label";
import { useForm } from "react-hook-form";
import "./profile.css";
import Button from "../../Component/Button/Button";
import Model from "../../Component/Model/Model";
import { Link } from "react-router-dom";
import { profileCover } from "../../Component/Images/Image";
import { GoTrash } from "react-icons/go";
import SelectInputDepartment from "../Departments/SelectInputDepartment";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../Component/Query/Query";
import { employeeEdit } from "./ProfileApiSlicee";
import ImagePath from "../../Component/Images/ImagePath";
import DateComponent from "../../Component/FormatDate/Date";
import { notifyError, notifySuccess } from "../../Component/Toast/Toast";
import CustomToastContainer from "../../Component/Toast/ToastContainer";

/**
 * Functional component for editing an existing employee profile.
 * @returns {JSX.Element} JSX element representing the EditProfile component.
 */

const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const receivedData = location.state;
  const employeeData = receivedData.employeeData;
  const employeePrevId = employeeData.id;

  // console.log("employeeData", employeeData);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [imageFlag, setImageFlag] = useState(false);

  const receivedState = false;

  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState();
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [imageReceived, setImageReceived] = useState(
    employeeData.user_image || null
  );

  const [selectedJobType, setSelectedJobType] = useState(
    employeeData.job_type || ""
  );

  /**
   * Handles the update of the profile picture.
   * @param {Object} e - The event object.
   */

  const handleProfileUpdate = (e) => {
    setImageFlag(false);
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setUserProfileImage(file);
      const profileUrl = URL.createObjectURL(file);
      setProfileImage(profileUrl);
    }
  };
  const date = employeeData.created_at;

  const handleRadioChange = (e) => {
    setSelectedJobType(e.target.value);
  };
  /**
   * Deletes the current profile picture.
   */
  const deleteProfile = () => {
    setImageFlag(true);
    setProfileImage(null);
    setUserProfileImage(null);
    setImageReceived(null);
    // if (typeof imageReceived === "string") {
    //   setImageReceived(null);
    // }
  };

  /**
   * Handles the click event of the upload button.
   */
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const EditEmployeeData = useMutation({
    mutationFn: (employeeEditInfo) => {
      return employeeEdit(
        employeeEditInfo.id,
        employeeEditInfo.employeeData,
        employeeEditInfo.employeeImage,
        employeeEditInfo.jobType
      );
    },
    onSuccess: () => {
      notifySuccess("Employee Edited Successfully");
      setTimeout(() => {
        navigate("/employees");
        queryClient.invalidateQueries("EmployeeData");
      }, 1000);
    },
    onError: (error) => {
      notifyError(error.response.data.message.message.user);
    },
  });

  /**
   * Handles the submission of the employee profile edit form.
   * @param {Object} data - Form data submitted.
   */
  const onEmployeeEditSubmit = (data) => {
    const employeeEditInfo = {
      id: employeePrevId,
      employeeData: data,
      employeeImage: userProfileImage ? userProfileImage : imageReceived,
      jobType: selectedJobType,
    };
    EditEmployeeData.mutate(employeeEditInfo);
  };
  console.log("userProfileImage", typeof userProfileImage);
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
                {profileImage ? (
                  <img src={profileImage} alt="Profile Picture" />
                ) : (
                  <ImagePath setImageFlag={setImageFlag} file={imageReceived} />
                )}
                {imageFlag ? (
                  <></>
                ) : (
                  <div className="profile__button--container">
                    <Button
                      type={"button"}
                      icon={<GoTrash />}
                      className={
                        userProfileImage || imageReceived
                          ? "button__red profile__delete--button"
                          : "dropzone_btn-none"
                      }
                      handleClick={deleteProfile}
                    />
                  </div>
                )}
              </figure>
              {imageFlag ? (
                <input
                  type="file"
                  className="user__profile--none"
                  ref={fileInputRef}
                  accept=".jpg,.png,.webp"
                  onChange={handleProfileUpdate}
                />
              ) : (
                <></>
              )}

              <Button
                text={"Upload new photo"}
                handleClick={handleButtonClick}
                isDisabled={imageFlag ? false : true}
                className={
                  !imageFlag
                    ? "user__profile--file-disabled user__profile--remove-margin"
                    : "button__blue upload__btn"
                }
              />

              <span>
                Max file size: 5MB <br /> Larger image will be resized
                automatically. <br />
                Supported File Type: JPG, PNG,WEBP
              </span>
              <p>
                <span style={{ fontSize: "0.875rem" }}>Created on: </span>{" "}
                {<DateComponent date={date} /> || "24th September 2019"}
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onEmployeeEditSubmit)}
            className="group__form profile__form"
          >
            <div className="form__input--section">
              <Label sup={"*"} text="Name" />
              <InputField
                name="username"
                register={register}
                value={Model.Name.pattern.value}
                message={Model.Name.pattern.message}
                required={Model.Name.required}
                errors={errors}
                defaultValue={employeeData.name}
                type={Model.Name.type}
                placeholder={employeeData.name}
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
                    <input
                      type="radio"
                      name="jobType"
                      value="Permanent"
                      onChange={handleRadioChange}
                      checked={selectedJobType === "Permanent"}
                    />
                  </div>
                  <Label
                    text="Permanent"
                    className={
                      selectedJobType === "Permanent"
                        ? "radio__label--checked"
                        : ""
                    }
                  />
                </div>
                <div className="radio__label">
                  <div className="checkbox__input--label">
                    <input
                      type="radio"
                      name="jobType"
                      value="Temporary"
                      onChange={handleRadioChange}
                      checked={selectedJobType === "Temporary"}
                    />
                  </div>
                  <Label
                    text="Temporary"
                    className={
                      selectedJobType === "Temporary"
                        ? "radio__label--checked"
                        : ""
                    }
                  />
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
                defaultValue={employeeData.designation}
                type={Model.Designation.type}
                placeholder={employeeData.designation}
                minLength={Model.Designation.minLength.value}
                minMessage={Model.Designation.minLength.message}
                maxLength={Model.Designation.maxLength.value}
                maxMessage={Model.Designation.maxLength.message}
                isDisabled={receivedState}
              />
            </div>
            <div className="form__input--section">
              <Label sup={"*"} text="Department" />
              <SelectInputDepartment
                isDisabled={receivedState}
                register={register}
                defaultValue={employeeData.department}
                name="department"
                isRequired={true}
                errors={errors}
              />
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
                defaultValue={employeeData.email}
                type={Model.Email.type}
                placeholder={employeeData.email}
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
                defaultValue={employeeData.phone_number}
                placeholder={employeeData.phone_number}
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
                type="submit"
                text="Save Changes"
                className={receivedState ? "profile-btn-none" : "button__blue"}
              />
              <Link to="/employees" className="link">
                <Button
                  className={receivedState ? "profile-btn-none" : "button__red"}
                  text="Cancel"
                  isDisabled={receivedState}
                />
              </Link>
            </div>
          </form>
        </div>
      </div>

      <CustomToastContainer />
    </section>
  );
};

export default EditProfile;
