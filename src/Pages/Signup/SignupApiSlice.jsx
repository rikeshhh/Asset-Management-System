import React from "react";
import instance from "../../axios/Axios";
/**
 * Sends a POST request to create a new user.
 * @param {string} username - The username of the new user.
 * @param {string} email - The email of the new user.
 * @param {string} password - The password of the new user.
 
 */

export const postData = async (
  name,
  username,
  email,
  password,
  RetypePassword
) => {
  const userResponse = await instance.post(
    "/signup",
    {
      name: name,
      username: username,
      email: email,
      password: password,
      retyped_password: RetypePassword,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const resp = await userResponse.data;
  return resp;
};
