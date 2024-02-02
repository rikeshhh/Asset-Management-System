import instance from "../../axios/Axios";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";

const token = getTokenFromLocalStorage();
export const getTableData = async () => {
  try {
    const getTableResp = instance.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const resp = getTableResp.data;

    return resp;
  } catch (error) {
    // Log the error or handle it as needed
    console.error("Axios error:", error);
    throw error;
  }
};
