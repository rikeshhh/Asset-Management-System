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
import ImagePath from "../../Component/Images/ImagePath";

/**
 * Functional component for adding a new employee profile.
 * @returns {JSX.Element} JSX element representing the AddProfile component.
 */
const ViewRepair = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  const [imageFlag, setImageFlag] = useState(false);
  const receivedState = true;
  const { state: tableData } = useLocation();

  /**
   * Handles the submission of the repair and replace form.
   * @param {Object} data - Form data submitted.
   */
  const [selectedType, setSelectedType] = useState(tableData.Type);
  return (
    <section className="content-wrapper">
      <div className="user__profile content-radius">
        <div className="content__header form--header">
          <h2>Send for Repair/Replace</h2>
          <span>Fill this form for repair or replace of your device</span>
        </div>
        <div className="user__profile--body">
          <div className="user__repair--left ">
            <Label text="View current asset image" />
            <ImagePath
              file={tableData.product_image}
              setImageFlag={setImageFlag}
            />
          </div>

          <form className="group__form profile__form">
            <div className="form__input--section">
              <Label sup={"*"} text="Device Owner" />
              <InputField
                name="Assigned_to"
                register={register}
                errors={errors}
                placeholder="Enter your name"
                isDisabled={receivedState}
                defaultValue={tableData.Assigned_to.name}
              />
            </div>

            <div className="form__input--section">
              <Label text="Product Code" sup={"*"} />
              <InputField
                name="Product_Code"
                register={register}
                errors={errors}
                defaultValue={tableData.Product_Code.id}
                isDisabled={receivedState}
              />
            </div>

            <div className="form__input--section">
              <Label text="Product Name" sup={"*"} />
              <InputField
                name="Product_Name"
                register={register}
                errors={errors}
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
                errors={errors}
                placeholder={"Enter what happened to this device"}
                defaultValue={tableData.reason}
                isDisabled={receivedState}
              />
            </div>

            <div className={"user__profile--btn-right user__profile--btn"}>
              <Link to="/repair" className="link">
                <Button className={"button__red"} text="Close" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ViewRepair;
