import { useMutation, useQuery } from "react-query";
import { createCartItem, fetchCartItems } from "../api/cart-item.api";

export const useFetchCartItemQuery = () => {
  return useQuery("cart-item", fetchCartItems, {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 0,
  });
};

export const useAddCartItemMutation = (onSuccess, onError) => {
  return useMutation({ mutationFn: createCartItem, onError, onSuccess });
};
