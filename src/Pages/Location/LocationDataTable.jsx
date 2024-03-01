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
const LocationDataTable = ({ LocationData, isPending, handleDeleteClick }) => {
  const [show, setShow] = useState(false);
  // func:Mutation hook for editing location
  const EditLocation = useMutation({
    mutationFn: (editData) => {
      return locationEdit(editData.data, editData.id);
    },
    onSuccess: () => {
      notifySuccess(successMessage);
      queryClient.invalidateQueries("LocationData");
      setShow(false);
      reset();
    },
    onError: (error) => {
      notifyError("Error Editing location");
    },
  });

  const [previousLocationId, setPreviousLocationId] = useState("");
  const [previousLocation, setPreviousLocation] = useState("");
  const [locationTableData, setLocationTableData] = useState(null);
  const [locationTableDataOrder, setLocationTableDataOrder] = useState("ASC");

  const handleEditButtonClick = (options) => {
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
    } else {
      const editData = {
        data: data.location,
        id: previousLocationId,
      };
      EditLocation.mutate(editData);
    }
  };
  const successMessage = "Location has been updated successfully";

  // const onDeleteData = (location) => {
  //   DeleteLocation.mutate(location);
  // };
  const onEditCancel = () => {
    setShow(false);
    reset();
  };

  const handleDeleteLocation = (locationId) => {
    handleDeleteClick(locationId);
  };

  const handleStatusClick = async () => {
    try {
      const newOrder = locationTableDataOrder === "ASC" ? "DESC" : "ASC";
      const response = await sortByStatusLocation(newOrder, "location");
      setLocationTableData(response);
      setLocationTableDataOrder(newOrder);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const locationDataToRender = locationTableData || LocationData;

  return (
    <section className="cateogries table__container">
      <table>
        <thead>
          {isPending ? (
            <SmallTablePendingHead />
          ) : (
            <tr>
              <th>S.N.</th>
              <th>
                Location
                <span>
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
            locationDataToRender.map((options, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {options.id === previousLocationId && show ? (
                  <td className={show ? "universal__td--border" : ""}>
                    <form
                      onSubmit={handleSubmit(onLocationEditSubmit)}
                      className="universal__update--form"
                    >
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
                        className={show ? "universal__table--input" : ""}
                      ></InputField>
                      {/* <button>
                    <IoMdCheckmark />
                  </button>
                  <button type="button" onClick={handleEditCancel}>
                    <RxCross1 />
                  </button> */}
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
                    handleClick={() => handleDeleteLocation(options.id)}
                    // handleClick={() => onDeleteData(options.location)}
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
