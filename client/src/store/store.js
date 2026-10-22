import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";
import authReducer from "./authSlice.js";

const store = configureStore({ reducer: { cart: cartReducer, auth: authReducer } });

store.subscribe(() => {
  const { cart, auth } = store.getState();
  localStorage.setItem("cart", JSON.stringify(cart.items));
  if (auth.token) localStorage.setItem("auth", JSON.stringify(auth));
  else localStorage.removeItem("auth");
});

export default store;
