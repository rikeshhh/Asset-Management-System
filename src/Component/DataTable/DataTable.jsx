import React, { useState } from "react";
import "./DataTable.css";
import Button from "../Button/Button";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { LuArrowDownUp } from "react-icons/lu";
import { InputField } from "../Input/InputField";
import { useForm } from "react-hook-form";
import Model from "../Model/Model";
import EditData from "../EditData/EditData";
import { useMutation } from "@tanstack/react-query";
import { departmentDelete } from "../../Pages/Departments/DepartmentApiSlice";
export const DataTable = ({ CategoryOptions }) => {
  const DeleteDepartment = useMutation({
    mutationFn: (department) => {
      return departmentDelete(department);
    },
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      if (error.response.status === 401) {
        console.log("Unauthorized: Please log in with valid id.");
      }
    },
  })
const onDeleteData = (department)=>{
  console.log(department)
  DeleteDepartment.mutate(department);
}
   
  return (
    <section className="cateogries table__container">
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
        <tbody>
          {CategoryOptions.map((options) => (
            <tr key={options.id}>
              <td>{options.id}</td>
              <td>{options.location || options.department}</td>
              <td className="button-gap">
                <Button className="edit__button" text={<CiEdit />}   />
                <Button className="delete__button" text={<GoTrash />} handleClick={()=>onDeleteData(options.department)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
