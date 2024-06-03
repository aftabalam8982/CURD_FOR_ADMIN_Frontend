import { configureStore } from "@reduxjs/toolkit";
import products from "./getProductsSlice";

export const store = configureStore({
  reducer: {
    products,
  },
});
