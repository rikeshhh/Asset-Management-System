import instance from "../../axios/Axios";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";

const token = getTokenFromLocalStorage();
export const getCategoryData = async () => {
  const categoryData = await instance.get("/category", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const resp = await categoryData.data.data;
  return resp;
};

export const categoryAdd = async (parentCategory) => {
  const categoryDataAdd = await instance.post(
    "/category",
    {
      category_name: "hello",
      parent: parentCategory,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const categoryDelete = async (parentCategory) => {
  const categoryDeleteRequest = await instance.delete(`/category`, {
    params: { parentCategory: parentCategory },
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const categoryEdit = async (newCategory, prevCategory) => {
  const categoryEditRequest = await instance.put(
    "/category",
    {
      newParent: newCategory,
      previousParent: prevCategory,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
