import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../products/ProductSlice";
import cartReducer from "../cart/cartSlice"; // Fixed: import as cartReducer

const store = configureStore({
  reducer: {
    products: productReducer, // Fixed: consistent naming
    cart: cartReducer // Fixed: use cartReducer
  }
});

export default store;