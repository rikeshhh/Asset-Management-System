import React, { useState } from "react";
import { InputField } from "../../Component/Input/InputField";
import Button from "../../Component/Button/Button";
import { FaCheck } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { GoTrash } from "react-icons/go";
import { useForm } from "react-hook-form";
import SelectCategoryProc from "./SelectCategoryProc";
import { InputFieldProc } from "../../Component/Input/InputFieldProc";

const ProductListTableItem = ({
  tableItem,
  index,
  handleDeleteProcurementLine,
  setProcurementTableLine,
  isEditable,
  setIsEditable,
  setNewProcurement,
  newProcurement,
  procurementTableLine,
  selectedIndex,
  setSelectedIndex,
}) => {
  const {
    register,
    formState: { errors },
    getValues,
    reset,
    trigger,
    clearErrors,
  } = useForm();

  const [categoryName, setCategoryName] = useState("");
  const handleProcurementTableAdd = async (index) => {
    const isValid = await trigger();
    if (isValid) {
      const values = getValues();

      // Update the item at the specified index with the new values
      const updatedItem = {
        product_name: values.product_name,
        category_id: values.category_id,
        brand: values.brand,
        estimated_price: values.estimated_price,
        link: values.link,
      };

      // Update the newProcurement state with the updated item
      const updatedProcurement = [...newProcurement];
      updatedProcurement[index] = updatedItem;
      setNewProcurement(updatedProcurement);

      // Reset state and form after editing
      setIsEditable(false);
      setSelectedIndex("");
      setProcurementTableLine(false);
      reset();
    } else {
      return;
    }
  };

  const handleProcurementTableEdit = async (index) => {
    setProcurementTableLine(true);
    setSelectedIndex(index);
  };

  const handleCancelProcurementLine = () => {
    setSelectedIndex("");
    setIsEditable(false);
    setProcurementTableLine(false);
    reset();
  };

  return (
    <tr className="procurement__tablerow">
      <td data-cell="Product Name">
        <InputFieldProc
          name="product_name"
          register={register}
          required={"Please enter a product name"}
          placeholder={"Enter Product Name"}
          errors={errors}
          clearErrors={clearErrors}
          defaultValue={tableItem.product_name}
          isEditable={
            (isEditable && index === newProcurement.length - 1) ||
            selectedIndex === index
          }
          className={`${
            (isEditable && index === newProcurement.length - 1) ||
            selectedIndex === index
              ? " input__editable"
              : "input__notEditable"
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
          clearErrors={clearErrors}
          defaultValue={categoryName || tableItem.category_id}
          isEditable={
            (index === newProcurement.length - 1 && isEditable) ||
            selectedIndex === index
          }
          className={` ${
            (isEditable && index === newProcurement.length - 1) ||
            selectedIndex === index
              ? " input-enabled input__editable "
              : "select-not-editable"
          } ${errors["category_id"] ? "select__procurement" : ""}`}
        />
      </td>
      <td data-cell="Brand">
        <InputFieldProc
          name="brand"
          register={register}
          required={"Please enter a brand name"}
          placeholder={"Enter Brand"}
          errors={errors}
          defaultValue={tableItem.brand}
          clearErrors={clearErrors}
          isEditable={
            (isEditable && index === newProcurement.length - 1) ||
            selectedIndex === index
          }
          className={`${
            (isEditable && index === newProcurement.length - 1) ||
            selectedIndex === index
              ? " input__editable"
              : "input__notEditable"
          }`}
        />
      </td>
      <td data-cell="Estimated Price">
        <InputFieldProc
          name="estimated_price"
          register={register}
          required={"Please enter estimated price"}
          placeholder={"Estimation"}
          errors={errors}
          clearErrors={clearErrors}
          defaultValue={tableItem.estimated_price}
          isEditable={
            (isEditable && index === newProcurement.length - 1) ||
            selectedIndex === index
          }
          className={`${
            (isEditable && index === newProcurement.length - 1) ||
            selectedIndex === index
              ? " input__editable"
              : "input__notEditable"
          }`}
        />
      </td>
      <td data-cell="Link">
        <InputFieldProc
          name="link"
          register={register}
          required={"Please enter a product link"}
          placeholder={"Product Link"}
          errors={errors}
          clearErrors={clearErrors}
          defaultValue={tableItem.link}
          isEditable={
            (isEditable && index === newProcurement.length - 1) ||
            selectedIndex === index
          }
          className={`${
            (isEditable && index === newProcurement.length - 1) ||
            selectedIndex === index
              ? " input__editable"
              : "input__notEditable"
          }`}
        />
      </td>
      <td data-cell="Action" className="button-gap">
        {(procurementTableLine && index === newProcurement.length - 1) ||
        selectedIndex === index ? (
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
              procurementTableLine && index !== selectedIndex
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

export default ProductListTableItem;
