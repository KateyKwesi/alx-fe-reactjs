import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../TodoList";

describe("TodoList Component Tests", () => {
  // Test 1: Initial Render
  test("renders TodoList component with initial todos", () => {
    render(<TodoList />);

    // Check if heading exists
    expect(screen.getByText("Todo List")).toBeInTheDocument();

    // Check if initial todos are rendered
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
    expect(screen.getByText("Master Testing")).toBeInTheDocument();
  });

  // Test 2: Add Todo Functionality
  test("adds a new todo item", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a new todo");
    const addButton = screen.getByText("Add Todo");

    // Type new todo
    fireEvent.change(input, { target: { value: "New Test Todo" } });

    // Submit form
    fireEvent.click(addButton);

    // Verify new todo appears
    expect(screen.getByText("New Test Todo")).toBeInTheDocument();

    // Verify input is cleared
    expect(input.value).toBe("");
  });

  // Test 3: Toggle Todo Completion
  test("toggles todo completion status when clicked", () => {
    render(<TodoList />);

    const todoItem = screen.getByText("Learn React").parentElement;

    // Initially should not be completed
    expect(todoItem).toHaveStyle("text-decoration: none");

    // Click to mark as completed
    fireEvent.click(todoItem);
    expect(todoItem).toHaveStyle("text-decoration: line-through");

    // Click again to mark as not completed
    fireEvent.click(todoItem);
    expect(todoItem).toHaveStyle("text-decoration: none");
  });

  // Test 4: Delete Todo Functionality
  test("deletes a todo item when delete button is clicked", () => {
    render(<TodoList />);

    const todoText = "Learn React";
    expect(screen.getByText(todoText)).toBeInTheDocument();

    // Get all delete buttons
    const deleteButtons = screen.getAllByText("Delete");

    // Click the first delete button
    fireEvent.click(deleteButtons[0]);

    // Verify todo is removed
    expect(screen.queryByText(todoText)).not.toBeInTheDocument();
  });

  // Test 5: Prevent Empty Todos
  test("does not add empty or whitespace-only todos", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a new todo");
    const addButton = screen.getByText("Add Todo");

    // Count initial todos
    const initialTodos = screen.getAllByRole("listitem");
    const initialCount = initialTodos.length;

    // Try to add empty todo
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(addButton);

    // Count should remain the same
    let currentTodos = screen.getAllByRole("listitem");
    expect(currentTodos.length).toBe(initialCount);

    // Try to add whitespace-only todo
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(addButton);

    // Count should still remain the same
    currentTodos = screen.getAllByRole("listitem");
    expect(currentTodos.length).toBe(initialCount);
  });

  // Test 6: Multiple Todos Operations
  test("handles multiple todo operations correctly", () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a new todo");
    const addButton = screen.getByText("Add Todo");

    // Add first todo
    fireEvent.change(input, { target: { value: "First Todo" } });
    fireEvent.click(addButton);

    // Add second todo
    fireEvent.change(input, { target: { value: "Second Todo" } });
    fireEvent.click(addButton);

    // Verify both are added
    expect(screen.getByText("First Todo")).toBeInTheDocument();
    expect(screen.getByText("Second Todo")).toBeInTheDocument();

    // Toggle first todo
    const firstTodo = screen.getByText("First Todo").parentElement;
    fireEvent.click(firstTodo);
    expect(firstTodo).toHaveStyle("text-decoration: line-through");

    // Delete second todo
    const deleteButtons = screen.getAllByText("Delete");
    const secondTodoDeleteButton = deleteButtons[deleteButtons.length - 1];
    fireEvent.click(secondTodoDeleteButton);

    expect(screen.queryByText("Second Todo")).not.toBeInTheDocument();
    expect(screen.getByText("First Todo")).toBeInTheDocument();
  });
});
