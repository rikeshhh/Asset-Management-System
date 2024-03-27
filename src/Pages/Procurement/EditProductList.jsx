import React from "react";
import { InputField } from "../../Component/Input/InputField";
import SelectInputCategory from "../Categories/SelectInputCategory";
import { useForm } from "react-hook-form";
import Button from "../../Component/Button/Button";
import { CiEdit } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";

const EditProductList = ({
  procurement,
  index,
  isEditable,
  setIsEditable,
  setSelectedIndex,
  selectedIndex,
  newProcurement,
  setNewProcurement,
  setCategoryName,
  categoryName,
  handleDeleteProcurementLine,
}) => {
  const {
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const handleProcurementTableAdd = (index, product_id) => {
    const values = getValues();

    // Update the item at the specified index with the new values
    const updatedItem = {
      product_name: values.product_name,
      category_id: values.category_id,
      brand: values.brand,
      estimated_price: values.estimated_price,
      link: values.link,
      product_id: product_id,
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
    if (procurement.product_id !== newProcurement.product_id) {
      setNewProcurement([...newProcurement, procurement]);
    }
    setSelectedIndex(index);
  };

  const handleCancelProcurementLine = () => {
    setSelectedIndex("");
    setIsEditable(false);
    reset();
  };
  return (
    <tr>
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
        <SelectInputCategory
          name="category_id"
          register={register}
          errors={errors}
          setCategoryName={setCategoryName}
          defaultValue={procurement.category || categoryName}
          isEditable={selectedIndex === index}
          className={` ${
            selectedIndex === index ? "input-enabled" : "select-not-editable"
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
            handleClick={() =>
              handleProcurementTableAdd(index, procurement.products_id)
            }
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
            handleClick={() =>
              handleDeleteProcurementLine(procurement.products_id)
            }
          />
        )}
      </td>
    </tr>
  );
};

export default EditProductList;
