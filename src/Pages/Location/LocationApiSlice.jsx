import instance from "../../axios/Axios";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";

const token = getTokenFromLocalStorage();
export const getLocationData = async () => {
  const locationData = await instance.get("/location", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const resp = await locationData.data.data;
  return resp;
};

export const locationAdd = async (location) => {
  const locationData = await instance.post(
    "/location",
    {
      location: location,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
