import instance from "../../axios/Axios";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";

const token = getTokenFromLocalStorage();
/**
 * Edits an employee's profile data using a PUT request.
 * @param {Object} employeeData - The data of the employee to be edited.
 * @param {string} employeeData.employeeData.username - The username of the employee.
 * @param {string} employeeData.employeeData.email - The email of the employee.
 * @param {string} employeeData.id - The ID of the employee.
 */
export const employeeEdit = async (employeeData) => {
  const employeeDeleteRequest = await instance.put(
    `/user`,
    {
      username: employeeData.employeeData.username,
      password: "xddfxdfx",
      email: employeeData.employeeData.email,
      name: employeeData.employeeData.username,
    },
    {
      params: {
        id: employeeData.id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
/**
 * Adds a new employee profile using a POST request.
 * @param {Object} employeeData - The data of the new employee profile.
 * @param {string} employeeData.username - The username of the employee.
 * @param {string} employeeData.email - The email of the employee.
 */
export const employeeProfile = async (employeeData) => {
  const employeeAddRequest = await instance.post(
    "/user",
    {
      username: employeeData.username,
      password: "adminadmin",
      email: employeeData.email,
      name: employeeData.username,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
