import api from "./api";

export const createCartItem = (cartItem) => {
  return api.post("cart-items", cartItem);
};

export const fetchCartItems = () => {
  return api.get("cart-items");
};
