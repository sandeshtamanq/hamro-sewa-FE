import { useContext } from "react";
import { DropdownContext } from "../context/dropdown-context";

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw Error("Something went wrong");
  }

  return context;
};
