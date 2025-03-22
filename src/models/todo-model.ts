import { AlertColor } from "@mui/material";

export interface Todo {
  title: string;
  description: string;
  id: string;
}

export interface TodoForm {
  title: string;
  description: string;
}

export interface AppState {
  isAuth: boolean;
  items: Todo[];
  editingItem: Todo | null;
  snackBar: SnackBarState;
}

interface SnackBarState {
  isOpen: boolean;
  message: string;
  severity: AlertColor;
}
