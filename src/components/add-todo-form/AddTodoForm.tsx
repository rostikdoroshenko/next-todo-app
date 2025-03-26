"use client";

import React, { useActionState } from "react";
import classes from "@/app/add-todo/page.module.css";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { Todo } from "@/models/todo-model";
import useInput from "@/hooks/use-input";
import { todoActions } from "@/store/todo-slice";
import { useDispatch } from "react-redux";
import { handleForm } from "@/lib/actions";

type Props = {
  editItem?: Todo;
  id?: string;
  cookie: any;
};

const AddTodoForm: React.FC<Props> = ({ editItem, id, cookie }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formState, formAction, isPending] = useActionState(addOrEditTodo, {
    message: null,
  });

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

  async function addOrEditTodo(
    prevState: { message: string | null },
    formData: FormData,
  ) {
    const isEdit = !!editItem;

    const todo = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    };

    if (!todo.title || todo.title.trim().length < 3) {
      return { message: "invalid title" };
    }

    if (!todo.description || !todo.description.trim()) {
      return { message: "invalid description" };
    }

    try {
      await handleForm(todo, cookie, isEdit && id ? id : null);

      dispatch(
        todoActions.toggleSnackBar({
          isOpen: true,
          message: `Todo ${!!editItem ? "updated" : "added"} successfully`,
          severity: "success",
        }),
      );
    } catch (err) {
      dispatch(
        todoActions.toggleSnackBar({
          isOpen: true,
          message: "Something went wrong...",
          severity: "error",
        }),
      );
    }
  }

  return (
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
        {formState.message && <span>{formState.message}</span>}
        <Button type="submit" data-testid="submit" disabled={isDisabled}>
          {isPending ? "Submitting..." : !!editItem ? "Update" : "Add Todo"}
        </Button>
      </div>
    </form>
  );
};

export default AddTodoForm;
