import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, { payload }) => {
      console.log("8", state);
      console.log("9", payload);
      const itemExists = state.filter((game) => game.slug === payload.slug);
      console.log("13", itemExists);
      if (itemExists) {
        // itemExists.quantity++;
        state = state.map((game) =>
          game.slug === payload.slug
            ? { ...game, quantity: game.quantity + payload.quantity }
            : game
        );
      } else {
        state.push(payload);
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.find((game) => game.slug === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.find((game) => game.slug === action.payload);
      if (item.quantity === 1) {
        const index = state.findIndex((game) => game.slug === action.payload);
        state.splice(index, 1);
      } else {
        item.quantity--;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex((game) => game.slug === action.payload);
      state.splice(index, 1);
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;
