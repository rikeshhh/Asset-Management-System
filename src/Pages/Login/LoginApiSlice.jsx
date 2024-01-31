import axios from "../../axios/Axios";

export const verifyUser = async (username, password) => {
  const userResponse = await axios.post("/login", {
    username: username,
    password: password,
  });
  const resp = await userResponse.data;
  return resp;
};
