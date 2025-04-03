import classes from "./page.module.css";
import AddTodoForm from "@/components/add-todo-form/AddTodoForm";

const TodoFormPage = async () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Add your <span className={classes.highlight}>ToDo</span>
        </h1>
      </header>
      <main className={classes.main}>
        <AddTodoForm />
      </main>
    </>
  );
};

export default TodoFormPage;
