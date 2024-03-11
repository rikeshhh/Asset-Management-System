import instance from "../../axios/Axios";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";

const token = getTokenFromLocalStorage();

export const getRepairTableData = async () => {
  try {
    const response = await instance.get("/repairreplace", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};

export const getReplaceTableData = async () => {
  try {
    const response = await instance.get("/repairreplace?type=Replace", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};

export const repairReplaceAdd = async (repairReplaceData) => {
  let repairFormData = new FormData();

  repairFormData.append("Product_Code", repairReplaceData.Product_Code);
  repairFormData.append("Assigned_to", repairReplaceData.Assigned_to);
  repairFormData.append("product_image", repairReplaceData.product_image);
  repairFormData.append("reason", repairReplaceData.reason);
  repairFormData.append("Product_Code", repairReplaceData.Product_Code);
  try {
    const response = await instance.post("/repairreplace", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};
