import instance from "../../axios/Axios";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";

const token = getTokenFromLocalStorage();
export const getTableData = async () => {
  try {
    const getTableResp = await instance.get("https://dummyjson.com/products");
    const resp = getTableResp.data;
    console.log("api response", resp);
    return resp;
  } catch (error) {
    // Log the error or handle it as needed
    console.error("Axios error:", error);
    throw error;
  }
};
