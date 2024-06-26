import "../../Component/DataTable/DataTable.css";

import { useMutation } from "@tanstack/react-query";
import { InputField } from "../../Component/Input/InputField";
import { LuArrowDownUp, LuArrowUpDown } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { useState } from "react";
import Button from "../../Component/Button/Button";
import { locationEdit, sortByStatusLocation } from "./LocationApiSlice";
import { queryClient } from "../../Component/Query/Query";
import { useForm } from "react-hook-form";
import Model from "../../Component/Model/Model";
import { RxCross1 } from "react-icons/rx";
import { notifyError, notifySuccess } from "../../Component/Toast/Toast";
import SmallTablePendingHead from "../../Component/PendingTableSmall/SmallTablePendingHead";
import SmallTablePendingBody from "../../Component/PendingTableSmall/SmallTablePendingBody";
import { FaCheck } from "react-icons/fa6";
/**
 * LocationDataTable component responsible for rendering a table displaying location data.
 * @returns {JSX.Element} JSX element representing the LocationDataTable component.
 */
const LocationDataTable = ({
  LocationData,
  isPending,
  handleDeleteClick,
  setDisableButtons,
  disableButtons,
  setLocationTableDataOrder,
  locationTableData,
  locationTableDataOrder,
  setLocationTableData,
}) => {
  const [show, setShow] = useState(false);
  // func:Mutation hook for editing location
  const EditLocation = useMutation({
    mutationFn: (editData) => {
      return locationEdit(editData.data, editData.id);
    },
    onSuccess: () => {
      notifySuccess(successMessage);
      queryClient.invalidateQueries("LocationData");
      setDisableButtons(false);

      setShow(false);
      reset();
    },
    onError: (error) => {
      notifyError(error.response.data.message.message.newLocation);
    },
  });

  const [previousLocationId, setPreviousLocationId] = useState("");
  const [previousLocation, setPreviousLocation] = useState("");

  const handleEditButtonClick = (options) => {
    setDisableButtons(true);
    setPreviousLocationId(options.id);
    setPreviousLocation(options.location);
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
    if (previousLocation === data.location) {
      setShow(false);
      setDisableButtons(false);
    } else {
      const editData = {
        data: data.location,
        id: previousLocationId,
      };
      EditLocation.mutate(editData);
      // console.log("editData", editData.data);
    }
  };
  const successMessage = "Location has been updated successfully";

  // const onDeleteData = (location) => {
  //   DeleteLocation.mutate(location);
  // };
  const onEditCancel = () => {
    setDisableButtons(false);

    setShow(false);
    reset();
  };

  const handleDeleteLocation = (locationId) => {
    handleDeleteClick(locationId);
  };

  const handleStatusClick = () => {
    const newOrder = locationTableDataOrder === "ASC" ? "DESC" : "ASC";
    setLocationTableData("location");
    setLocationTableDataOrder(newOrder);
  };

  return (
    <section className="cateogries location table__container">
      <table>
        <thead>
          {isPending ? (
            <SmallTablePendingHead />
          ) : (
            <tr>
              <th>S.N.</th>
              <th
                className={
                  locationTableData === "location" ? "selected-tablehead" : ""
                }
              >
                Location{" "}
                <span className="sort__icon">
                  <LuArrowUpDown onClick={handleStatusClick} />
                </span>
              </th>
              <th>Action</th>
            </tr>
          )}
        </thead>
        <tbody>
          {isPending ? (
            <SmallTablePendingBody />
          ) : (
            LocationData.map((options, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {options.id === previousLocationId && show ? (
                  <td
                    className={
                      show && !errors.location
                        ? "universal__td--border"
                        : " universal__td--border error__validation__outline"
                    }
                  >
                    <form
                      onSubmit={handleSubmit(onLocationEditSubmit)}
                      className="universal__update--form "
                    >
                      <div className=" universal__input--container ">
                        <InputField
                          name="location"
                          register={register}
                          errors={errors}
                          defaultValue={options.location}
                          pattern={Model.location.pattern}
                          message={Model.location.pattern.message}
                          value={Model.location.pattern.value}
                          type={Model.location.type}
                          placeholder={options.location}
                          minLength={Model.location.minLength.value}
                          maxLength={Model.location.maxLength.value}
                          minMessage={Model.location.minLength.message}
                          maxMessage={Model.location.maxLength.message}
                          required={"Please enter a location name"}
                          className={show ? "universal__table--input " : ""}
                        ></InputField>
                      </div>
                      <div className="universal__FormButton">
                        <Button className="" text={<FaCheck />} />
                        <Button
                          type="button"
                          className=""
                          text={<RxCross1 />}
                          handleClick={onEditCancel}
                        />
                      </div>
                    </form>
                  </td>
                ) : (
                  <td
                    className={
                      options.location.length > 20
                        ? "hoverEffect  universal-input__container--editable-padding"
                        : ""
                    }
                    data-name={`${options.location}`}
                  >
                    {options.location.length > 20
                      ? `${options.location.substring(0, 20)}...`
                      : options.location}
                  </td>
                )}
                <td className="button-gap">
                  <Button
                    className={
                      disableButtons ? "small-button__disabled" : "edit__button"
                    }
                    text={<CiEdit />}
                    isDisabled={disableButtons ? true : false}
                    handleClick={() => handleEditButtonClick(options)}
                  />
                  <Button
                    className={
                      disableButtons
                        ? "small-button__disabled"
                        : "delete__button"
                    }
                    text={<GoTrash />}
                    isDisabled={disableButtons ? true : false}
                    handleClick={() => handleDeleteLocation(options.id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default LocationDataTable;
