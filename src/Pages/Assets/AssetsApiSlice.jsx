import instance from "../../axios/Axios";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";

const token = getTokenFromLocalStorage();
export const getAssetsTableData = async () => {
  try {
    const response = await instance.get("/assets", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const assetsData = response.data.data.data;
    return assetsData;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};
export const deleteAssetsTableData = async (assetsId) => {
  try {
    const response = await instance.delete("/assets", {
      params: {
        id: assetsId,
      },
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};
export const assetsEdit = async (assetsInfo) => {
  console.log(assetsInfo);
  var formdata = new FormData();
  formdata.append("id", assetsInfo.productID);
  formdata.append("name", assetsInfo.productName);
  formdata.append("assets_type", assetsInfo.assets_type.toLowerCase());
  formdata.append("category", assetsInfo.category);
  formdata.append("sub_category", assetsInfo.sub_category);
  formdata.append("brand", assetsInfo.brandCompany);
  formdata.append("location", assetsInfo.location);
  formdata.append("assigned_to", assetsInfo.assigned_to);
  formdata.append("assets_image", assetsInfo.assets_image);
  if (assetsInfo.status === true) {
    formdata.append("status", "Active");
  } else {
    formdata.append("status", "Inactive");
  }
  formdata.append("_method", "PUT");
  try {
    const response = await instance.post(
      `/assets?id=${assetsInfo.productID}`,
      formdata,
      {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "multipart/form-data",
      }
    );
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};

export const assetsAdd = async (assetsData) => {
  var formdata = new FormData();
  console.log("status");

  console.log(assetsData.status);
  formdata.append("name", assetsData.productName);
  formdata.append("assets_type", assetsData.assets_type);
  formdata.append("category", assetsData.category);
  formdata.append("sub_category", assetsData.sub_category);
  formdata.append("brand", assetsData.brandCompany);
  formdata.append("location", assetsData.location);
  formdata.append("assigned_to", assetsData.assigned_to);
  formdata.append("assets_image", assetsData.assets_image);
  if (assetsData.status === true) {
    formdata.append("status", "Active");
  } else {
    formdata.append("status", "Inactive");
  }

  try {
    const response = await instance.post("/assets", formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};

export const getAssetsData = async (
  assetsType,
  searchAssets,
  pageNumber,
  byCategory,
  byStatus,
  startDate,
  endDate
) => {
  console.log(byCategory);
  const dateParam = `${startDate}to${endDate}`;

  try {
    const response = await instance({
      method: "get",
      url: "/assets",
      params: {
        assets_type: assetsType,
        search: searchAssets,
        page: pageNumber,
        name: byCategory,
        status: byStatus,
        date: dateParam,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const searchData = response.data.data.data;
    return searchData;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};
export const selectUser = async () => {
  try {
    const response = await instance.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = response.data.data;
    console.log(userData);
    return userData;
  } catch (error) {
    throw error;
  }
};
//sorting
export const sortByStatus = async (status, assets_type, newOrder) => {
  console.log(newOrder);
  try {
    const response = await instance.get(
      `/assets?assets_type=${assets_type}&sortBy=${status}&order=${newOrder}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const searchData = response.data.data.data;
    return searchData;
  } catch (error) {
    throw error;
  }
};
