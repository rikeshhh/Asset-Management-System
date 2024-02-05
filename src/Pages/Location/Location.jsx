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
import { getLocationData, locationAdd } from "./LocationApiSlice";
import { useMutation, useQuery } from "@tanstack/react-query";

const Location = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    addLocation.mutate(data);
  };

  const {
    isPending,
    error,
    data: LocationData,
  } = useQuery({
    queryKey: ["LocationData"],
    queryFn: getLocationData,
  });

  const addLocation = useMutation({
    mutationFn: (formData) => {
      console.log("fromdata", formData);
      return locationAdd(formData.location);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      if (error.response.status === 401) {
        console.log("Unauthorized: Please log in with valid id.");
      }
    },
  });

  const deleteLocation = useMutation({
    mutationFn: (formData) => {
      console.log("fromdata", formData);
      return locatio(formData.location);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      if (error.response.status === 401) {
        console.log("Unauthorized: Please log in with valid id.");
      }
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <section className="content-wrapper">
      <div className="content-radius category">
        <div className="content__header">
          <h2>Locations</h2>
        </div>
        <div className="category__content">
          <DataTable CategoryOptions={LocationData} />

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
                  name="location"
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
