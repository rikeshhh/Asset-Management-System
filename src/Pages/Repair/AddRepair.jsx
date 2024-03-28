import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CustomToastContainer from "../../Component/Toast/ToastContainer";
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
import SelectUserRepair from "./SelectUserRepair";

/**
 * Functional component for adding a new employee profile.
 * @returns {JSX.Element} JSX element representing the AddProfile component.
 */
const AddRepair = () => {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  const receivedState = false;
  const [selectedType, setSelectedType] = useState("Repair");

  const navigate = useNavigate();

  /**
   * Handles the update of the profile picture.
   * @param {Object} e - The event object.
   */

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
    setSelectedType(e.target.value);
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
  return (
    <section className="content-wrapper">
      <div className="user__profile content-radius">
        <div className="content__header form--header">
          <h2>Send for Repair/Replace</h2>
          <span>Fill this form for repair or replace of your device</span>
        </div>
        <div className="user__profile--body">
          <div className="user__profile--left">
            <DropzoneArea name="product_image" setValue={setValue} />
          </div>

          <form
            onSubmit={handleSubmit(onRepairAddSubmit)}
            className="group__form profile__form"
          >
            <div className="form__input--section">
              <Label sup={"*"} text="Device Owner" />
              <SelectUserRepair
                name="Assigned_to"
                register={register}
                required={true}
                errors={errors}
                isDisabled={receivedState}
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
              />
            </div>
            <div className="form__input--section">
              <Label text="Category" sup={"*"} />
              <SelectInputCategory
                name="Category"
                register={register}
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
                      onChange={handleRadioChange}
                      checked={selectedType === "Repair"}
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
                      onChange={handleRadioChange}
                      checked={selectedType === "Replace"}
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
                value={Model.reason.pattern.value}
                message={Model.reason.pattern.message}
                required={"Reason for Repair/Replace is required"}
                errors={errors}
                type={Model.reason.type}
                placeholder={"Enter what happened to this device"}
                maxLength={Model.reason.maxLength.value}
                maxMessage={Model.reason.maxLength.message}
                isDisabled={receivedState}
              />
            </div>

            <div className={"user__profile--btn-right user__profile--btn"}>
              <Button text="Send for Repair" className={"button__blue"} />
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
        <CustomToastContainer />
      </div>
    </section>
  );
};

export default AddRepair;
