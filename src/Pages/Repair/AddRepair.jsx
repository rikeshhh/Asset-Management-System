import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GoTrash } from "react-icons/go";
// import { useMutation } from "@tanstack/react-query";
// import { queryClient } from "../../Component/Query/Query";
// import { notifyError, notifySuccess } from "../../Component/Toast/Toast";
import CustomToastContainer from "../../Component/Toast/ToastContainer";
import SelectInputDepartment from "../Departments/SelectInputDepartment";
import { Label } from "../../Component/Label/Label";
import { InputField } from "../../Component/Input/InputField";
import Button from "../../Component/Button/Button";
import Model from "../../Component/Model/Model";
import DropzoneArea from "../../Component/Dropzone/DropzoneArea";

/**
 * Functional component for adding a new employee profile.
 * @returns {JSX.Element} JSX element representing the AddProfile component.
 */
const AddRepair = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const receivedState = false;
  // const navigate = useNavigate();

  // const fileInputRef = useRef(null);

  /**
   * Handles the update of the profile picture.
   * @param {Object} e - The event object.
   */

  /**
   * Deletes the current profile picture.
   */
  // const deleteProfile = () => {
  //   setProfileImage(profileCover);
  // };

  /**
   * Handles the click event of the upload button.
   */

  // const handleButtonClick = () => {
  //   fileInputRef.current.click();
  // };

  // const AddEmployeeProfile = useMutation({
  //   mutationFn: (data) => {
  //     return employeeProfile(data);
  //   },
  //   onSuccess: () => {
  //     notifySuccess("Employee has been added");
  //     setTimeout(() => {
  //       navigate("/employees");
  //       queryClient.invalidateQueries("EmployeeData");
  //     }, 1000);
  //   },
  //   onError: (error) => {
  //     if (error.request.status === 409) {
  //       notifyError("Error adding employee");
  //     }
  //   },
  // });

  /**
   * Handles the submission of the employee profile form.
   * @param {Object} data - Form data submitted.
   */
  // const onEmployeeAddSubmit = (data) => {
  //   AddEmployeeProfile.mutate(data);
  // };

  const onRepairAddSubmit = () => {};
  return (
    <section className="content-wrapper">
      <div className="user__profile content-radius">
        <div className="content__header form--header">
          <h2>Send for Repair/Replace</h2>
          <span>Fill this form for repair or replace of your device</span>
        </div>
        <div className="user__profile--body">
          <div className="user__profile--left">
            <DropzoneArea />
          </div>

          <form
            onSubmit={handleSubmit(onRepairAddSubmit)}
            className="group__form profile__form"
          >
            <div className="form__input--section">
              <Label sup={"*"} text="Device Owner" />
              <InputField
                name="deviceOwner"
                register={register}
                value={Model.Name.pattern.value}
                message={Model.Name.pattern.message}
                required={Model.Name.required}
                errors={errors}
                type={Model.Name.type}
                placeholder="Enter your name"
                minLength={Model.Name.minLength.value}
                minMessage={Model.Name.minLength.message}
                maxLength={Model.Name.maxLength.value}
                maxMessage={Model.Name.maxLength.message}
                isDisabled={receivedState}
              />
            </div>

            <div className="form__input--section">
              <Label text="Product Code" sup={"*"} />
              <InputField
                name="productCode"
                register={register}
                value={Model.ProductCode.pattern.value}
                message={Model.ProductCode.pattern.message}
                required={Model.ProductCode.required}
                errors={errors}
                type={Model.ProductCode.type}
                placeholder={Model.ProductCode.placeholder}
                minLength={Model.ProductCode.minLength.value}
                minMessage={Model.ProductCode.minLength.message}
                maxLength={Model.ProductCode.maxLength.value}
                maxMessage={Model.ProductCode.maxLength.message}
                isDisabled={receivedState}
              />
            </div>

            <div className="form__input--section">
              <Label text="Product Name" sup={"*"} />
              <InputField
                name="productName"
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
              <Label text="Category" sup={"*"} />
              <SelectInputDepartment isDisabled={receivedState} />
            </div>

            <div className="form__input--section">
              <Label text="Repair or Replace?" sup={"*"} />
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
                  <Label text="Repair" />
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
                  <Label text="Replace" />
                </div>
              </div>
            </div>

            <div className="form__input--section">
              <Label text="Reason for Repair/Replace" sup={"*"} />
              <InputField
                name="productName"
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

            <div
              className={
                receivedState
                  ? "user__profile--btn-right"
                  : "user__profile--btn"
              }
            >
              <Button
                value="submit"
                text="Send for Repair"
                className={"button__blue"}
              />
              <Link to="/repair" className="link">
                <Button
                  className={"button__red"}
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

export default AddRepair;