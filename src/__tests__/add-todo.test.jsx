import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, test } from "@jest/globals";
import TodoFormPage from "../app/add-todo/page";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { redirect } from "next/navigation";

const mockStore = configureMockStore();

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Add Todo Component", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({}) }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const initialState = {
    isAuth: false,
  };
  const store = mockStore(initialState);
  test("submit button should be disabled when title is invalid", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <TodoFormPage />
      </Provider>,
    );
    const title = screen.queryByTestId("title");
    await user.type(title, "12");
    const submit = screen.queryByTestId("submit");

    await waitFor(() => {
      expect(submit).toBeDisabled();
    });
  });

  test("has Update button if editItem is set", async () => {
    const initialState = {
      editingItem: {
        id: "123",
        title: "test",
        description: "test",
      },
    };
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <TodoFormPage />
      </Provider>,
    );

    await waitFor(() => {
      const submit = screen.queryByTestId("submit");
      expect(submit).toHaveTextContent("Update");
    });
  });

  test("has Add Todo button if editItem is not set", () => {
    render(
      <Provider store={store}>
        <TodoFormPage />
      </Provider>,
    );

    const submit = screen.queryByTestId("submit");
    expect(submit).toHaveTextContent("Add Todo");
  });

  test("should call redirect to /todos", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <TodoFormPage />
      </Provider>,
    );

    const submit = screen.queryByTestId("submit");
    const title = screen.queryByTestId("title");
    const description = screen.queryByTestId("description");
    await user.type(title, "test title");
    await user.type(description, "test description");
    await user.click(submit);

    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith("/todos");
    });
  });
});
