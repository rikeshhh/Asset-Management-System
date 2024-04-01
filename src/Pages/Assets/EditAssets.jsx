import React, { useState } from "react";
import { GrStatusGoodSmall } from "react-icons/gr";
import { InputField } from "../../Component/Input/InputField";
import { useForm } from "react-hook-form";
import { Label } from "../../Component/Label/Label";
import Model from "../../Component/Model/Model";
import Button from "../../Component/Button/Button";
import DropzoneArea from "../../Component/Dropzone/DropzoneArea";
import { Link, useNavigate } from "react-router-dom";
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
 * EditAssets component for editing asset details.
 *
 * @component
 * @returns {JSX.Element} JSX representation of the EditAssets component
 */
const EditAssets = () => {
  const formMethod = useForm();
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = formMethod;

  const location = useLocation();
  const receivedState = location.state;
  const assetsData = receivedState.tableData;
  const navigate = useNavigate();
  const EditAssets = useMutation({
    mutationFn: (assetsInfo) => {
      return assetsEdit(assetsInfo.data, assetsData.id, assetsInfo.editImage);
    },
    onSuccess: () => {
      notifySuccess("Assets has been updated");
      queryClient.invalidateQueries("AssetsData");
      setTimeout(() => {
        navigate("/assets/hardware");
      }, 1000);
    },
    onError: (error) => {
      notifyError("Something went wrong");
    },
  });
  const submitData = (data) => {
    console.log(data);
    const editAssetsData = {
      data: data,
      editImage: data.assets_image
        ? assetsData.image_name
        : assetsData.image_name,
    };

    EditAssets.mutate(editAssetsData);
  };
  const [isActive, setIsActive] = useState(assetsData.status === "active");

  const toggleSwitch = () => {
    setIsActive((prev) => !prev);
  };
  const [categoryName, setCategoryName] = useState();
  console.log("ddd");
  console.log(assetsData);
  return (
    <section className="assets__add">
      <div className="">
        <div className="content-radius">
          <div className="content__header form--header">
            <h2>Edit Assets Detail</h2>
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
                />
              </div>
              <div className="assets__form--input">
                <Label text="Asset Type" sup={"*"} />
                <SelectAssetType
                  defaultValue={assetsData.assets_type}
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
                  defaultValue={assetsData.category}
                  register={register}
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
                  isDisabled={!categoryName || categoryName.trim() === ""}
                  errors={errors}
                />{" "}
              </div>
            </div>
            <div className="form--content__left">
              <div className="assets__form--input">
                <Label text="Brand / Company" />
                <InputField
                  name="brandCompany"
                  register={register}
                  // required="Please enter Brand/Company "
                  defaultValue={assetsData.brand}
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
                  defaultValue={assetsData.location}
                  name="location"
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="assets__form--input">
                <Label text="Assigned to" sup={"*"} />
                <SelectInputUser
                  name="assigned_to"
                  register={register}
                  defaultValue={assetsData.assigned_to}
                  errors={errors}
                />
              </div>
              <div className="assets__form--input">
                <Label text="Status" />
                <label className={`switch ${isActive ? "active" : "inactive"}`}>
                  <input
                    {...register("status")}
                    type="checkbox"
                    defaultChecked={isActive}
                    onChange={toggleSwitch}
                  />
                  <span className="slider"></span>
                  <span className="status">
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </label>
              </div>
              <div className="assets__form--input">
                <Label text="Upload asset image" />

                <DropzoneArea
                  setValue={setValue}
                  name="assets_image"
                  defaultValue={assetsData?.image_name}
                />
              </div>
              <div className="assets__form--btn">
                <Button
                  type="submit"
                  text="Save Changes"
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
    </section>
  );
};

export default EditAssets;
