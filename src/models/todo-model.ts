import { AlertColor } from "@mui/material";

export interface Todo {
  title: string;
  description: string;
  id: string;
  userId: string;
}

export interface TodoForm {
  title: string;
  description: string;
}

export interface AppState {
  isAuth: boolean;
  snackBar: SnackBarState;
}

interface SnackBarState {
  isOpen: boolean;
  message: string;
  severity: AlertColor;
}
