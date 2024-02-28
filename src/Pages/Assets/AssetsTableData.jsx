import "../../Component/Table/Table.css";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { useMutation, useQuery } from "@tanstack/react-query";
import Button from "../../Component/Button/Button";
import { deleteAssetsTableData, getAssetsTableData } from "./AssetsApiSlice";
import PendingTableHead from "../../Component/PendingTable/PendingTableHead";
import PendingTableBody from "../../Component/PendingTable/PendingTableBody";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import Tablerow from "./Tablerow";
const AssetsTableData = ({ isPending, tableData }) => {

  return (
    <>
    
      <div className="table__container">
        <table className="main__table">
          <thead>
            {isPending ? (
              <PendingTableHead />
            ) : (
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Assigned to</th>
                <th>Assigned date</th>
                <th>Action</th>
              </tr>
            )}
          </thead>
          <tbody>
            {isPending ? (
              <PendingTableBody />
            ) : (
              tableData.map((tableItem, index) => (
                <Tablerow tableItem={tableItem} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default AssetsTableData;
