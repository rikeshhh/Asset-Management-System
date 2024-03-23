import instance from "../../axios/Axios";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";

const token = getTokenFromLocalStorage();
/**
 * Retrieve assets table data from the server.
 * @returns {Promise} A promise that resolves with the assets data.
 */
export const getAssetsTableData = async () => {
  try {
    const response = await instance.get("/assets", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const assetsData = response.data.data.data;
    return assetsData;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete an asset from the assets table data.
 * @param {string} assetsId - The ID of the asset to be deleted.
 * @returns {Promise} A promise that resolves if the deletion is successful.
 */
export const deleteAssetsTableData = async (assetsId) => {
  try {
    const response = await instance.delete("/assets", {
      params: {
        id: assetsId,
      },
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Edit assets data and update it on the server.
 * @param {Object} assetsInfo - The updated assets information.
 * @param {string} productID - The ID of the product being edited.
 * @returns {Promise} A promise that resolves if the update is successful.
 */
export const assetsEdit = async (assetsInfo, productID, assetsImage) => {
  var formdata = new FormData();
  console.log(assetsImage, "assetImages");
  formdata.append("id", productID);
  formdata.append("name", assetsInfo.productName);
  formdata.append("assets_type", assetsInfo.assets_type.toLowerCase());
  formdata.append("category", assetsInfo.category);
  formdata.append("sub_category", assetsInfo.sub_category);
  formdata.append("brand", assetsInfo.brandCompany);
  formdata.append("location", assetsInfo.location);
  formdata.append("assigned_to", assetsInfo.assigned_to);
  formdata.append("assets_image", assetsImage);
  if (assetsInfo.status === true) {
    formdata.append("status", "active");
  } else {
    formdata.append("status", "inactive");
  }
  formdata.append("_method", "PUT");
  try {
    const response = await instance.post(`/assets?id=${productID}`, formdata, {
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "multipart/form-data",
    });
  } catch (error) {
    throw error;
  }
};
/**
 * Add new assets to the database.
 * @param {Object} assetsData - The data of the assets to be added.
 * @returns {Promise} A promise that resolves if the addition is successful.
 */
export const assetsAdd = async (assetsData) => {
  var formdata = new FormData();
  formdata.append("name", assetsData.productName);
  formdata.append("assets_type", assetsData.assets_type);
  formdata.append("category", assetsData.category);
  formdata.append("sub_category", assetsData.sub_category);
  formdata.append("brand", assetsData.brandCompany);
  formdata.append("location", assetsData.location);
  formdata.append("assigned_to", assetsData.assigned_to);
  formdata.append("assets_image", assetsData.assets_image);
  if (assetsData.status === true) {
    formdata.append("status", "active");
  } else {
    formdata.append("status", "inactive");
  }

  try {
    const response = await instance.post("/assets", formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Retrieve assets data based on various parameters.
 * @param {string} assetsType - The type of assets to retrieve.
 * @param {string} searchAssets - The search query for assets.
 * @param {number} pageNumber - The page number of the assets data.
 * @param {string} searchCategory - The category to search within.
 * @param {string} assignedDate - The assigned date to filter by.
 * @returns {Promise} A promise that resolves with the filtered assets data.
 */
export const getAssetsData = async (
  assetsType,
  searchAssets,
  pageNumber,
  searchCategory,
  assignedDate,
  by_assets_type,
  order
) => {
  try {
    const response = await instance({
      method: "get",
      url: "/assets",
      params: {
        assets_type: assetsType,
        search: searchAssets,
        page: pageNumber,
        category: searchCategory,
        assigned_date: assignedDate,
        order: order,
        sortBy: by_assets_type,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const searchData = response.data.data;
    return searchData;
  } catch (error) {
    throw error;
  }
};

export const getFilterData = async (categoryName, status, searchDate) => {
  try {
    const response = await instance({
      method: "get",
      url: "/assets",
      params: {
        name: categoryName,
        status: status,
        date: searchDate,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const filterData = response.data.data.data;
    return filterData;
  } catch (error) {
    throw error;
  }
};

//select user
export const selectUser = async () => {
  try {
    const response = await instance.get("/user", {
      params: {
        _getall: true,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = response.data.data.data;
    return userData;
  } catch (error) {
    throw error;
  }
};
//sorting
export const sortByStatus = async (status, assets_type, newOrder) => {
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
