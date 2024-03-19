import instance from "../../axios/Axios";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";

const token = getTokenFromLocalStorage();

export const getRepairTableData = async (searchData, sortData, sortOrder) => {
  try {
    const response = await instance.get(
      `/repairreplace?searchKeyword=${searchData}&orderby=${sortData}&sortorder=${sortOrder}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};

export const getReplaceTableData = async (searchData, sortData, sortOrder) => {
  try {
    const response = await instance.get(
      `/repairreplace?type=Replace&searchKeyword=${searchData}&orderby=${sortData}&sortorder=${sortOrder}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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

  console.log(repairFormData);
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
export const repairReplaceEdit = async (
  repairReplaceData,
  selectedJobType,
  productId
) => {
  let repairFormData = new FormData();
  repairFormData.append("id", productId);
  repairFormData.append("Product_Code", repairReplaceData.Product_Code);
  repairFormData.append("Product_Name", repairReplaceData.Product_Name);
  repairFormData.append("Assigned_to", repairReplaceData.Assigned_to);
  repairFormData.append("product_image", repairReplaceData.product_image.path);
  repairFormData.append("reason", repairReplaceData.reason);
  repairFormData.append("status", "Sent");
  repairFormData.append("repairreplace_type", selectedJobType);
  repairFormData.append("Category", repairReplaceData.Category);
  repairFormData.append("_method", "PUT");

  console.log(repairFormData);
  try {
    const response = await instance.post(
      `/repairreplace?id=${productId}`,
      repairFormData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw { message: error.response.data.message.message.repairreplace };
  }
};

export const deleteRepairReplace = async (id) => {
  const repairReplaceDelete = await instance.delete(`/repairreplace?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
