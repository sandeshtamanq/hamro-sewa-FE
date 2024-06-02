/* eslint-disable no-case-declarations */
import { createContext, useReducer } from "react";

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProductIndex = state.product.findIndex(
        (product) => product.id === action.payload.product.id
      );

      if (existingProductIndex !== -1) {
        // If the product already exists in the cart, remove it
        const updatedProducts = [...state.product];
        updatedProducts.splice(existingProductIndex, 1);
        return {
          product: [...updatedProducts, action.payload.product],
        };
      } else {
        // If the product doesn't exist in the cart, add it
        return {
          product: [...state.product, action.payload.product],
        };
      }

    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    product: [],
  });

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
