import instance from "../../axios/Axios";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";

const token = getTokenFromLocalStorage();

const getImage = async (file) => {
  try {
    const response = await instance.get(`/image?image_path=${file}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "arraybuffer", // Set responseType to 'arraybuffer' for binary data
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};

export default getImage;
