import instance from "../../axios/Axios";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";

const token = getTokenFromLocalStorage();
export const getProcurementTableData = async () => {
  try {
    const response = await instance.get("/procurement", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data.data;
  } catch (error) {
    throw error;
  }
};
