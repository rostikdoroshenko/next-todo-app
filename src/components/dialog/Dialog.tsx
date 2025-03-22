"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { ReactNode, use } from "react";
import { TodosContext } from "@/store/todos-context";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  id: string;
  children: ReactNode;
}

const AlertDialog: React.FC<Props> = ({
  open,
  onClose,
  title,
  id,
  children,
}) => {
  const { deleteTodoFn } = use(TodosContext);

  function deleteButtonClick(id: string) {
    deleteTodoFn(id);
    onClose();
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="error" onClick={() => deleteButtonClick(id)} autoFocus>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AlertDialog;
