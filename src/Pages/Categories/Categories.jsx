import { useForm, Controller } from 'react-hook-form';
import { DataTable } from "../../Component/DataTable/DataTable";
import { InputField } from "../../Component/Input/InputField";
import { Label } from "../../Component/Label/Label";
import { SelectInput } from "../../Component/Input/SelectInput";
import "./Categories.css";
import Button from "../../Component/Button/Button";
import Model from "../../Component/Model/Model";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

const Categories = () => {


 const options = [{label :"Computer", value: "Computer"},
 {label :"Accessories", value: "Accessories"},
 {label :"Backup", value: "Backup"},
 {label :"Router", value: "Router"}]
  const {
    register,
    formState: { errors },
    handleSubmit,
    control 
  } = useForm(
    
  );
  const [formDataArray, setFormDataArray] = useState([
    {
      ParentCategory: "Router",
      CateogryChild: "Rikesh",
    }
  ]);
  
  const onSubmit = (data) => {
    console.log(data.ChildCategory);
    console.log(data.ParentCategory);
  
    // Check if data.ParentCategory matches some property in formDataArray
    const existingCategoryIndex = formDataArray.findIndex(
      (formData) => formData.Par === data.ParentCategory
    );
  
    if (existingCategoryIndex !== -1) {
      const updatedFormDataArray = [...formDataArray];
      updatedFormDataArray[existingCategoryIndex].ChildCategory = data.ChildCategory;
      setFormDataArray(updatedFormDataArray);
    } else {
      const newData = {
        ParentCategory: data.ParentCategory,
        ChildCategory: data.ChildCategory,
      };
  
      setFormDataArray((prevDataArray) => [...prevDataArray, newData]);
    }
  };
  const handleDelete = (index) => {
    const updatedFormDataArray = [...formDataArray];
    updatedFormDataArray.splice(index, 1);
    console.log('item Deleted');
    setFormDataArray(updatedFormDataArray);
    console.log(updatedFormDataArray); // Log the updated state
    console.log(formDataArray)
  };
  return (
    <section className="content-wrapper">
      <div className="content-radius category">
        <div className="content__header">
          <h2>Categories</h2>
        </div>
        <div className="category__content">
          <DataTable
        formDataArray={formDataArray}
            showDownButton={true}
            onDelete={handleDelete}
          />

          <div className="add__category">
            <div className="add__category--title">
              <p>Add a category/ Sub Category</p>
              <span>
                Add a new category / sub category. Assign sub category to a
                parent category.
              </span>
            </div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label text="Name" />
                <InputField
                  name="ChildCategory"
                  register={register}
                  required={Model.Group.required}
                  errors={errors}
                  type={Model.Group.type}
                  placeholder={Model.Group.placeholder}
                  minLength={Model.Group.minLength}
                  maxLength={Model.Group.maxLength}
                />
              </div>
              <div className="add__category--select">
                <Label text="Parent Category" />
                <Controller
        name="ParentCategory"
        control={control}
        defaultValue="" // Set the default value
        render={({ field }) => (
          <SelectInput {...field} options={options} />
        )}
      />
              </div>
              <div className="">
                <Button
                  text="Add Category"
                  type='submit'
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
export default Categories;
