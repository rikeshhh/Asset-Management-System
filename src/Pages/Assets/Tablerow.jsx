import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";
import { deleteAssetsTableData } from "./AssetsApiSlice";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { PiEyeLight } from "react-icons/pi";
import Button from "../../Component/Button/Button";

const Tablerow = ({ tableItem }) => {
  const navigate = useNavigate();
  const handleDeleteAssets = () => {
    deleteAssetsTableData(tableItem.id);
  };
  const handleTableEdit = (tableData) => {
    navigate("/editAssets", {
      state: { tableData: tableData },
    });
  };
  const handleTableView = (tableData) => {
    navigate("/viewAssets", {
      state: { tableData: tableData },
    });
  };
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);

  // if (isPending) return "Loading...";
  const handleDeleteConfirmationModel = () => {
    setDeleteConfirationShow(true);
  };

  return (
    <>
      {deleteConfirationShow && (
        <DeleteConfirmation
          deleteName="assetsId"
          handleCancelClick={() => setDeleteConfirationShow(false)}
          handleProceedClick={handleDeleteAssets}
        />
      )}
      <tr>
        <td data-cell="id">ITJ-HW-{tableItem.id}</td>
        <td data-cell="name">
          <p
            className={`${tableItem.name}`.length >= 12 ? "hoverEffect" : ""}
            data-name={`${tableItem.name}`}
          >
            {" "}
            {tableItem.name}
          </p>
        </td>
        <td data-cell="category">{tableItem.category}</td>
        <td data-cell="status">{tableItem.status}</td>
        <td data-cell="assigned_to">{tableItem.assigned_to_name}</td>
        <td data-cell="assigned_date">{tableItem.created_at}</td>
        <td className="button-gap">
          {/* <Link  to={{ pathname: '/profile', state: false }}>
         </Link> */}

          <Button
            type={"button"}
            className="view__button"
            handleClick={() => handleTableView(tableItem)}
            text={<PiEyeLight />}
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
