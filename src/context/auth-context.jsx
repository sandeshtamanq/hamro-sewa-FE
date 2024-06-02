import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
        isLoggedIn: true,
      };

    case "UPDATE":
      return {
        user: action.payload,
        isLoggedIn: state.isLoggedIn,
      };

    case "LOGOUT":
      return {
        user: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoggedIn: false,
  });
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
