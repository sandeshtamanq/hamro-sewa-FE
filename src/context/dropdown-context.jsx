import { createContext, useReducer } from "react";

export const DropdownContext = createContext();

export const dropdownReducer = (state, action) => {
  switch (action.type) {
    case "OPEN":
      return {
        open: !state.open,
      };

    default:
      return state;
  }
};

export const DropdownContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dropdownReducer, {
    open: false,
  });

  return (
    <DropdownContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DropdownContext.Provider>
  );
};
