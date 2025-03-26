import classes from "./page.module.css";
import AddTodoForm from "@/components/add-todo-form/AddTodoForm";
import { headers } from "next/headers";

const TodoFormPage = async () => {
  const cookie = (await headers()).get("cookie") || "";

  return (
    <>
      <header className={classes.header}>
        <h1>
          Add your <span className={classes.highlight}>ToDo</span>
        </h1>
      </header>
      <main className={classes.main}>
        <AddTodoForm cookie={cookie} />
      </main>
    </>
  );
};

export default TodoFormPage;
