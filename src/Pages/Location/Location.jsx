import { useForm } from "react-hook-form";
import { InputField } from "../../Component/Input/InputField";
import { Label } from "../../Component/Label/Label";
import "./Location.css";
import Button from "../../Component/Button/Button";
import Model from "../../Component/Model/Model";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import {
  getLocationData,
  locationAdd,
  locationDelete,
} from "./LocationApiSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../Component/Query/Query";
import LocationDataTable from "./LocationDataTable";
import { notifyError, notifySuccess } from "../../Component/Toast/Toast";
import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";
import CustomToastContainer from "../../Component/Toast/ToastContainer";
/**
 * Location component responsible for managing locations and rendering location data.
 * @returns {JSX.Element} JSX element representing the Location component.
 */
const Location = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  //func:Function to handle form submission

  const onSubmit = (data) => {
    addLocation.mutate(data);
    reset();
  };
  // Query for getting location data

  const {
    isPending,
    error,
    data: LocationData,
  } = useQuery({
    queryKey: ["LocationData"],
    queryFn: getLocationData,
  });
  const successMessage = "Location has been added successfully";
  //func: Mutation hook for adding a location

  const addLocation = useMutation({
    mutationFn: (formData) => {
      return locationAdd(formData.location);
    },
    onSuccess: (data) => {
      notifySuccess(successMessage);
      queryClient.invalidateQueries("LocationData");
    },
    onError: (error) => {
      notifyError("Error adding location");
    },
  });
  //func: Mutation hook for deleting a location

  const deleteMessage = "Location has been deleted successfully";
  const DeleteLocation = useMutation({
    mutationFn: (location) => {
      return locationDelete(location);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("LocationData");
      notifySuccess("Location has been deleted");
    },
    onError: (error) => {
      notifyError("Error Deleting Locaiton");
    },
  });
  const [locationId, setLocationId] = useState();
  const [deleteConfirmationShow, setDeleteConfirmationShow] = useState(false);

  const handleCancelClick = () => {
    setDeleteConfirmationShow(false);
  };
  const handleProceedClick = () => {
    DeleteLocation.mutate(locationId);
    setDeleteConfirmationShow(false);
  };

  const handleDeleteClick = (location) => {
    setDeleteConfirmationShow(true);
    setLocationId(location);
  };
  // if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {deleteConfirmationShow ? (
        <DeleteConfirmation
          deleteName="location"
          handleCancelClick={handleCancelClick}
          handleProceedClick={handleProceedClick}
        />
      ) : (
        <></>
      )}
      {/* Main content */}

      <section className="content-wrapper">
        <div className="content-radius category">
          <div className="content__header">
            <h2>Locations</h2>
          </div>
          <div className="category__content">
            <LocationDataTable
              LocationData={LocationData}
              isPending={isPending}
              handleDeleteClick={handleDeleteClick}
              handleProceedClick={handleProceedClick}
            />
            {/* Add location form */}

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
                    required={Model.location.required}
                    errors={errors}
                    value={Model.location.pattern.value}
                    message={Model.location.pattern.message}
                    type={Model.location.type}
                    placeholder="Enter the location name"
                    minLength={Model.location.minLength.value}
                    minMessage={Model.location.minLength.message}
                    maxLength={Model.location.maxLength.value}
                    maxMessage={Model.location.maxLength.message}
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
        {/* Toast container */}
        <CustomToastContainer />
      </section>
    </>
  );
};
export default Location;
