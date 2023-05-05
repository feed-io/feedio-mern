import { createContext } from "react";

export const UserDataContext = createContext({
  addProduct: () => {},
  productId: [],
});
