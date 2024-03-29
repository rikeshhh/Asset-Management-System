import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";
import { deleteAssetsTableData } from "./AssetsApiSlice";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import Button from "../../Component/Button/Button";
import { useMutation } from "@tanstack/react-query";
import CustomToastContainer from "../../Component/Toast/ToastContainer";
import { notifyError, notifySuccess } from "../../Component/Toast/Toast";
import { queryClient } from "../../Component/Query/Query";
import { EyeSvg } from "../../Component/svg/EyeSvg";
/**
 * TableRow component represents a single row in the assets table.
 *
 * @param {Object} tableItem - The data of the table row.
 * @returns {JSX.Element} JSX representation of the TableRow component.
 */
const Tablerow = ({ tableItem }) => {
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);
  const DeleteAssets = useMutation({
    mutationFn: (tableItemId) => {
      return deleteAssetsTableData(tableItemId);
    },
    onSuccess: () => {
      notifySuccess("Asset Deleted Successfully");
      queryClient.invalidateQueries("AssetsData");
    },
    onError: (error) => {
      notifyError(error.message);
      if (error.response.status === 401) {
        notifyError("Unauthorized: Please log in with valid id.");
      }
    },
  });
  const navigate = useNavigate();
  const handleDeleteAssets = () => {
    DeleteAssets.mutate(tableItem.id);
    setDeleteConfirationShow(false);
  };
  const handleTableEdit = (tableData) => {
    navigate("/assets/editAssets", {
      state: { tableData: tableData },
    });
  };
  const handleTableView = (tableData) => {
    navigate("/assets/viewAssets", {
      state: { tableData: tableData },
    });
  };

  // if (isPending) return "Loading...";
  const handleDeleteConfirmationModel = () => {
    setDeleteConfirationShow(true);
  };
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);

  const handleTextClick = () => {
    setIsFullTextVisible(!isFullTextVisible);
  };
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };
  return (
    <>
      {deleteConfirationShow && (
        <DeleteConfirmation
          deleteName="Asset"
          handleCancelClick={() => setDeleteConfirationShow(false)}
          handleProceedClick={handleDeleteAssets}
        />
      )}
      <tr>
        {tableItem.assets_type === "Hardware" ? (
          <td data-cell="id">ITJ-HW-{tableItem.id}</td>
        ) : (
          <td data-cell="id">ITJ-SW-{tableItem.id}</td>
        )}
        <td data-cell="name">
          <p
            className={`${tableItem.name.length >= 12 ? "hoverEffect" : ""}`}
            data-name={`${tableItem.name}`}
            onClick={toggleTooltip}
          >
            {" "}
            {tableItem.name.length >= 12
              ? `${tableItem.name.slice(0, 12)}...`
              : tableItem.name}
          </p>
        </td>
        <td data-cell="category">
          {tableItem.category.name ? tableItem.category.name : "N/A"}
        </td>
        <td data-cell="status">{tableItem.status}</td>
        <td data-cell="assigned_to">{tableItem.assigned_to.name}</td>
        <td data-cell="assigned_date">{tableItem.assigned_date}</td>
        <td className="button-gap">
          {/* <Link  to={{ pathname: '/profile', state: false }}>
         </Link> */}

          <Button
            type={"button"}
            className="view__button"
            handleClick={() => handleTableView(tableItem)}
            text={<EyeSvg />}
          />
          <Button
            type={"button"}
            className="edit__button"
            handleClick={() => handleTableEdit(tableItem)}
            text={<CiEdit />}
          />
          <Button
            type={"button"}
            className="delete__button"
            text={<GoTrash />}
            handleClick={() => handleDeleteConfirmationModel()}
          />
        </td>
      </tr>
    </>
  );
};

export default Tablerow;
