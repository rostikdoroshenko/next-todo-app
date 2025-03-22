import { test, expect, Page } from "@playwright/test";

async function signIn(page: Page) {
  await page.goto("http://localhost:3000/");
  await page.getByPlaceholder("Enter your Email").fill("gavayec13@gmail.com");
  await page.getByPlaceholder("Enter your Password").fill("Qwerty321!");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
}
test.describe.configure({ mode: "serial" });
test.describe("Todo App", () => {
  let newPage: Page;
  test.beforeAll(async ({ browser }) => {
    newPage = await browser.newPage();
    await signIn(newPage);
  });

  test("has title", async () => {
    await expect(newPage).toHaveTitle(/Todo App/);
  });

  test("should get todos", async () => {
    await newPage.waitForSelector("data-testid=todo-item", {
      state: "visible",
    });
    await expect(newPage.getByTestId("todo-item").nth(0)).toBeVisible();
  });

  test("search should filter todos", async () => {
    await newPage.waitForSelector("data-testid=todo-item", {
      state: "visible",
    });
    const todos = await newPage.getByTestId("todo-item").all();
    await newPage.getByPlaceholder("type title or description").fill("Angular");
    await newPage.waitForTimeout(2000);
    const filteredTodos = await newPage.getByTestId("todo-item").all();
    expect(todos.length).not.toEqual(filteredTodos.length);
  });

  test("should add a new todo", async () => {
    await newPage.getByText("Add Todo").click();
    await newPage.getByPlaceholder("Add title").fill("Test Title");
    await newPage.getByPlaceholder("Add description").fill("test description");
    await newPage.getByRole("button", { name: "Add Todo" }).click();

    await expect(newPage.getByText("Search Todo")).toBeVisible();
    await expect(newPage.getByText("Test Title")).toBeVisible();
  });

  test("should delete todo", async () => {
    await newPage.getByText("Test Title").click();
    await newPage.getByTestId("open-dialog-Test Title").click();
    await newPage.getByRole("button", { name: "yes, delete" }).click();
    await newPage.waitForSelector("text=Test Title", { state: "detached" });
    await expect(newPage.getByText("Test Title")).not.toBeVisible();
  });

  test("sign in and sign out", async () => {
    await expect(newPage.getByText("Search Todo")).toBeVisible();
    await newPage
      .getByRole("button", { name: "Sign Out", exact: true })
      .click();
    await expect(newPage.getByText("Search Todo")).not.toBeVisible();
  });
});
