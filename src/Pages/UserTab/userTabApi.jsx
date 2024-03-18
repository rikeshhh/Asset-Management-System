import React from "react";
import instance from "../../axios/Axios";
const token = localStorage.getItem("Token");
export const getUserData = async (userId) => {
  try {
    const response = await instance.get(
      `/user?id=${userId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
    console.log(response.data.data);
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};

