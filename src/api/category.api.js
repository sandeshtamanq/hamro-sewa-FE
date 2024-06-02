import api from "./api";

export const fetchCategory = () => {
  return api.get("categories");
};

export const fetchCategoryDetail = (id) => {
  return api.get(`categories/${id}`);
};

export const addCategory = (categoryDetail) => {
  return api.post("categories", categoryDetail);
};

export const updateCategory = (categoryDetail) => {
  return api.patch(`categories/${categoryDetail.id}`, categoryDetail);
};

export const deleteCategory = (id) => {
  return api.delete(`categories/${id}`);
};
