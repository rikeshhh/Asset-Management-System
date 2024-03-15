// import instance from "../../axios/Axios";
// import { getTokenFromLocalStorage } from "../../utils/StorageUtils";

// const token = getTokenFromLocalStorage();

// const getImage = async (file) => {
//   const response = await instance.get(`/image?image_path=${file}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   const resp = response.data;

//   console.log(resp);
// };

// export default getImage;

import instance from "../../axios/Axios";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";

const token = getTokenFromLocalStorage();

const getImage = async (file) => {
  try {
    const response = await instance.get(`/image?image_path=${file}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'arraybuffer', // Set responseType to 'arraybuffer' for binary data
    });

    const data = response.data;

    // If you need to handle the image data, you can return it
    return data;
  } catch (error) {
    // Handle errors appropriately
    console.error('Error fetching image:', error);
    throw error;
  }
};




export default getImage;
