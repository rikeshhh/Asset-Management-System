import React, { useEffect, useState } from "react";
import { InputField } from "../../Component/Input/InputField";
import { useForm } from "react-hook-form";
import Button from "../../Component/Button/Button";
import { CiEdit } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import SelectCategoryProc from "./SelectCategoryProc";

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
  } = useForm();
  const handleProcurementTableAdd = (index) => {
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
  };

  const handleProcurementTableEdit = (index) => {
    setSelectedIndex(index);
  };

  const handleCancelProcurementLine = () => {
    setSelectedIndex("");
    setIsEditable(false);
    reset();
  };
  return (
    <tr className={`procurement__tablerow   `}>
      <td>
        <InputField
          name="product_name"
          register={register}
          errors={errors}
          defaultValue={procurement.product_name}
          isEditable={selectedIndex === index}
          className={`${
            selectedIndex === index ? "input__editable" : "input__notEditable"
          }`}
        />
      </td>
      <td>
        <SelectCategoryProc
          name="category_id"
          register={register}
          errors={errors}
          setCategoryName={setCategoryName}
          defaultValue={procurement.category}
          isEditable={selectedIndex === index}
          className={` ${
            selectedIndex === index
              ? "input-enabled input__editable "
              : "select-not-editable"
          }`}
        />
      </td>
      <td>
        <InputField
          name="brand"
          register={register}
          errors={errors}
          defaultValue={procurement.brand}
          isEditable={selectedIndex === index}
          className={`${
            selectedIndex === index ? "input__editable" : "input__notEditable"
          }`}
        />
      </td>
      <td>
        <InputField
          name="estimated_price"
          register={register}
          errors={errors}
          defaultValue={procurement.estimated_price}
          isEditable={selectedIndex === index}
          className={`${
            selectedIndex === index ? "input__editable" : "input__notEditable"
          }`}
        />
      </td>
      <td>
        <InputField
          name="link"
          register={register}
          errors={errors}
          defaultValue={procurement.link}
          isEditable={selectedIndex === index}
          className={`${
            selectedIndex === index ? "input__editable" : "input__notEditable"
          }`}
        />
      </td>
      <td className="button-gap">
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
