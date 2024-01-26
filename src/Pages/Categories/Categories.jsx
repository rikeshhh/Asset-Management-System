import { useForm, Controller } from "react-hook-form";
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
  const options = ["Computer", "Backup", "Accessories", "Router"];
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm();
  const [formDataArray, setFormDataArray] = useState([
    {
      ParentCategory: "Router",
      CateogryChild: "Rikesh",
      Location: "First Floor",
      Department: "Frontend Team",
    },
  ]);

  const onSubmit = (data) => {
    console.log(data.ChildCategory);
    console.log(data.ParentCategory);

    const existingCategoryIndex = formDataArray.findIndex(
      (formData) => formData.ParentCategory === data.ParentCategory
    );

    if (existingCategoryIndex !== -1) {
      // Parent category already exists, add subcategory to it
      const updatedFormDataArray = [...formDataArray];
      const existingParentCategory =
        updatedFormDataArray[existingCategoryIndex];

      // Check if ChildCategory property exists, and if not, create it as an array
      if (!existingParentCategory.ChildCategory) {
        existingParentCategory.ChildCategory = [];
      }

      // Add the new subcategory to the existing parent category
      existingParentCategory.ChildCategory.push(data.ChildCategory);

      setFormDataArray(updatedFormDataArray);
    } else {
      // Parent category doesn't exist, add a new entry
      const newData = {
        ParentCategory: data.ParentCategory,
        ChildCategory: [data.ChildCategory], // Create an array for subcategories
      };

      setFormDataArray((prevDataArray) => [...prevDataArray, newData]);
    }
    reset();
  };

  const handleCategoryDelete = (index) => {
    const updatedFormDataArray = [...formDataArray];
    const deletedCategory = updatedFormDataArray.splice(index, 1)[0];
    console.log("Category deleted:", deletedCategory);
    setFormDataArray(updatedFormDataArray);
  };

  const handleChildDelete = (parentIndex, childIndex) => {
    const updatedFormDataArray = [...formDataArray];
    const parentCategory = updatedFormDataArray[parentIndex];

    if (parentCategory && parentCategory.ChildCategory) {
      // Check if the parent category has children
      if (parentCategory.ChildCategory.length > 1) {
        // If there are multiple subcategories, remove the selected one
        const deletedChild = parentCategory.ChildCategory.splice(
          childIndex,
          1
        )[0];
        console.log("Child deleted:", deletedChild);
      } else {
        // If there's only one subcategory, remove the entire ChildCategory property
        delete parentCategory.ChildCategory;
      }
    }

    setFormDataArray(updatedFormDataArray);
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
            setFormDataArray={setFormDataArray}
            showDownButton={true}
            onDelete={handleCategoryDelete}
            onDeleteSub={handleChildDelete}
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
export default Categories;
