import React from "react";
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
  selectedIndex,
  procurementTableLine,
  handleProcurementTableAdd,
  handleDeleteProcurementLine,
  register,
  errors,
  setProcurementTableLine,
  getValues,
  reset,
  isEditable,
}) => {
  return (
    <tr>
      <td>
        <InputField
          name="product_name"
          register={register}
          errors={errors}
          defaultValue={tableItem.product_name}
          isEditable={isEditable}
        />
      </td>
      <td>
        <SelectInputCategory
          name="category_id"
          register={register}
          errors={errors}
          defaultValue={""}
          isEditable={isEditable}
        />
      </td>
      <td>
        <InputField
          name="brand"
          register={register}
          errors={errors}
          defaultValue={tableItem.brand}
          isEditable={isEditable}
        />
      </td>
      <td>
        <InputField
          name="estimated_price"
          register={register}
          errors={errors}
          defaultValue={tableItem.estimated_price}
          isEditable={isEditable}
        />
      </td>
      <td>
        <InputField
          name="link"
          register={register}
          errors={errors}
          defaultValue={tableItem.link}
          isEditable={isEditable}
        />
      </td>
      <td className="button-gap">
        <Button
          type="button"
          className="edit__button"
          text={<FaCheck />}
          handleClick={() => handleProcurementTableAdd(index)}
        />
        {/* <Button
            type={"button"}
            className={
              procurementTableLine && index !== selectedIndex
                ? "edit__button edit__not--allowed"
                : "edit__button"
            }
            handleClick={() => handleProcurementTableEdit(index)}
            text={<CiEdit />}
          /> */}
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
