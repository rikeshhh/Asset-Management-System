import { set, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import SelectInputCategory from "../Categories/SelectInputCategory";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { repairReplaceAdd } from "./RepairApiSlice";
import { notifyError, notifySuccess } from "../../Component/Toast/Toast";
import { queryClient } from "../../Component/Query/Query";

/**
 * Functional component for adding a new employee profile.
 * @returns {JSX.Element} JSX element representing the AddProfile component.
 */
const ViewRepair = () => {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  const receivedState = true;

  const navigate = useNavigate();
  const { state: tableData } = useLocation();
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

  const AddRepairReplace = useMutation({
    mutationFn: (repairReplaceData) => {
      return repairReplaceAdd(
        repairReplaceData.data,
        repairReplaceData.selectedType
      );
    },
    onSuccess: () => {
      notifySuccess("Repair/Replace has been added");
      setTimeout(() => {
        navigate("/repair");
        queryClient.invalidateQueries("RepairTableData", "ReplaceTableData");
      }, 1000);
    },
    onError: (error) => {
      notifyError(error.response.data.message.message.repairreplace);
    },
  });

  const handleRadioChange = (e) => {
    setSelectedType(tableData.Type);
  };
  /**
   * Handles the submission of the repair and replace form.
   * @param {Object} data - Form data submitted.
   */

  const onRepairAddSubmit = (deviceData) => {
    const repairData = {
      selectedType: selectedType,
      data: deviceData,
    };
    AddRepairReplace.mutate(repairData);
  };
  const [selectedType, setSelectedType] = useState(tableData.Type);
  console.log(tableData.product_image);
  return (
    <section className="content-wrapper">
      <div className="user__profile content-radius">
        <div className="content__header form--header">
          <h2>Send for Repair/Replace</h2>
          <span>Fill this form for repair or replace of your device</span>
        </div>
        <div className="user__profile--body">
          <div className="user__profile--left">
            <DropzoneArea
              name="product_image"
              defaultValue={tableData.product_image}
              setValue={setValue}
              isDisabled={true}
            />
          </div>

          <form
            onSubmit={handleSubmit(onRepairAddSubmit)}
            className="group__form profile__form"
          >
            <div className="form__input--section">
              <Label sup={"*"} text="Device Owner" />
              <InputField
                name="Assigned_to"
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
                defaultValue={tableData.Assigned_to.name}
              />
            </div>

            <div className="form__input--section">
              <Label text="Product Code" sup={"*"} />
              <InputField
                name="Product_Code"
                register={register}
                // value={Model.ProductCode.pattern.value}
                // message={Model.ProductCode.pattern.message}
                required={Model.ProductCode.required}
                errors={errors}
                type={Model.ProductCode.type}
                placeholder={Model.ProductCode.placeholder}
                // minLength={Model.ProductCode.minLength.value}
                // minMessage={Model.ProductCode.minLength.message}
                // maxLength={Model.ProductCode.maxLength.value}
                // maxMessage={Model.ProductCode.maxLength.message}
                defaultValue={tableData.Product_Code.id}
                isDisabled={receivedState}
              />
            </div>

            <div className="form__input--section">
              <Label text="Product Name" sup={"*"} />
              <InputField
                name="Product_Name"
                register={register}
                value={Model.ProductName.pattern.value}
                message={Model.ProductName.pattern.message}
                required={Model.ProductName.required}
                errors={errors}
                type={Model.ProductName.type}
                placeholder={Model.ProductName.placeholder}
                maxLength={Model.ProductName.maxLength.value}
                maxMessage={Model.ProductName.maxLength.message}
                isDisabled={receivedState}
                defaultValue={tableData.Product_Code.name}
              />
            </div>
            <div className="form__input--section">
              <Label text="Category" sup={"*"} />
              <SelectInputCategory
                name="Category"
                register={register}
                defaultValue={tableData.Category}
                isDisabled={receivedState}
                errors={errors}
              />
            </div>

            <div className="form__input--section">
              <Label text="Repair or Replace?" sup={"*"} />
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <div className="radio__label">
                  <div className="checkbox__input--label">
                    <input
                      type="radio"
                      name="Repair"
                      value="Repair"
                      checked={selectedType === "Repair"}
                      disabled={receivedState}
                    />
                  </div>
                  <Label text="Repair" />
                </div>
                <div className="radio__label">
                  <div className="checkbox__input--label">
                    <input
                      type="radio"
                      name="Replace"
                      value="Replace"
                      checked={selectedType === "Replace"}
                      disabled={receivedState}
                    />
                  </div>
                  <Label text="Replace" />
                </div>
              </div>
            </div>

            <div className="form__input--section">
              <Label text="Reason for Repair/Replace" sup={"*"} />
              <InputField
                name="reason"
                register={register}
                value={Model.location.pattern.value}
                message={Model.location.pattern.message}
                required={"Reason for Repair/Replace is required"}
                errors={errors}
                type={Model.location.type}
                placeholder={"Enter what happened to this device"}
                maxLength={Model.location.maxLength.value}
                maxMessage={Model.location.maxLength.message}
                defaultValue={tableData.reason}
                isDisabled={receivedState}
              />
            </div>

            <div className={"user__profile--btn-right user__profile--btn"}>
              <button disabled className="button__style button_grey">
                Send for repair
              </button>
              <Link to="/repair" className="link">
                <Button className={"button__red"} text="Cancel" />
              </Link>
            </div>
          </form>
        </div>
      </div>
      <CustomToastContainer />
    </section>
  );
};

export default ViewRepair;
