import { useForm } from "react-hook-form";
import { DataTable } from "../../Component/DataTable/DataTable";
import { InputField } from "../../Component/Input/InputField";
import { Label } from "../../Component/Label/Label";
import { SelectInput } from "../../Component/Input/SelectInput";
import "./Departments.css";
import Button from "../../Component/Button/Button";
import Model from "../../Component/Model/Model";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

const Departments = () => {
  const [value, setValue] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();
  const [formDataArray, setFormDataArray] = useState([
    {
      ParentCategory: "Department",
    }
  ]);

  const onSubmit = (data) => {
    const newData = {
      ParentCategory: data.Department,
    };
    console.log(newData)
    setFormDataArray((prevDataArray) => [...prevDataArray, newData]);
    reset();
  }
  return (
    <section className="content-wrapper">
      <div className="content-radius category">
        <div className="content__header">
          <h2>Department</h2>
        </div>
        <div className="category__content">
          <DataTable
           formDataArray={formDataArray}
            showDownButton={false}
          />

          <div className="add__category">
            <div className="add__category--title">
              <p>Add a Department</p>
              <span>
                Enter the department to list in the employees section.
              </span>
            </div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label text="Department Name" />
                <InputField
                  name="Department"
                  register={register}
                  required={Model.Group.required}
                  errors={errors}
                  type={Model.Group.type}
                  placeholder="Enter the department name"
                  minLength={Model.Group.minLength}
                  maxLength={Model.Group.maxLength}
                />
              </div>
              <div className="">
                <Button
                  text="Add Department"
                  type="submit"
                  className={"category--button button__blue"}
                  icon={<IoMdAdd />}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Departments;
