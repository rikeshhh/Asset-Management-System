import instance from "../../axios/Axios";

export const verifyUser = async (username, password) => {
  const userResponse = await instance.post(
    "/login",
    {
      username: username,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  const resp = await userResponse.data;
  return resp;
};