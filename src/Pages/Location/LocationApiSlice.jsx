import { notifyError } from "../../Component/Toast/Toast";
import instance from "../../axios/Axios";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";

const token = getTokenFromLocalStorage();
/**
 * Function to fetch location data from the server.
 */
export const getLocationData = async () => {
  const locationData = await instance.get("/location", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const resp = await locationData.data.data;
  return resp;
};
/**
 * Function to fetch location data for select input from the server.
 */
export const selectInputLocation = async () => {
  const locationData = await instance.get("/location", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const resp = await locationData.data.data;
  return resp;
};
/**
 * Function to add a new location.
 * @param {string} location - The location to add.
 */
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
/**
 * Function to delete a location.
 */
export const locationDelete = async (location) => {
  const locationDelete = await instance.delete(`/location?id=${location}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
/**
 * Function to edit a location.
 */
export const locationEdit = async (newLocation, prevLocationId) => {
  const locationEdit = await instance.put(
    `/location?id=${prevLocationId}`,
    {
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
