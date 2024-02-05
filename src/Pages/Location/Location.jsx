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

const LocationOptions=[
  {
    key: 1,
    value: 'GroundFloor'
  },
  {
    key: 2,
    value: 'FirstFloor'
  },
  {
    key: 3,
    value: 'SecondFloor'
  },
  {
    key: 4,
    value: 'ThirdFloor'
  },
]
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();


  const onSubmit = (data) => {
   console.log(data)
  };
  
  return (
    <section className="content-wrapper">
      <div className="content-radius category">
        <div className="content__header">
          <h2>Locations</h2>
        </div>
        <div className="category__content">
          <DataTable
           CategoryOptions={LocationOptions}
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
                <Label sup={"*"} text="Location Name" />
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
