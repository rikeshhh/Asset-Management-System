import instance from "../../axios/Axios";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";

const token = getTokenFromLocalStorage();
export const getEmployeeTableData = async () => {
  try {
    const response = await instance.get("/user?", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};

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
