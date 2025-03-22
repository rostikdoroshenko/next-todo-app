import React, { FormEvent } from "react";
import classes from "@/app/add-todo/page.module.css";
import { Button } from "@mui/material";
import { redirect } from "next/navigation";
import { Todo, TodoForm } from "@/models/todo-model";
import useInput from "@/hooks/use-input";

type Props = {
  isLoading: boolean;
  editItem: Todo | null;
  onSubmit: (todo: TodoForm) => void;
};

const AddTodoForm = ({ isLoading, editItem, onSubmit }: Props) => {
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({ title: titleValue, description: descriptionValue });
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
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
