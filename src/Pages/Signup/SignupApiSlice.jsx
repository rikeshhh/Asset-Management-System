import React from 'react'
import instance from '../../axios/Axios';

export const postData = async(username,email,password) => {
    const userResponse = await instance.post(
      "/user",
      {
        name:username,
        username: username,
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resp = await userResponse.data;
    return resp;
}
