"use client";

import React, { useActionState, useEffect } from "react";
import classes from "@/app/add-todo/page.module.css";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { Todo } from "@/models/todo-model";
import useInput from "@/hooks/use-input";
import { todoActions } from "@/store/todo-slice";
import { useDispatch } from "react-redux";
import FormSubmit from "@/components/add-todo-form/form-submit";
import { ActionState, formHandleAction } from "@/lib/actions";
import SimpleSnackbar from "@/components/snackbar/Snackbar";

type Props = {
  editItem?: Todo;
  id?: string;
};

const AddTodoForm: React.FC<Props> = ({ editItem, id }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formState, formAction, isPending] = useActionState(
    async (prevState: ActionState, formData: FormData) => {
      return await formHandleAction(prevState, formData);
    },
    {
      message: null,
      isEdit: !!editItem,
      id,
    },
  );

  const {
    value: titleValue,
    handleInputChange: handleTitleChange,
    handleInputBlur: handleTitleBlur,
    hasError: titleHasError,
  } = useInput(editItem ? editItem.title : "", (value) => value.length > 2);

  const {
    value: descriptionValue,
    handleInputChange: handleDescriptionChange,
    handleInputBlur: handleDescriptionBlur,
    hasError: descriptionHasError,
  } = useInput(
    editItem ? editItem.description : "",
    (value) => value.length > 0,
  );

  const isDisabled =
    titleHasError ||
    descriptionHasError ||
    isPending ||
    (editItem &&
      editItem.title === titleValue &&
      editItem.description === descriptionValue);

  useEffect(() => {
    if (formState.message === "success") {
      router.push("/todos");
      dispatch(
        todoActions.toggleSnackBar({
          isOpen: true,
          message: `Todo ${(formState as ActionState)?.isEdit ? "updated" : "added"} successfully`,
          severity: "success",
        }),
      );
    } else if (formState.message === "error") {
      dispatch(
        todoActions.toggleSnackBar({
          isOpen: true,
          message: "Something went wrong...",
          severity: "error",
        }),
      );
    }
  }, [dispatch, formState, router]);

  return (
    <>
      <form className={classes.form} action={formAction}>
        <p>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            data-testid="title"
            placeholder="Add title"
            name="title"
            required
            onBlur={handleTitleBlur}
            onChange={(event) => handleTitleChange(event.target.value)}
            value={titleValue}
          />
        </p>
        <div className="error-input">
          {titleHasError && <p>Please enter at least 3 symbols</p>}
        </div>
        <p>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Add description"
            data-testid="description"
            onBlur={handleDescriptionBlur}
            onChange={(event) => handleDescriptionChange(event.target.value)}
            value={descriptionValue}
            rows={5}
            required
          ></textarea>
        </p>
        <div className="error-input">
          {descriptionHasError && <p>Please add some description</p>}
        </div>
        <div className={classes.actions}>
          <Button
            disabled={isPending}
            variant="contained"
            type="button"
            onClick={() => router.push("/todos")}
          >
            Cancel
          </Button>
          <FormSubmit
            text={!!editItem ? "Update" : "Add Todo"}
            pending={isPending}
            disabled={isDisabled}
          />
        </div>
      </form>
      <SimpleSnackbar />
    </>
  );
};

export default AddTodoForm;
