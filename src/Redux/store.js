import { configureStore } from "@Reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favoriteReducer from "./FavoriteSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorite: favoriteReducer,
  },
});

export default store;