import { getTokenFromLocalStorage } from "../../utils/StorageUtils";
import instance from "../../axios/Axios";

const token = getTokenFromLocalStorage();

/**
 * Retrieves department data from the server.
 */
export const getDepartmentData = async () => {
  const departmentData = await instance.get("/department", {
    headers: { Authorization: `Bearer ${token}` },
  });
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

export const departmentDelete = async (departmentId) => {
  try {
    const response = await instance.delete(`/department?id=${departmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {}
};
/**
 * Updates department data on the server.
 * @param {string} newDepartment - The new name for the department.
 * @param {string} prevDepartmentId - The previous id of the department.
 */

export const updateDepartmentData = async (newDepartment, prevDepartmentId) => {
  try {
    const response = await instance.put(
      `/department?id=${prevDepartmentId}`,
      {
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
    throw error; // Rethrow the error so that the caller can handle it if necessary
  }
};

//sorting
export const sortByStatusDepartment = async (newOrder, status) => {
  try {
    const response = await instance.get(
      `/department?sortorder=${newOrder}&orderby=${status}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const searchData = response.data.data;
    return searchData;
  } catch (error) {
    throw error;
  }
};
