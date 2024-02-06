import { useMutation } from "@tanstack/react-query";
import { InputField } from "../../Component/Input/InputField";
import { LuArrowDownUp } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { useState } from "react";
import Button from "../../Component/Button/Button";
import { locationDelete, locationEdit } from "./LocationApiSlice";
import { queryClient } from "../../Component/Query/Query";
import { useForm } from "react-hook-form";
import Model from "../../Component/Model/Model";

const LocationDataTable = ({ LocationData }) => {
  const DeleteLocation = useMutation({
    mutationFn: (location) => {
      return locationDelete(location);
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

  const EditLocation = useMutation({
    mutationFn: (editData) => {
      return locationEdit(editData.data, editData.previousLocation);
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

  const [previousLocation, setPreviousLocation] = useState("");

  const handleEditButtonClick = (location) => {
    // setEditedLocation(location);
    setPreviousLocation(location);
    setShow(false);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: { location: previousLocation },
  });

  const onLocationEditSubmit = (data) => {
    const editData = {
      data: data.location,
      editedLocation: previousLocation,
    };
    EditLocation.mutate(editData);
  };

  const onDeleteData = (location) => {
    DeleteLocation.mutate(location);
  };
  const [show, setShow] = useState(true);
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
          {LocationData.map((options, index) => (
            <tr key={index}>
              <td>{options.id}</td>
              {show ? (
                <td>{options.location}</td>
              ) : (
                <td>
                  <form onSubmit={handleSubmit(onLocationEditSubmit)}>
                    <InputField
                      name="location"
                      register={register}
                      required={Model.Group.required}
                      errors={errors}
                      type={Model.Group.type}
                      placeholder={options.location}
                      minLength={Model.Group.minLength}
                      maxLength={Model.Group.maxLength}
                    />
                  </form>
                </td>
              )}

              <td className="button-gap">
                <Button
                  className="edit__button"
                  text={<CiEdit />}
                  handleClick={() => handleEditButtonClick(options.location)}
                />
                <Button
                  className="delete__button"
                  text={<GoTrash />}
                  handleClick={() => onDeleteData(options.location)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default LocationDataTable;
