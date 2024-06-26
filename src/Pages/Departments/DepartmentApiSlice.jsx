import React from "react";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";
import instance from "../../axios/Axios";

const token = getTokenFromLocalStorage();

/**
 * Retrieves department data from the server.
 */
export const getDepartmentData = async (
  departmentTableData,
  departmentTableDataOrder
) => {
  const departmentData = await instance.get(
    `/department?sortorder=${departmentTableDataOrder}&orderby=${departmentTableData}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const resp = await departmentData.data.data;
  return resp;
};
/**
 * Retrieves department data for select input from the server.
 */

export const selectInputDepartment = async () => {
  const departmentData = await instance.get("/department", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const resp = await departmentData.data.data;
  return resp;
};

/**
 * Adds a new department to the server.
 *  @param {string} department - The name of the department to be added.
 */

export const departmentAdd = async (department) => {
  const departmentData = await instance.post(
    "/department",
    {
      department: department,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
/**
 * Deletes a department from the server.
 * @param {string} department - The name of the department to be deleted.
 
 */

export const departmentDelete = async (department) => {
  try {
    const response = await instance.delete("/department", {
      params: {
        id: department,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
};
/**
 * Updates department data on the server.
 * @param {string} newDepartment - The new name for the department.
 * @param {string} prevDepartment - The previous name of the department.
 */

export const updateDepartmentData = async (newDepartment, prevDepartment) => {
  try {
    const response = await instance.put(
      "/department",
      {
        previousDepartment: prevDepartment,
        newDepartment: newDepartment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // Assuming you want to return the response data
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error so that the caller can handle it if necessary
  }
};
