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
import { getLocationData, locationAdd, locationDelete } from "./LocationApiSlice";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../Component/Query/Query";
import LocationDataTable from "./LocationDataTable";
import { ToastContainer } from "react-toastify";
import { notifyDelete, notifyError, notifySuccess } from "../../Component/Toast/Toast";
import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";
import CustomToastContainer from "../../Component/Toast/ToastContainer";

const Location = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    addLocation.mutate(data);
    reset();
  };

  const {
    isPending,
    error,
    data: LocationData,
  } = useQuery({
    queryKey: ["LocationData"],
    queryFn: getLocationData,
  });
  const successMessage = "Location has been added successfully";
  const addLocation = useMutation({
    mutationFn: (formData) => {
      return locationAdd(formData.location);
    },
    onSuccess: (data) => {
      notifySuccess(successMessage)
      queryClient.invalidateQueries("LocationData");
    },
    onError: (error) => {
      notifyError(error.message)
      if (error.response.status === 401) {
        notifyError("Unauthorized: Please log in with valid id.");
      }
    },
  });

  const deleteMessage = "Location has been deleted successfully"
  const DeleteLocation = useMutation({
    mutationFn: (location) => {
      return locationDelete(location)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('LocationData')
      notifySuccess(deleteMessage)
    },
    onError: (error) => {
      if (error.response.status === 401) {
       notifyError("Unauthorized: Please log in with valid id.");
      }
    },
  });
  const [locationName, setLocationName] = useState()
  const [deleteConfirmationShow, setDeleteConfirmationShow] = useState(false)
  
  const handleCancelClick = () => {
    setDeleteConfirmationShow(false)
  }
  const handleProceedClick = () => {
    DeleteLocation.mutate(locationName)
    setDeleteConfirmationShow(false)
  }

  const handleDeleteClick = (location) => {
    setDeleteConfirmationShow(true)
    setLocationName(location)
  }
  // if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {deleteConfirmationShow?(
       <DeleteConfirmation
          deleteName="location"
          handleCancelClick={handleCancelClick}
          handleProceedClick={handleProceedClick}
          />) : (
          <></>
      )}
    <section className="content-wrapper">
      <div className="content-radius category">
        <div className="content__header">
          <h2>Locations</h2>
        </div>
        <div className="category__content">
            <LocationDataTable LocationData={LocationData} isPending={isPending}
            handleDeleteClick={handleDeleteClick}
             handleProceedClick={handleProceedClick}
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
      <CustomToastContainer />   
      </section>
      
    </>
  );
};
export default Location;
