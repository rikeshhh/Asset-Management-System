import { useMutation } from "@tanstack/react-query";
import { InputField } from "../../Component/Input/InputField";
import { LuArrowDownUp } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { useState } from "react";
import Button from "../../Component/Button/Button";
import { queryClient } from "../../Component/Query/Query";
import { departmentDelete } from "./DepartmentApiSlice";
import { useForm } from "react-hook-form";
import Model from "../../Component/Model/Model";
const DepartmentDataTable = ({ DepartmentData }) => {
    const DeleteDepartment = useMutation({
        mutationFn: (department) => {
          return departmentDelete(department);
        },
        onSuccess: () => {
          queryClient.invalidateQueries("DepartmentData");
        },
        onError: (error) => {
          if (error.response.status === 401) {
            console.log("Unauthorized: Please log in with valid id.");
          }
        },
      });
      const onDeleteData = (department) => {
        DeleteDepartment.mutate(department);
      };
      const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
      } = useForm();
      const [show, setShow] = useState(true);
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
              {DepartmentData.map((options, index) => (
                <tr key={index}>
                  <td>{options.id}</td>
                  {show ? (
                    <td>{options.department}</td>
                  ) : (
                    <td>
                      <InputField
                        name="department"
                        register={register}
                        inputValue={options.location}
                        required={Model.Group.required}
                        errors={errors}
                        type={Model.Group.type}
                        placeholder={options.location}
                        minLength={Model.Group.minLength}
                        maxLength={Model.Group.maxLength}
                      />
                    </td>
                  )}
    
                  <td className="button-gap">
                    <Button
                      className="edit__button"
                      text={<CiEdit />}
                      handleClick={() => setShow((prev) => !prev)}
                    />
                    <Button
                      className="delete__button"
                      text={<GoTrash />}
                      handleClick={() => onDeleteData(options.department)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      );
    };
    
export default DepartmentDataTable