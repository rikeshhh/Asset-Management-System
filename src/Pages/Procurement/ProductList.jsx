import React, { useState } from "react";
import { InputField } from "../../Component/Input/InputField";
import Button from "../../Component/Button/Button";
import { FaCheck } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { GoTrash } from "react-icons/go";
import { useForm } from "react-hook-form";
import SelectInputCategory from "../Categories/SelectInputCategory";

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
  } = useForm();

  const handleProcurementTableAdd = (index) => {
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
    setProcurementTableLine(false);
    reset();
  };

  const handleProcurementTableEdit = (index) => {
    setSelectedIndex(index);
    setIsEditable(true);
    setProcurementTableLine(true);
  };

  console.log("Item =>", index, tableItem);
  return (
    <tr>
      <td>
        <InputField
          name="product_name"
          register={register}
          errors={errors}
          defaultValue={tableItem.product_name}
          isEditable={isEditable}
          className={`${isEditable ? "input__editable" : "input__notEditable"}`}
        />
      </td>
      <td>
        <SelectInputCategory
          name="category_id"
          register={register}
          errors={errors}
          defaultValue={
            tableItem.category_id === "" ? "" : tableItem?.category_id
          }
          isEditable={isEditable}
          className={` ${isEditable ? "input-enabled" : "select-not-editable"}`}
        />
      </td>
      <td>
        <InputField
          name="brand"
          register={register}
          errors={errors}
          defaultValue={tableItem.brand}
          isEditable={isEditable}
          className={`${isEditable ? "input__editable" : "input__notEditable"}`}
        />
      </td>
      <td>
        <InputField
          name="estimated_price"
          register={register}
          errors={errors}
          defaultValue={tableItem.estimated_price}
          isEditable={isEditable}
          className={`${isEditable ? "input__editable" : "input__notEditable"}`}
        />
      </td>
      <td>
        <InputField
          name="link"
          register={register}
          errors={errors}
          defaultValue={tableItem.link}
          isEditable={isEditable}
          className={`${isEditable ? "input__editable" : "input__notEditable"}`}
        />
      </td>
      <td className="button-gap">
        {procurementTableLine ? (
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
            handleClick={() => handleProcurementTableEdit()}
            text={<CiEdit />}
          />
        )}
        <Button
          type={"button"}
          className="delete__button"
          text={<GoTrash />}
          handleClick={() => handleDeleteProcurementLine(index)}
        />
      </td>
    </tr>
  );
};

export default ProductListTableItem;
