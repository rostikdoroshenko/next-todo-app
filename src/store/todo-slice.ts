import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "@/models/todo-model";
import { AlertColor } from "@mui/material";

export const todosInitState: AppState = {
  isAuth: false,
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
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice;
