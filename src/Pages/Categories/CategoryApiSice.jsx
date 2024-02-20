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

export const getSubCategoryData = async () => {
  const subcategoryDataRequest = await instance.get("/category", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const resp = await subcategoryDataRequest.data.data;
  return resp;
};

export const selectInputCategory = async () => {
  const categoryData = await instance.get("/category", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const resp = await categoryData.data.data;
  return resp;
};

export const parentCategoryAdd = async (category) => {
  const categoryDataAdd = await instance.post(
    "/category",
    {
      category_name: category.category_name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const subCategoryAdd = async (category) => {
  const subCategoryDataAdd = await instance.post(
    "/category",
    {
      category_name: category.category_name,
      parent: category.parent,
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
