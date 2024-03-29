import React, { useState } from "react";
import { GrStatusGoodSmall } from "react-icons/gr";
import { InputField } from "../../Component/Input/InputField";
import { useForm } from "react-hook-form";
import { Label } from "../../Component/Label/Label";
import Model from "../../Component/Model/Model";
import { SelectInput } from "../../Component/Input/SelectInput";
import Button from "../../Component/Button/Button";
import DropzoneArea from "../../Component/Dropzone/DropzoneArea";
import { Link, useNavigate } from "react-router-dom";
import SelectInputLocation from "../Location/SelectInputLocation";
import { useMutation } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "../../Component/Toast/Toast";
import { queryClient } from "../../Component/Query/Query";
import { assetsAdd, assetsEdit } from "./AssetsApiSlice";
import SelectInputCategory from "../Categories/SelectInputCategory";
import SelectSubCat from "../Categories/SelectSubCat";
import SelectInputUser from "./SelectInputUser";
import CustomToastContainer from "../../Component/Toast/ToastContainer";
import { SelectAssetType } from "./SelectAssetType";
import SelectAssetCategory from "./SelectAssetCategory";
const AssetsForm = () => {
  const formMethod = useForm();
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = formMethod;
  // State variable to manage the status of the checkbox
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  // Function to toggle the status of the checkbox
  const toggleSwitch = () => {
    setIsActive((prevState) => !prevState);
    console.log("After toggling:", isActive);
  };
  // Define state to hold the options for asset categories
  const [options, setOptions] = useState([
    "Frontend",
    "Backend",
    "UI UX",
    "QA",
    "Project Manager",
    "DevOps",
  ]);

  // Define a mutation function to add new assets
  const AddAssets = useMutation({
    mutationFn: (assetsData) => {
      // Call the assetsAdd function with the provided assets data
      return assetsAdd(assetsData);
    },
    // Function to execute on successful mutation
    onSuccess: () => {
      // Notify the user about successful asset addition
      notifySuccess("Assets has been added ");

      // Invalidate the "AssetsData" query cache to reflect the changes
      queryClient.invalidateQueries("AssetsData");

      // Redirect the user to the assets page after a delay
      setTimeout(() => {
        navigate("/assets/hardware");
      }, 1000);
    },
    // Function to handle errors during mutation
    onError: (error) => {
      // Check if the error response contains a message and notify the user accordingly
      notifyError("Fill every input field");
    },
  });

  // Function to submit the data for adding new assets
  const submitData = (data) => {
    AddAssets.mutate(data);
  };

  // Define state to hold the category name
  const [categoryName, setCategoryName] = useState();

  return (
    <div className="">
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
              <SelectAssetType
                name="assets_type"
                register={register}
                errors={errors}
              />
            </div>
            <div className="assets__form--input">
              <Label text="Category" sup={"*"} />
              <SelectAssetCategory
                setCategoryName={setCategoryName}
                name="category"
                register={register}
                errors={errors}
              />
            </div>
            <div className="assets__form--input">
              <Label text="Sub-Category" />
              <SelectSubCat
                categoryName={categoryName}
                name="sub_category"
                register={register}
                isDisabled={!categoryName || categoryName.trim() === ""}
              />
            </div>
          </div>
          <div className="form--content__left">
            <div className="assets__form--input">
              <Label text="Brand / Company" />
              <InputField
                name="brandCompany"
                register={register}
                value={Model.brandCompanyName.pattern.value}
                message={Model.brandCompanyName.pattern.message}
                errors={errors}
                type={Model.brandCompanyName.type}
                placeholder="Enter the brand / company of the assets"
                minLength={Model.brandCompanyName.minLength.value}
                minMessage={Model.brandCompanyName.minLength.message}
                maxLength={Model.brandCompanyName.maxLength.value}
                maxMessage={Model.brandCompanyName.maxLength.message}
              />
            </div>
            <div className="assets__form--input">
              <Label text="Location" sup={"*"} />
              <SelectInputLocation
                register={register}
                name="location"
                errors={errors}
              />
            </div>
            <div className="assets__form--input">
              <Label text="Assigned to" sup={"*"} />
              <SelectInputUser
                name="assigned_to"
                register={register}
                errors={errors}
              />
            </div>
            <div className="assets__form--input ">
              <Label text="Status" />
              <label className={`switch ${isActive ? "active" : "inactive"}`}>
                <input
                  {...register("status")}
                  type="checkbox"
                  // Registering the checkbox with react-hook-form
                  checked={isActive}
                  onChange={toggleSwitch} // Toggle the checkbox state
                />
                <span className="slider"></span>
                <span className="status">
                  {isActive ? "Active" : "Inactive"}
                </span>
              </label>
            </div>

            <div className="assets__form--input">
              <Label text="Upload asset image" />
              <DropzoneArea setValue={setValue} name="assets_image" />
            </div>
            <div className="assets__form--btn">
              <Button
                type="submit"
                text="Add an Asset"
                className={"button__blue"}
              />
              <Link to="/assets/hardware" className="link">
                <Button text="Cancel" className={"button__red"} />
              </Link>
            </div>
          </div>
        </form>
        <CustomToastContainer />
      </div>
    </div>
  );
};

export default AssetsForm;
