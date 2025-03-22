import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "@jest/globals";
import Accordion from "../components/accordion/Accordion";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Accordion Component", () => {
  test("delete button should open Dialog", async () => {
    const user = userEvent.setup();
    const title = "test-title";
    render(<Accordion title={title} details={"test details"} id={123} />);

    const deleteBtn = screen.queryByTestId("open-dialog");

    await user.click(deleteBtn);
    const dialogText = screen.queryByText(
      `Are you sure you want to delete ${title} todo ?`,
    );
    expect(dialogText).toBeInTheDocument();
  });
});
