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
import { queryClient } from "../Query/Query";
import { notifyError } from "../Toast/Toast";

export const DataTable = ({ CategoryOptions }) => {
  const DeleteDepartment = useMutation({
    mutationFn: (optionName) => {
      return departmentDelete(optionName);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(data);
    },
    onError: (error) => {
      notifyError("Data cannot be redeclared");
      if (error.response.status === 401) {
        console.log("Unauthorized: Please log in with valid id.");
      }
    },
  });
  const onDeleteData = (optionName) => {
    console.log("name", optionName);
    DeleteDepartment.mutate(optionName);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } =useForm();
const [show,setShow] = useState(true)
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
              {show?<td>{options.location || options.department}</td>:
              <td>
                <>
                <InputField 
                 name="department"
                 register={register}
                 
                 required={Model.Group.required}
                 errors={errors}
                 type={Model.Group.type}
                 placeholder={options.location || options.department}
                 minLength={Model.Group.minLength}
                 maxLength={Model.Group.maxLength}
                />
                <div>
                <Button className="edit__button" text={<CiEdit />} handleClick={()=>setShow(true)}/>
                <Button
                  className="delete__button"
                  text={<GoTrash />}
                />
                </div>
                </>
                </td>}
            
              <td className="button-gap">
                <Button className="edit__button" text={<CiEdit />} handleClick={()=>setShow(false)}/>
                <Button
                  className="delete__button"
                  text={<GoTrash />}
                  handleClick={() =>
                    onDeleteData(options.department || options.location)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
