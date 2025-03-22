import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "@jest/globals";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import MainHeader from "../components/main-header/main-header";

const mockStore = configureMockStore();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Main Header ", () => {
  describe("with not authenticated user", () => {
    const initialState = {
      isAuth: false,
    };
    const store = mockStore(initialState);

    test("not renders a todo list link", () => {
      render(
        <Provider store={store}>
          <MainHeader />
        </Provider>,
      );

      const text = screen.queryByText("Todo List");
      expect(text).not.toBeInTheDocument();
    });

    test("renders a signIn button", () => {
      render(
        <Provider store={store}>
          <MainHeader />
        </Provider>,
      );

      const button = screen.queryByTestId("signin-button");
      expect(button).toHaveTextContent("Sign In");
    });

    test("not renders a signOut button", () => {
      render(
        <Provider store={store}>
          <MainHeader />
        </Provider>,
      );

      const button = screen.queryByTestId("signin-button");
      expect(button).not.toHaveTextContent("Sign Out");
    });

    test("renders a heading", () => {
      const initialState = {
        isAuth: true,
      };
      const store = mockStore(initialState);
      render(
        <Provider store={store}>
          <MainHeader />
        </Provider>,
      );

      const text = screen.getByText("Notebook");
      expect(text).toBeInTheDocument();
    });
  });

  describe("with authenticated user", () => {
    const initialState = {
      isAuth: true,
    };
    const store = mockStore(initialState);

    test("renders a todo list link", () => {
      render(
        <Provider store={store}>
          <MainHeader />
        </Provider>,
      );

      const text = screen.queryByText("Todo List");
      expect(text).toBeInTheDocument();
    });

    test("renders a signOut button", () => {
      render(
        <Provider store={store}>
          <MainHeader />
        </Provider>,
      );

      const button = screen.queryByTestId("signin-button");
      expect(button).toHaveTextContent("Sign Out");
    });
  });
});
