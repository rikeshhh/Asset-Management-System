import React, { useState } from "react";
import Button from "../../Component/Button/Button";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { InputField } from "../../Component/Input/InputField";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import SelectInputCategory from "../Categories/SelectInputCategory";

const AddProcurementTable = ({
  procurementTableLine,
  setProcurementTableLine,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [newProcurement, setNewProcurement] = useState([]);
  const [editProcurementLine, setEditProcurementLine] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleCancelTableLine = () => {
    setProcurementTableLine(false);
    setSelectedIndex(null);
    reset();
  };

  const handleProcurementTableEdit = (index) => {
    setSelectedIndex(index);
    setEditProcurementLine(true);
    setProcurementTableLine(false);
    reset();
  };

  const handleProcurementSubmitClick = () => {
    setEditProcurementLine(false);
    setSelectedIndex(null);
    reset();
  };

  const handleDeleteProcurementLine = (index) => {
    setNewProcurement(newProcurement.filter((_, idx) => idx !== index));
  };

  const handleAddTableLineSubmit = (tableData) => {
    const newItem = {
      product_name: tableData.product_name,
      category_id: tableData.category_id,
      brand: tableData.brand,
      estimated_price: tableData.estimated_price,
      link: tableData.link,
    };
    setNewProcurement((prevProcurement) => [...prevProcurement, newItem]);
    setProcurementTableLine(false);
    reset();
  };

  console.log(newProcurement);

  return (
    <div className="table__container">
      <form onSubmit={handleSubmit(handleAddTableLineSubmit)}>
        <table className="main__table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Catagory</th>
              <th>Brand</th>
              <th>Estimated Price</th>
              <th>Link</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {newProcurement.map((tableItem, index) => (
              <tr key={index}>
                <td>
                  {editProcurementLine && index === selectedIndex ? (
                    <InputField
                      name="product_name"
                      register={register}
                      errors={errors}
                      defaultValue={tableItem.product_name}
                    />
                  ) : (
                    tableItem.product_name
                  )}
                </td>
                <td>
                  {editProcurementLine && index === selectedIndex ? (
                    <SelectInputCategory
                      name="category_id"
                      register={register}
                      errors={errors}
                    />
                  ) : (
                    tableItem.category_id
                  )}
                </td>
                <td>
                  {editProcurementLine && index === selectedIndex ? (
                    <InputField
                      name="brand"
                      register={register}
                      errors={errors}
                      defaultValue={tableItem.brand}
                    />
                  ) : (
                    tableItem.brand
                  )}
                </td>
                <td>
                  {editProcurementLine && index === selectedIndex ? (
                    <InputField
                      name="estimated_price"
                      register={register}
                      errors={errors}
                      defaultValue={tableItem.estimated_price}
                    />
                  ) : (
                    tableItem.estimated_price
                  )}
                </td>
                <td>
                  {" "}
                  {editProcurementLine && index === selectedIndex ? (
                    <InputField
                      name="link"
                      register={register}
                      errors={errors}
                      defaultValue={tableItem.link}
                    />
                  ) : (
                    tableItem.link
                  )}
                </td>
                <td className="button-gap">
                  {editProcurementLine && index === selectedIndex ? (
                    <Button
                      type={"button"}
                      className="edit__button"
                      handleClick={handleProcurementSubmitClick}
                      text={<FaCheck />}
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
                      isDisabled={procurementTableLine ? true : false}
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
            ))}
            {procurementTableLine ? (
              <tr>
                <td>
                  <InputField
                    name="product_name"
                    register={register}
                    errors={errors}
                    required={"this is required"}
                  />
                </td>
                <td>
                  <SelectInputCategory name="category_id" register={register} />
                </td>
                <td>
                  <InputField
                    name="brand"
                    register={register}
                    errors={errors}
                  />
                </td>
                <td>
                  <InputField
                    name="estimated_price"
                    register={register}
                    errors={errors}
                  />
                </td>
                <td>
                  <InputField name="link" register={register} errors={errors} />
                </td>
                <td className="button-gap">
                  <Button className="edit__button" text={<FaCheck />} />
                  <Button
                    type={"button"}
                    className="delete__button"
                    text={<GoTrash />}
                    handleClick={handleCancelTableLine}
                  />
                </td>
              </tr>
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddProcurementTable;
