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
  try {
    const response = await instance.put(
      "/assets",

      {
        name: assetsInfo.name,
        assets_type: assetsInfo.type,
        category: "",
        sub_category: "",
        brand: assetsInfo.brand,
        location: assetsInfo.location,
        assigned_to: "",
        status: "inactive",
        assets_image: "table.img",
      },
      {
        params: {
          id: assetsInfo.id,
        },
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      }
    );
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};

export const assetsAdd = async (assetsData) => {
  var formdata = new FormData();

  formdata.append("name", assetsData.name);
  formdata.append("assets_type", assetsData.assets_type);
  formdata.append("category", assetsData.category);
  formdata.append("sub_category", assetsData.sub_category);
  formdata.append("brand", assetsData.brand);
  formdata.append("location", assetsData.location);
  formdata.append("assigned_to", assetsData.assigned_to);
  formdata.append("assets_image", assetsData.assets_image);

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

export const getSearchInput = async (itemName) => {
  try {
    const response = await instance.get(
      `/assets?search=${itemName}`,
      // {
      //   params: {
      //   search= itemName,
      //   },
      {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      }
    );
    const searchData = response.data.data.data;
    return searchData;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};

export const getAssetsData = async (assetsType) => {
  try {
    const response = await instance({
      method: "get",
      url: "/assets",
      params: { assets_type: assetsType },
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
export const getHardwareData = async () => {
  try {
    const response = await instance.get(
      `/assets?assets_type=hardware`,
      // {
      //   params: {
      //   search= itemName,
      //   },
      {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      }
    );
    const searchData = response.data.data.data;
    return searchData;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};
