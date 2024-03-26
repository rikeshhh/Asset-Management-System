import instance from "../../axios/Axios";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";

const token = getTokenFromLocalStorage();
export const getProcurementTableData = async (
  pageNumber,
  searchProcurement,
  newOrder,
  sortData,
  filterByApprovedDate,
  filterByStatus,
  filterByUser,
  filterByApproved
) => {
  try {
    const response = await instance.get(
      `/procurement?page=${pageNumber}&search=${searchProcurement}&sortBy=${sortData}&order=${newOrder}&requestedBy=${filterByUser}&status=${filterByStatus}&approvedBy=${filterByApproved}&approvedDate=${filterByApprovedDate}`,

      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
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

export const procurementAdd = async (procurementForm) => {
  console.log("tabledata => ", procurementForm.tableData);
  try {
    const response = await instance.post(
      "/procurement",
      {
        requested_by_id: procurementForm.formData.requested_by,
        status: "approved",
        request_urgency: procurementForm.formData.request_urgency,
        approved_by_id: procurementForm.formData.requested_by,
        products: procurementForm.tableData,
      },
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

export const deleteProcurement = async (id) => {
  const procurementDelete = await instance.delete(`/procurement?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
