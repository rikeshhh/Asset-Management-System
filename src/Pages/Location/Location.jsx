import { useForm } from "react-hook-form";
import { DataTable } from "../../Component/DataTable/DataTable";
import { InputField } from "../../Component/Input/InputField";
import { Label } from "../../Component/Label/Label";
import { SelectInput } from "../../Component/Input/SelectInput";
import "./Location.css";
import Button from "../../Component/Button/Button";
import Model from "../../Component/Model/Model";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

const Location = () => {
  const [value, setValue] = useState([{
    ParentCategory:"Kathmandu"
  }]);
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
      ParentCategory: "GroundFloor",
    }
  ]);

  const onSubmit = (data) => {
    const newData = {
      ParentCategory: data.Location,
    };
    console.log(newData)
    setFormDataArray((prevDataArray) => [...prevDataArray, newData]);
    reset();
  }
  const handleDelete = (index) => {
    const updatedFormDataArray = [...formDataArray];
    updatedFormDataArray.splice(index, 1);
    console.log('item Deleted');
    setFormDataArray(updatedFormDataArray);
    console.log(updatedFormDataArray); // Log the updated state
  };
  return (
    <section className="content-wrapper">
      <div className="content-radius category">
        <div className="content__header">
          <h2>Locations</h2>
        </div>
        <div className="category__content">
          <DataTable
           formDataArray={formDataArray}
            showDownButton={false}
            onDelete={handleDelete}
          />

          <div className="add__category">
            <div className="add__category--title">
              <p>Add a Location</p>
              <span>
                Add a location name of the asset to determine where it is
                located.
              </span>
            </div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label text="Location Name" />
                <InputField
                  name="Location"
                  register={register}
                  required={Model.Group.required}
                  errors={errors}
                  type={Model.Group.type}
                  placeholder="Enter the location name"
                  minLength={Model.Group.minLength}
                  maxLength={Model.Group.maxLength}
                />
              </div>
              <div className="">
                <Button
                  text="Add Location"
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
export default Location;
