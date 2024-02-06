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

export const locationDelete = async (location) => {
  const locationDelete = await instance.delete("/location", {
    data: {
      location: location,
    },

    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const locationEdit = async (newLocation, prevLocation) => {
  // let bodyContent = {
  //   previousLocation: prevLocation,
  //   newLocation: newLocation,
  // };
  // let headerContent = {
  //   Authorization: `Bearer ${token}`,
  //   "Content-Type": "application/json",
  // };
  const locationEdit = await instance.put(
    "/location",
    {
      previousLocation: prevLocation,
      newLocation: newLocation,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
