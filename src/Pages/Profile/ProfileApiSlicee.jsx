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
export const employeeProfile = async (
  employeeData,
  employeeDataImage,
  jobType
) => {
  console.log(jobType);
  var formData = new FormData();
  formData.append("user_image", employeeDataImage);
  formData.append("name", employeeData.username);
  formData.append("job_type", jobType);
  formData.append("designation", employeeData.designation);
  formData.append("department", employeeData.departmentId);
  formData.append("email", employeeData.email);
  formData.append("phone_number", employeeData.phoneNumber);
  const employeeAddRequest = await instance.post("/user", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  const resp = await employeeAddRequest.data;
  return resp;
};
