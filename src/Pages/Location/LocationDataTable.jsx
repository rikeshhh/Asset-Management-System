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
import { IoMdCheckmark } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { notify } from "../../Component/Toast/Toast";
import { ToastContainer } from "react-toastify";

const LocationDataTable = ({ LocationData }) => {
  const [show, setShow] = useState(false);

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
      notify(successMessage)
      queryClient.invalidateQueries("LocationData");
      setShow(false);
      reset();
    },
    onError: (error) => {
      if (error.response.status === 401) {
        console.log("Unauthorized: Please log in with valid id.");
      }
    },
  });

  const [previousLocation, setPreviousLocation] = useState("");
  const [previousLocationId, setPreviousLocationId] = useState("");

  const handleEditButtonClick = (options) => {
    setPreviousLocation(options.location);
    setPreviousLocationId(options.id);
    setShow(true);
    reset();
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onLocationEditSubmit = (data) => {
    const editData = {
      data: data.location,
      previousLocation: previousLocation,
    };
    EditLocation.mutate(editData);
  };
  const successMessage = "Location has been updated successfully"

  const handleEditCancel = () => {
    setShow(false);
    reset();
  };

  const onDeleteData = (location) => {
    DeleteLocation.mutate(location);
  };
  const onMiniDelete = () => {
    setShow(false)
    reset();
  }
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
              <td>{index + 1}</td>
              {options.id === previousLocationId && show ? (
                <td className={show ? "universal__td--border" : ""}>
                  <form className="universal__update--form" onSubmit={handleSubmit(onLocationEditSubmit)}>
                    <InputField
                      name="location"
                      register={register}
                      required={Model.Group.required}
                      errors={errors}
                      autoComplete={"off"}
                      type={Model.Group.type}
                      className={show ? "universal__table--input" : ''}
                      placeholder={options.location}
                      minLength={Model.Group.minLength}
                      maxLength={Model.Group.maxLength}
                    ></InputField>
                    <div className="Universal__FormButton">
                      <Button className="" text={<IoMdCheckmark />} />
                      <Button
                        type='button'
                        className=""
                        text={<RxCross1 />}
                        handleClick={onMiniDelete}
                      />
                    </div>
                  </form>
                </td>
              ) : (
                <td>{options.location}</td>
              )}
              <td className="button-gap">
                <Button
                  className="edit__button"
                  text={<CiEdit />}
                  handleClick={() => handleEditButtonClick(options)}
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
