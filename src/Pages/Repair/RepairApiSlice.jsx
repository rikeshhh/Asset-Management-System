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

export const repairReplaceAdd = async (repairReplaceData, selectedJobType) => {
  let repairFormData = new FormData();

  repairFormData.append("Product_Code", repairReplaceData.Product_Code);
  repairFormData.append("Product_Name", repairReplaceData.Product_Name);
  repairFormData.append("Assigned_to", repairReplaceData.Assigned_to);
  repairFormData.append("product_image", repairReplaceData.product_image.path);
  repairFormData.append("reason", repairReplaceData.reason);
  repairFormData.append("status", "Sent");
  repairFormData.append("repairreplace_type", selectedJobType);
  repairFormData.append("Category", repairReplaceData.Category);

  try {
    const response = await instance.post("/repairreplace", repairFormData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};

export const deleteRepairReplace = async (id) => {
  const repairReplaceDelete = await instance.delete(`/repairreplace?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
