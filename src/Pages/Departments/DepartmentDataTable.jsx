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
import './Departments.css'
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
 

  const onDeleteData = (department) => {
    DeleteLocation.mutate(department);
  };
const EditDepartment  =  useMutation ({
  mutationFn: (editData) => {
    return updateDepartmentData(editData.data, editData.editedDepartment);
  },
  onSuccess: () => {
    queryClient.invalidateQueries("DepartmentData");
  setShow(false)
  },
  onError: (error) => {
    if (error.response.status === 401) {
      console.log("Unauthorized: Please log in with valid id.");
    }
  },
})

 const [show, setShow] = useState(false);
  const onUpdateData = (data) => {
    const editData = {
      data: data.department,
      editedDepartment: previousDepartment,
    };

    EditDepartment.mutate(editData);

  }
  const [previousDepartment, setPreviousDepartment] = useState(""); 
const [departmentId,setDepartmentId] = useState("");
  const handleEditButtonClick = (option) => {
    setPreviousDepartment(option.department);
    setDepartmentId(option.id)
    setShow(true);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: { location: previousDepartment },
  });
  const onMiniDelete = ()=>{
    setShow(false)
   reset();
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
              <td>{index + 1}</td>
              {departmentId===options.id &&show ? (
                <td className="Department__Container">
                <form onSubmit={handleSubmit(onUpdateData)} className="Department__Form">
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
                  <div className="Department__Form--Button">
                    <Button className="edit__button" text={<CiEdit />} />
                    <Button
                    type='button'
                      className="delete__button"
                      text={<GoTrash />}
                      handleClick={onMiniDelete}
                    />
                  </div>
                </form>
              </td>

              ) : (
                <td>{options.department}</td>

              )}

              <td className="button-gap">
                <Button
                  className="edit__button"
                  text={<CiEdit />}
                  handleClick={() => handleEditButtonClick(options)}
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