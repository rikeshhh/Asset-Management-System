import React, { useState } from "react";
import "./DataTable.css";
import Button from "../Button/Button";
import { RiArrowDownSLine } from "react-icons/ri";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { LuArrowDownUp } from "react-icons/lu";
import { InputField } from "../Input/InputField";
import { useForm } from "react-hook-form";
import Model from "../Model/Model";
import EditData from "../EditData/EditData";
export const DataTable = ({ formDataArray, showDownButton, onDelete, setFormDataArray, onDeleteSub }) => {
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editSubIndex, setEditSubIndex] = useState(null);

  const handleEditClick = (index) => {
    setIsEdit(true);
    setEditIndex(index);
    setEditSubIndex(null);
  };

  const handleSubEditClick = (subIndex) => {
    setIsEdit(true);
    setEditSubIndex(subIndex);
    setEditIndex(null);
  };
  const [showChildren, setShowChildren] = useState(Array(formDataArray.length).fill(false));
  const handleViewClick = (index) => {
    const updatedShowChildren = [...showChildren];
    updatedShowChildren[index] = !updatedShowChildren[index];
    setShowChildren(updatedShowChildren);
    setShow((prev) => !prev);

  };
  const handleBackClick = () => {
    setIsEdit(false);
    setEditIndex(null);
    setEditSubIndex(null);
  };
  return (
    <section className="cateogries">
      <table>
        <thead>
          <tr>
            <th>
              SN <LuArrowDownUp />
            </th>
            <th>
              Category <LuArrowDownUp />
            </th>
            <th>Action</th>
          </tr>
        </thead>
        {formDataArray.map((formData, index) => (
  <tbody key={index + 1}>
    <tr>
      <td>{index + 1}</td>
      <td className="category_edit--row">
        {isEdit && editIndex === index ? (
          <div>
            <EditData
              value={formData.ParentCategory || formData.Location || formData.Department}
              setFormDataArray={setFormDataArray}
              handleClick={() => handleBackClick(index)}
            />
          </div>
        ) : (
          `${formData.ParentCategory || formData.Location || formData.Department}`
        )}
      </td>
      <td className="button-gap">
        {showDownButton && (
          <Button className="edit__button" text={<RiArrowDownSLine />}  handleClick={() => handleViewClick(index)} />
        )}
        <Button className="edit__button" text={<CiEdit />} handleClick={() => handleEditClick(index)} />
        <Button className="delete__button" text={<GoTrash />} handleClick={() => onDelete(index)} />
      </td>
    </tr>
    {show && formData.ChildCategory && formData.ChildCategory.map((child, childIndex) => (
      <tr key={`child-${childIndex}`}>
        <td colSpan='2'>
          {isEdit && editSubIndex === childIndex ? (
            <div>
              <EditData
                value={child}
                handleClick={() => handleBackClick(index)}
                setFormDataArray={setFormDataArray} 
              />
           
            </div>
          ) : (
            <ol type="a">
              <li>{child}</li>
            </ol>
          )}
        </td>
        <td className="button-gap">
          <Button className="edit__button" text={<CiEdit />} handleClick={() => handleSubEditClick(childIndex)} />
          <Button className="delete__button" text={<GoTrash />} handleClick={() => onDeleteSub(index, childIndex)} />
        </td>
      </tr>
    ))}
  </tbody>
))}

      </table>
    </section>
  );
};
