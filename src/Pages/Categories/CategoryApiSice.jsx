import instance from "../../axios/Axios";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";

const token = getTokenFromLocalStorage();

/**
 * Fetches category data from the API.
 */
export const getCategoryData = async () => {
  const categoryData = await instance.get("/category", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const resp = await categoryData.data.data;
  return resp;
};

/**
 * Fetches subcategory data from the API.
 */

// export const getSubCategoryData = async () => {
//   const subcategoryDataRequest = await instance.get("/category", {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   const resp = await subcategoryDataRequest.data.data;
//   return resp;
// };

/**
 * Fetches category data for input selection.
 */
export const selectInputCategory = async () => {
  const categoryData = await instance.get("/category", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const resp = await categoryData.data.data;
  return resp;
};

/**
 * Adds a new parent category to the API.
 *  * @param {string} category_name - The name of the new parent category.
 */
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

/**
 * Adds a new subcategory to the API.
 * @param {string} category_name - The name of the new subcategory.
 * @param {string} parent - The parent category of the subcategory.
 */

export const subCategoryAdd = async (category) => {
  const subCategoryDataAdd = await instance.post(
    "/category",
    {
      category_name: category.category_name,
      parent: category.select_category,
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
 * Deletes a category from the API.
 * @param {string} parentCategory - The parent category to delete.
 */

export const categoryDelete = async (categoryId) => {
  const categoryDeleteRequest = await instance.delete(`/category`, {
    params: { id: categoryId },
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

/**
 * Edits a category in the API.
 * @param {string} newParent - The new parent category name.
 * @param {string} previousParent - The previous parent category name.
 */
export const categoryEdit = async (newCategory, parentId) => {
  const categoryEditRequest = await instance.put(
    `/category?id=${parentId}`,
    {
      newParent: newCategory,
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
 * Edits a category in the API.
 * @param {string} newParent - The new parent category name.
 * @param {string} previousParent - The previous parent category name.
 */
export const subCategoryEdit = async (newSubCategory, subCategoryId) => {
  const categoryEditRequest = await instance.put(
    `/category?id=${subCategoryId}`,
    {
      newChild: newSubCategory,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
