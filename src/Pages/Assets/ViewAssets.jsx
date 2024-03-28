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
import { assetsEdit } from "./AssetsApiSlice";
import { useLocation } from "react-router-dom";
import SelectSubCat from "../Categories/SelectSubCat";
import SelectInputUser from "./SelectInputUser";
import SelectInputCategory from "../Categories/SelectInputCategory";
import CustomToastContainer from "../../Component/Toast/ToastContainer";
import { SelectAssetType } from "./SelectAssetType";
import ImagePath from "../../Component/Images/ImagePath";
import SelectAssetCategory from "./SelectAssetCategory";
/**
 * View component for displaying asset details.
 * @returns {JSX.Element} ViewAssets component.
 */
const ViewAssets = () => {
  const formMethod = useForm();
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = formMethod;
  const [imageFlag, setImageFlag] = useState(false);
  // Extracting location and received state from the React Router's useLocation hook
  const location = useLocation();
  const receivedState = location.state;

  // Extracting assets data from the received state
  const assetsData = receivedState.tableData;

  // Defining a mutation function to edit assets data
  const EditAssets = useMutation({
    mutationFn: (assetsInfo) => {
      // Call the assetsEdit function with the provided assets info
      return assetsEdit(assetsInfo);
    },
    // Function to execute on successful mutation
    onSuccess: () => {
      // Notify the user about successful asset update
      notifySuccess("Assets has been updated");

      // Invalidate the "AssetsData" query cache to reflect the changes
      queryClient.invalidateQueries("AssetsData");
    },
    // Function to handle errors during mutation
    onError: (error) => {
      // Notify the user about the error
      notifyError(error.message);
    },
  });

  // Define the initial state of the isActive switch based on the status of the assets data
  const [isActive, setIsActive] = useState(assetsData.status === "active");

  // Function to toggle the isActive state
  const toggleSwitch = () => {
    setIsActive((prev) => !prev);
  };

  // Function to submit the edited data
  const submitData = (data) => {
    // Trigger the mutation with the edited data
    EditAssets.mutate(data);
  };

  // Define state to hold the category name
  const [categoryName, setCategoryName] = useState();
  console.log(assetsData.image_name);
  return (
    <section className="assets__add">
      <div className="content-wrapper">
        <div className="content-radius">
          <div className="content__header form--header">
            {assetsData.assets_type === "hardware" ? (
              <h2>ITJ-HW-{assetsData.id}</h2>
            ) : (
              <h2>ITJ-SW-{assetsData.id}</h2>
            )}
            <p>
              <span>Assets /</span>{" "}
              <GrStatusGoodSmall className="form__circle" /> Assets Detail
            </p>
          </div>
          <form
            onSubmit={handleSubmit(submitData)}
            className="assets__form--content"
          >
            <div className="form--content__right">
              {/* <div className="assets__form--input">
                <Label text="ID / Product Code" sup={"*"} />
                <InputField
                  name="productID"
                  defaultValue={assetsData.id}
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
              </div> */}

              <div className="assets__form--input">
                <Label text="Name / Title" sup={"*"} />
                <InputField
                  name="productName"
                  defaultValue={assetsData.name}
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
                  isDisabled={true}
                />
              </div>
              <div className="assets__form--input">
                <Label text="Asset Type" sup={"*"} />
                <SelectAssetType
                  defaultValue={assetsData.assets_type}
                  name="assets_type"
                  register={register}
                  isDisabled={true}
                  errors={errors}
                />
              </div>
              <div className="assets__form--input">
                <Label text="Category" sup={"*"} />
                <SelectAssetCategory
                  setCategoryName={setCategoryName}
                  name="category"
                  defaultValue={assetsData.category}
                  register={register}
                  isDisabled={true}
                  errors={errors}
                />
              </div>
              <div className="assets__form--input">
                <Label text="Sub-Category" />
                <SelectSubCat
                  categoryName={categoryName}
                  defaultValue={assetsData.subcategory}
                  name="sub_category"
                  register={register}
                  isDisabled={true}
                />{" "}
              </div>
            </div>
            <div className="form--content__left">
              <div className="assets__form--input">
                <Label text="Brand / Company" />
                <InputField
                  name="brandCompany"
                  register={register}
                  required="Please enter Brand/Company "
                  defaultValue={assetsData.brand}
                  value={Model.Group.pattern.value}
                  message={Model.Group.pattern.message}
                  errors={errors}
                  type={Model.Group.type}
                  placeholder="Enter the brand / company of the assets"
                  minLength={Model.Group.minLength.value}
                  minMessage={Model.Group.minLength.message}
                  maxLength={Model.Group.maxLength.value}
                  maxMessage={Model.Group.maxLength.message}
                  isDisabled={true}
                />
              </div>
              <div className="assets__form--input">
                <Label text="Location" sup={"*"} />
                <SelectInputLocation
                  defaultValue={assetsData.location}
                  name="location"
                  register={register}
                  isDisabled={true}
                  errors={errors}
                />
              </div>
              <div className="assets__form--input">
                <Label text="Assigned to" sup={"*"} />
                <SelectInputUser
                  name="assigned_to"
                  register={register}
                  defaultValue={assetsData.assigned_to}
                  isDisabled={true}
                  errors={errors}
                />
              </div>
              <div className="assets__form--input">
                <Label text="Status" />
                <label className={`switch ${isActive ? "active" : "inactive"}`}>
                  <input
                    type="checkbox"
                    defaultChecked={isActive}
                    // onChange={toggleSwitch}
                    disabled={true}
                  />
                  <span className="slider"></span>
                  <span className="status">{assetsData.status}</span>
                </label>
              </div>
              <div className="assets__form--input">
                <Label text="Upload asset image" />

                <figure className="image__display">
                  <ImagePath
                    file={assetsData.image_name}
                    setImageFlag={setImageFlag}
                  />
                </figure>
              </div>
              <div className="assets__form--btn">
                <Link to="/assets/hardware" className="link">
                  <Button text="Close" className={"button__red"} />
                </Link>
              </div>
            </div>
          </form>
          <CustomToastContainer />
        </div>
      </div>
    </section>
  );
};

export default ViewAssets;
