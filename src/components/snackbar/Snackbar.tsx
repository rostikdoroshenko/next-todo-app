import {
  Alert,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import React, { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/models/todo-model";
import { todoActions } from "@/store/todo-slice";

const SimpleSnackbar: React.FC = () => {
  const open = useSelector((state: AppState) => state.snackBar.isOpen);
  const message = useSelector((state: AppState) => state.snackBar.message);
  const severity = useSelector((state: AppState) => state.snackBar.severity);
  const dispatch = useDispatch();

  const handleClose = (
    event: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(
      todoActions.toggleSnackBar({
        isOpen: false,
      }),
    );
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}
        action={action}
      >
        <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SimpleSnackbar;
