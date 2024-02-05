import instance from "../../axios/Axios";

export const verifyUser = async (username, password) => {
  var formdata = new FormData();
  formdata.append("username", username);
  formdata.append("password", password);

  const userResponse = await instance.post("/login", formdata, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  const resp = await userResponse.data;
  return resp;
};
