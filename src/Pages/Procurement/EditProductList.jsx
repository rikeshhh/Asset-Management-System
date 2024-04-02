import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../Component/Button/Button";
import { CiEdit } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import SelectCategoryProc from "./SelectCategoryProc";
import { InputFieldProc } from "../../Component/Input/InputFieldProc";
import Model from "../../Component/Model/Model";

const EditProductList = ({
  procurement,
  index,
  isEditable,
  setIsEditable,
  setSelectedIndex,
  selectedIndex,
  newProcurement,
  setNewProcurement,
  handleDeleteProcurementLine,
}) => {
  const [categoryName, setCategoryName] = useState(procurement.category);

  const {
    register,
    formState: { errors },
    reset,
    getValues,
    trigger,
    clearErrors,
  } = useForm();
  const handleProcurementTableAdd = async (index) => {
    const isValid = await trigger();

    if (isValid) {
      const values = getValues();
      // Update the item at the specified index with the new values
      const updatedItem = {
        product_name: values.product_name,
        category: categoryName,
        brand: values.brand,
        estimated_price: values.estimated_price,
        link: values.link,
        product_id: procurement.product_id,
      };

      // Update the newProcurement state with the updated item
      const updatedProcurement = [...newProcurement];
      updatedProcurement[index] = updatedItem;
      setNewProcurement(updatedProcurement);

      // Reset state and form after editing
      setIsEditable(false);
      setSelectedIndex("");
      reset();
    } else {
      return;
    }
  };

  const handleProcurementTableEdit = (index) => {
    setIsEditable(true);
    setSelectedIndex(index);
  };

  const handleCancelProcurementLine = () => {
    setSelectedIndex("");
    setIsEditable(false);
    reset();
  };
  return (
    <tr className={`procurement__tablerow`}>
      <td data-cell="Product Name">
        <InputFieldProc
          name="product_name"
          register={register}
          errors={errors}
          clearErrors={clearErrors}
          defaultValue={procurement.product_name}
          required={"Please enter a product name"}
          value={Model.ProductName.pattern.value}
          message={"Includes letters, numbers, and periods."}
          minLength={Model.ProductName.minLength.value}
          minMessage={Model.ProductName.minLength.message}
          maxLength={Model.ProductName.maxLength.value}
          maxMessage={Model.ProductName.maxLength.message}
          placeholder={"Enter Product Name"}
          isEditable={selectedIndex === index}
          className={`${
            selectedIndex === index ? "input__editable" : "input__notEditable"
          }`}
        />
      </td>
      <td data-cell="Category">
        <SelectCategoryProc
          name="category_id"
          register={register}
          errors={errors}
          required={"Please select category"}
          setCategoryName={setCategoryName}
          defaultValue={procurement.category}
          isEditable={selectedIndex === index}
          clearErrors={clearErrors}
          className={` ${
            selectedIndex === index
              ? "input-enabled input__editable "
              : "select-not-editable"
          }`}
        />
      </td>
      <td data-cell="Brand">
        <InputFieldProc
          name="brand"
          register={register}
          clearErrors={clearErrors}
          errors={errors}
          defaultValue={procurement.brand}
          value={Model.brandCompanyName.pattern.value}
          message={Model.brandCompanyName.pattern.message}
          minLength={Model.brandCompanyName.minLength.value}
          minMessage={Model.brandCompanyName.minLength.message}
          maxLength={Model.brandCompanyName.maxLength.value}
          maxMessage={Model.brandCompanyName.maxLength.message}
          required={"Please enter a brand name"}
          placeholder={"Enter Brand"}
          isEditable={selectedIndex === index}
          className={`${
            selectedIndex === index ? "input__editable" : "input__notEditable"
          }`}
        />
      </td>
      <td data-cell="Estimated Price">
        <InputFieldProc
          name="estimated_price"
          register={register}
          clearErrors={clearErrors}
          errors={errors}
          value={Model.EstimatedPrice.pattern.value}
          message={Model.EstimatedPrice.pattern.message}
          minLength={Model.EstimatedPrice.minLength.value}
          minMessage={Model.EstimatedPrice.minLength.message}
          required={"Please enter estimated price"}
          placeholder={"Estimation"}
          defaultValue={procurement.estimated_price}
          isEditable={selectedIndex === index}
          className={`${
            selectedIndex === index ? "input__editable" : "input__notEditable"
          }`}
        />
      </td>
      <td data-cell="Link">
        <InputFieldProc
          name="link"
          clearErrors={clearErrors}
          register={register}
          required={"Please enter a product link"}
          placeholder={"Product Link"}
          errors={errors}
          value={Model.Link.pattern.value}
          message={Model.Link.pattern.message}
          maxLength={Model.Link.maxLength.value}
          maxMessage={Model.Link.maxLength.message}
          defaultValue={procurement.link}
          isEditable={selectedIndex === index}
          className={`${
            selectedIndex === index ? "input__editable" : "input__notEditable"
          }`}
        />
      </td>
      <td data-cell="Action" className="button-gap">
        {selectedIndex === index ? (
          <Button
            type="button"
            className="edit__button"
            text={<FaCheck />}
            handleClick={() => handleProcurementTableAdd(index)}
          />
        ) : (
          <Button
            type={"button"}
            className={
              index !== selectedIndex
                ? "edit__button edit__not--allowed"
                : "edit__button"
            }
            handleClick={() => handleProcurementTableEdit(index)}
            text={<CiEdit />}
          />
        )}
        {selectedIndex === index ? (
          <Button
            type={"button"}
            className="delete__button"
            text={<RxCross1 />}
            handleClick={handleCancelProcurementLine}
          />
        ) : (
          <Button
            type={"button"}
            className="delete__button"
            text={<GoTrash />}
            handleClick={() => handleDeleteProcurementLine(index)}
          />
        )}
      </td>
    </tr>
  );
};

export default EditProductList;
