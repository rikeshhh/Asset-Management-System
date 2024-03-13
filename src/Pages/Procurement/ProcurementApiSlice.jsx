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

export const getProductList = async (productId) => {
  try {
    const response = await instance.get(`/procurement?id=${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.procurementInfo;
  } catch (error) {
    console.log(error);
  }
};

export const productDelete = async (productId) => {
  try {
    const response = await instance.delete(
      `/procurement?product_id=${productId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
