import { BsXLg } from "react-icons/bs";
import instance from "../../axios/Axios";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";

const token = getTokenFromLocalStorage(); //Get the authentication token from local storage.

/**
 * Retrieves employee table data from the server.
 */
export const getEmployeeTableData = async (searchKeyword) => {
  try {
    const response = await instance.get(
      `/user?searchKeyword=${searchKeyword}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};

/**
 * Deletes an employee with the specified ID.
 * @param {string} employeeId - The ID of the employee to be deleted.
 */
export const employeeDelete = async (employeeId) => {
  const employeeDeleteRequest = await instance.delete("/user", {
    params: {
      id: employeeId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// export const searchUser = async (searchKeyword, sortOrder, orderby) => {
//   try {
//     const response = await instance.get(
//       `/user?searchKeyword=${searchKeyword}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const responseData = await response.data.data;
//     console.log("responseData", responseData);
//     return responseData;
//   } catch (err) {
//     console.log("error", err);
//   }
// };
