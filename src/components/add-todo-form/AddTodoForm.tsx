"use client";

import React, { FormEvent, useState } from "react";
import classes from "@/app/add-todo/page.module.css";
import { Button } from "@mui/material";
import { redirect } from "next/navigation";
import { Todo } from "@/models/todo-model";
import useInput from "@/hooks/use-input";
import todoAPIs from "@/service/todo-api";
import { todoActions } from "@/store/todo-slice";
import { useDispatch } from "react-redux";

type Props = {
  editItem?: Todo;
  id?: string;
};

const AddTodoForm: React.FC<Props> = ({ editItem, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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

  async function addOrEditTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const isEdit = !!editItem;
    if (titleValue) {
      const todo = { title: titleValue, description: descriptionValue };
      try {
        if (isEdit && id) await todoAPIs.editTodo(todo, id);
        else await todoAPIs.addTodo(todo);

        dispatch(
          todoActions.toggleSnackBar({
            isOpen: true,
            message: `Todo ${!!editItem ? "updated" : "added"} successfully`,
            severity: "success",
          }),
        );
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        dispatch(
          todoActions.toggleSnackBar({
            isOpen: true,
            message: "Something went wrong...",
            severity: "error",
          }),
        );
      }
      redirect("/todos");
    }
  }

  return (
    <form className={classes.form} onSubmit={addOrEditTodo}>
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
      <p className={classes.actions}>
        <Button
          disabled={isLoading}
          variant="contained"
          type="button"
          onClick={() => redirect("/todos")}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          data-testid="submit"
          disabled={titleHasError || descriptionHasError || isLoading}
        >
          {!!editItem ? "Update" : "Add Todo"}
        </Button>
      </p>
    </form>
  );
};

export default AddTodoForm;
