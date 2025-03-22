import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeAll, describe, expect, test } from "@jest/globals";
import configureMockStore from "redux-mock-store";
import TodoList from "../components/todo-list/todo-list";
import { Provider } from "react-redux";

const mockStore = configureMockStore();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const initialState = {
  isAuth: true,
  snackBar: {
    isOpen: false,
    severity: "info",
    message: "Updated successfully!",
  },
};
const store = mockStore(initialState);

describe("Todo List Component", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({}) }),
    );
  });

  test("when todos fetched correctly", async () => {
    const testTodo = {
      id: "123",
      title: "test",
      description: "test",
    };
    render(
      <Provider store={store}>
        <TodoList todos={[testTodo]} validateTodoPath={() => {}} />
      </Provider>,
    );

    const todoItems = await screen.findAllByTestId("todo-item");
    expect(todoItems).not.toHaveLength(0);
  });

  test("when todos length is 0", async () => {
    render(
      <Provider store={store}>
        <TodoList todos={[]} validateTodoPath={() => {}} />
      </Provider>,
    );

    const todoItems = await screen.queryByText("No todos...");
    expect(todoItems).toBeInTheDocument();
  });
});
