import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../TodoList";

describe("TodoList Component", () => {
  test("renders TodoList component correctly", () => {
    render(<TodoList />);
    const heading = screen.getByText(/Todo List/i);
    expect(heading).toBeInTheDocument();
  });

  test("renders initial demo todos", () => {
    render(<TodoList />);
    expect(screen.getByText(/Learn React/i)).toBeInTheDocument();
    expect(screen.getByText(/Build a Todo App/i)).toBeInTheDocument();
    expect(screen.getByText(/Master Testing/i)).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);
    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByText(/Add Todo/i);

    fireEvent.change(input, { target: { value: "New Todo Item" } });
    fireEvent.click(addButton);

    expect(screen.getByText(/New Todo Item/i)).toBeInTheDocument();
  });

  test("toggles todo completion status", () => {
    render(<TodoList />);
    const todoItem = screen.getByText(/Learn React/i);

    // Initially not completed
    expect(todoItem).not.toHaveStyle("text-decoration: line-through");

    // Click to toggle
    fireEvent.click(todoItem);
    expect(todoItem).toHaveStyle("text-decoration: line-through");

    // Click again to toggle back
    fireEvent.click(todoItem);
    expect(todoItem).not.toHaveStyle("text-decoration: line-through");
  });

  test("deletes a todo", () => {
    render(<TodoList />);
    const todoItem = screen.getByText(/Learn React/i);
    const deleteButtons = screen.getAllByText(/Delete/i);

    // Click the first delete button
    fireEvent.click(deleteButtons[0]);

    expect(todoItem).not.toBeInTheDocument();
  });

  test("does not add empty todos", () => {
    render(<TodoList />);
    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByText(/Add Todo/i);

    const initialTodoCount = screen.getAllByRole("listitem").length;

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(addButton);

    const finalTodoCount = screen.getAllByRole("listitem").length;
    expect(finalTodoCount).toBe(initialTodoCount);
  });
});
