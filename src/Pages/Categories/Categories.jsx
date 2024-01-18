import { useForm } from "react-hook-form";
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
  const [value, setValue] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [options, setOptions] = useState([
    "Computer",
    "Routers",
    "Accesories",
    "Backups",
  ]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  return (
    <section className="content-wrapper">
      <div className="content-radius category">
        <div className="content__header">
          <h2>Categories</h2>
        </div>
        <div className="category__content">
          <DataTable
            value={value}
            selectedValue={selectedValue}
            showDownButton={true}
          />

          <div className="add__category">
            <div className="add__category--title">
              <p>Add a category/ Sub Category</p>
              <span>
                Add a new category / sub category. Assign sub category to a
                parent category.
              </span>
            </div>
            <form action="" onSubmit={handleSubmit((data) => setValue(data))}>
              <div>
                <Label text="Name" />
                <InputField
                  name="Categories"
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
                <SelectInput
                  onSelectChange={handleSelectChange}
                  options={options}
                />
              </div>
              <div className="">
                <Button
                  text="Add Category"
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
