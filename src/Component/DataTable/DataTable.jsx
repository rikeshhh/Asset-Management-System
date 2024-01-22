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
export const DataTable = ({ formDataArray, showDownButton, onDelete, setFormDataArray }) => {
  const [show, setShow] = useState(false);
  
  const handleViewClick = () => {
    setShow((prev) => !prev);
  };
  const [isEdit, setIsEdit] = useState(true);
  const handleEditClick = () => {
    setIsEdit((prev) => !prev);
  };

console.log(formDataArray.Location);



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
                {
                  isEdit ? 
                  `${formData.ParentCategory || formData.Location || formData.Department}`
                  :
                    <EditData value={formData.ParentCategory || formData.Location || formData.Department}  setFormDataArray={setFormDataArray}/>
                }
              </td>


              {/* Additional columns as needed */}
              <td className="button-gap">
                {showDownButton && (
                  <Button className="edit__button" text={<RiArrowDownSLine />} handleClick={handleViewClick} />
                )}
                <Button className="edit__button" text={<CiEdit />} handleClick={handleEditClick} />
                <Button className="delete__button" text={<GoTrash />} handleClick={() => onDelete(index)} />
              </td>
            </tr>
            {show ?

              <tr>
                <td colSpan='2'>
                  <ol type="a">
                    <li>{formData.ChildCategory}</li>
                  </ol>
                </td>

                <td className="button-gap">
                  <Button className="edit__button" text={<CiEdit />} handleClick={handleEditClick} />
                  <Button className="delete__button" text={<GoTrash />} handleClick={() => onDelete(index)} />
                </td>
              </tr>

              : ''}

          </tbody>
        ))}
      </table>
    </section>
  );
};
