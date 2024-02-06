import { useMutation } from "@tanstack/react-query";
import { InputField } from "../../Component/Input/InputField";
import { LuArrowDownUp } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { useState } from "react";
import Button from "../../Component/Button/Button";
import { queryClient } from "../../Component/Query/Query";
import { departmentDelete, updateDepartmentData } from "./DepartmentApiSlice";
import { useForm } from "react-hook-form";
import Model from "../../Component/Model/Model";
const DepartmentDataTable = ({ DepartmentData }) => {
  const DeleteLocation = useMutation({
    mutationFn: (department) => {
      return departmentDelete(department);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("LocationData");
    },
    onError: (error) => {
      if (error.response.status === 401) {
        console.log("Unauthorized: Please log in with valid id.");
      }
    },
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onDeleteData = (location) => {
    DeleteLocation.mutate(location);
  };
const EditDepartment  =  useMutation ({
 
  mutationFn: (editData)=>{
    console.log(editData)
    return updateDepartmentData(editData);

  },
  onSuccess: () => {
    queryClient.invalidateQueries("DepartmentData");
  },
  onError: (error) => {
    if (error.response.status === 401) {
      console.log("Unauthorized: Please log in with valid id.");
    }
  },
})
const [prevData,setPrevData] = useState('')
  const [show, setShow] = useState(true);
  const onUpdateData = (data) => {
  
    const editData ={
      newData:data,
      previousData: prevData
    }
    EditDepartment.mutate(editData);

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
          {DepartmentData.map((options, index) => (
            <tr key={index}>
              <td>{options.id}</td>
              {show ? (
                <td>{options.department}</td>
              ) : (
                <td>
                  <form onSubmit={onUpdateData}>
                    <InputField
                      name="department"
                      register={register}
                      // inputValue={options.department}
                      required={Model.Group.required}
                      errors={errors}
                      type={Model.Group.type}
                      placeholder={options.department}
                      minLength={Model.Group.minLength}
                      maxLength={Model.Group.maxLength}
                    />
                    <div>
                      <Button className="edit__button" text={<CiEdit />} handleClick={()=>setPrevData(options.department)}/>
                      <Button
                        className="delete__button"
                        text={<GoTrash />}
                      />
                    </div>
                  </form>
                </td>
              )}

              <td className="button-gap">
                <Button
                  className="edit__button"
                  text={<CiEdit />}
                  handleClick={() => setShow(false)}
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