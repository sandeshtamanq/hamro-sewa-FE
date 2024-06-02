import { useMutation, useQuery } from "react-query";
import {
  addCategory,
  deleteCategory,
  fetchCategory,
  fetchCategoryDetail,
  updateCategory,
} from "../api/category.api";

export const useFetchCategoryQuery = () => {
  return useQuery("categories", fetchCategory, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useFetchCategoryDetailQuery = (id) => {
  return useQuery(["categories", id], () => fetchCategoryDetail(id), {
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useAddCategoryMutation = (onSuccess, onError) => {
  return useMutation({ mutationFn: addCategory, onError, onSuccess });
};

export const useUpdateCategoryMutation = (onSuccess, onError) => {
  return useMutation({ mutationFn: updateCategory, onError, onSuccess });
};

export const useDeleteCategoryMutation = (onSuccess, onError) => {
  return useMutation({ mutationFn: deleteCategory, onError, onSuccess });
};
