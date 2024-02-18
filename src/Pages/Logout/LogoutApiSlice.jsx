import instance from "../../axios/Axios";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";
/**
 * Logs out the currently authenticated user by performing a POST request to the `/logout` endpoint.
 */

const token = getTokenFromLocalStorage();
export const logoutUser = async () => {
  const headerList = {
    Authorization: `Bearer ${token}`,
  };
  const logoutUserRequest = await instance.post("/logout", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
