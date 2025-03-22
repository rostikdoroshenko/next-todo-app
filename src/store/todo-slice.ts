import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "@/models/todo-model";
import { AlertColor } from "@mui/material";

export const todosInitState: AppState = {
  isAuth: false,
  items: [],
  editingItem: null,
  snackBar: {
    isOpen: false,
    severity: "info",
    message: "Updated successfully!",
  },
};

const todoSlice = createSlice({
  name: "todos",
  initialState: todosInitState,
  reducers: {
    setAuth(state, action: { payload: boolean }) {
      state.isAuth = action.payload;
    },

    addItems(state, action) {
      state.items = action.payload;
    },

    toggleSnackBar(
      state,
      action: {
        payload: { isOpen: boolean; message?: string; severity?: AlertColor };
      },
    ) {
      state.snackBar.isOpen = action.payload.isOpen;
      if (action.payload.message)
        state.snackBar.message = action.payload.message;
      if (action.payload.severity)
        state.snackBar.severity = action.payload.severity;
    },

    setEditItem(state, action) {
      state.editingItem = action.payload;
    },

    updateItem(state, action) {
      const existing = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existing) {
        state.items = state.items.map((item) =>
          item.id === existing.id ? { ...action.payload } : item,
        );
      }
    },

    addItemToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (!existing) {
        state.items.push({ ...item });
      }
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        state.items = state.items.filter((i) => i.id !== id);
      }
    },
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice;
