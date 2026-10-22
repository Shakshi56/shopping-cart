import { createSlice } from "@reduxjs/toolkit";

const saved = JSON.parse(localStorage.getItem("cart") || "[]");

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: saved },
  reducers: {
    addToCart(state, { payload }) {
      const found = state.items.find((i) => i._id === payload._id);
      if (found) {
        if (found.qty < payload.stock) found.qty += 1;
      } else {
        state.items.push({ ...payload, qty: 1 });
      }
    },
    removeFromCart(state, { payload }) {
      state.items = state.items.filter((i) => i._id !== payload);
    },
    increaseQty(state, { payload }) {
      const it = state.items.find((i) => i._id === payload);
      if (it && it.qty < it.stock) it.qty += 1;
    },
    decreaseQty(state, { payload }) {
      const it = state.items.find((i) => i._id === payload);
      if (it && it.qty > 1) it.qty -= 1;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
export const selectTotalItems = (s) => s.cart.items.reduce((n, i) => n + i.qty, 0);
export const selectTotalAmount = (s) => s.cart.items.reduce((n, i) => n + i.qty * i.price, 0);
export default cartSlice.reducer;
