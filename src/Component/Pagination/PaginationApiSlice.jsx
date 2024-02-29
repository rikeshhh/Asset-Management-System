import instance from "../../axios/Axios";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";

const token = getTokenFromLocalStorage();
export const getPaginationData = async (page,type) => {
  try {
    const response = await instance.get(`/assets?assets_type=${type}&page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const pageData = response.data.data.data;
    return pageData;
  } catch (error) {
    throw error;
  }
};
