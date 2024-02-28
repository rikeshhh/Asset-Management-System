import React, { useState } from "react";
import { GrStatusGoodSmall } from "react-icons/gr";
import { InputField } from "../../Component/Input/InputField";
import { useForm } from "react-hook-form";
import { Label } from "../../Component/Label/Label";
import Model from "../../Component/Model/Model";
import { SelectInput } from "../../Component/Input/SelectInput";
import Button from "../../Component/Button/Button";
import DropzoneArea from "../../Component/Dropzone/DropzoneArea";
import { Link } from "react-router-dom";
import SelectInputLocation from "../Location/SelectInputLocation";
import { useMutation } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "../../Component/Toast/Toast";
import { queryClient } from "../../Component/Query/Query";
import { assetsAdd, assetsEdit } from "./AssetsApiSlice";
const AssetsForm = ({
  formHeading,
  formType,
  buttonText,
  buttonCancelText,
  assetsData,
}) => {
  const formMethod = useForm();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = formMethod;
  const [isActive, setIsActive] = useState(false);

  const toggleSwitch = () => {
    setIsActive((prev) => !prev);
  };

  const [options, setOptions] = useState([
    "Frontend",
    "Backend",
    "UI UX",
    "QA",
    "Project Manager",
    "DevOps",
  ]);
  const AddAssets = useMutation({
    mutationFn: (assetsData) => {
      return assetsAdd(assetsData);
    },
    onSuccess: () => {
      notifySuccess("Assets has been added successfully");
      queryClient.invalidateQueries("AssetsData");
    },
    onError: (error) => {
      notifyError(error.message);
    },
  });
  const submitData = (data) => {
    console.log(data);
    AddAssets.mutate(data);
  };
  return (
    <div className="content-wrapper">
      <div className="content-radius">
        <div className="content__header form--header">
          <h2>Enter an Asset</h2>
          <p>
            <span>Assets /</span> <GrStatusGoodSmall className="form__circle" />{" "}
            New Assets
          </p>
        </div>
        <form
          onSubmit={handleSubmit(submitData)}
          className="assets__form--content"
        >
          <div className="form--content__right">
            <div className="assets__form--input">
              <Label text="ID / Product Code" sup={"*"} />
              <InputField
                name="productID"
                register={register}
                required={Model.ProductCode.required}
                value={Model.ProductCode.pattern.value}
                message={Model.ProductCode.pattern.message}
                errors={errors}
                type={Model.ProductCode.type}
                placeholder={Model.ProductCode.placeholder}
                minLength={Model.ProductCode.value}
                minMessage={Model.ProductCode.minLength.message}
                maxLength={Model.ProductCode.maxLength.value}
                maxMessage={Model.ProductCode.maxLength.message}
              />
            </div>

            <div className="assets__form--input">
              <Label text="Name / Title" sup={"*"} />
              <InputField
                name="productName"
                register={register}
                required={Model.ProductName.required}
                value={Model.ProductName.pattern.value}
                message={Model.ProductName.pattern.message}
                errors={errors}
                type={Model.ProductName.type}
                placeholder={Model.ProductName.placeholder}
                minLength={Model.ProductName.minLength.value}
                minMessage={Model.ProductName.minLength.message}
                maxLength={Model.ProductName.maxLength.value}
                maxMessage={Model.ProductName.maxLength.message}
              />
            </div>
            <div className="assets__form--input">
              <Label text="Asset Type" sup={"*"} />
              <SelectInput  name="assets_type" />
            </div>
            <div className="assets__form--input">
              <Label text="Category" sup={"*"} />
              <SelectInput options={options} />
            </div>
            <div className="assets__form--input">
              <Label text="Sub-Category" />
              <SelectInput options={options} />
            </div>
          </div>
          <div className="form--content__left">
            <div className="assets__form--input">
              <Label text="Brand / Company" />
              <InputField
                name="brandCompany"
                register={register}
                required="Please enter Brand/Company "
                value={Model.Group.pattern.value}
                message={Model.Group.pattern.message}
                errors={errors}
                type={Model.Group.type}
                placeholder="Enter the brand / company of the assets"
                minLength={Model.Group.minLength.value}
                minMessage={Model.Group.minLength.message}
                maxLength={Model.Group.maxLength.value}
                maxMessage={Model.Group.maxLength.message}
              />
            </div>
            <div className="assets__form--input">
              <Label text="Location" sup={"*"} />
              <SelectInputLocation  />
            </div>
            <div className="assets__form--input">
              <Label text="Assigned to" sup={"*"} />
              <SelectInput  />
            </div>
            <div className="assets__form--input assets__switch">
              <Label text="Status" />
              <label className={`switch ${isActive ? "active" : "inactive"}`}>
                <input
                  type="checkbox"
                  checked={isActive}
                  onClick={toggleSwitch}
                  onChange={() => {}}
                />
                <span className="slider"></span>
                <span className="status">
                  {isActive ? "Active" : "Inactive"}
                </span>
              </label>
            </div>
            <div className="assets__form--input">
              <DropzoneArea />
            </div>
            <div className="assets__form--btn">
              <Button
                type="submit"
                text="Add an Asset"
                className={"button__blue"}
              />
              <Link to="/assets" className="link">
                <Button text="Cancel" className={"button__red"} />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetsForm;
