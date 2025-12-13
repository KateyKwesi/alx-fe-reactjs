import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../TodoList";

describe("TodoList Component", () => {
  test("renders the TodoList component", () => {
    render(<TodoList />);
    const heading = screen.getByText(/todo list/i);
    expect(heading).toBeInTheDocument();
  });

  test("renders initial todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
    expect(screen.getByText("Master Testing")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/add a new todo/i);
    const button = screen.getByText(/add todo/i);

    fireEvent.change(input, { target: { value: "New Todo Item" } });
    fireEvent.click(button);

    expect(screen.getByText("New Todo Item")).toBeInTheDocument();
  });

  test("toggles todo completion", () => {
    render(<TodoList />);
    const todoItem = screen.getByText("Learn React");

    expect(todoItem).not.toHaveStyle("text-decoration: line-through");

    fireEvent.click(todoItem);
    expect(todoItem.parentElement).toHaveStyle("text-decoration: line-through");

    fireEvent.click(todoItem);
    expect(todoItem.parentElement).not.toHaveStyle(
      "text-decoration: line-through"
    );
  });

  test("deletes a todo", () => {
    render(<TodoList />);
    const deleteButtons = screen.getAllByText(/delete/i);
    const todoToDelete = screen.getByText("Learn React");

    expect(todoToDelete).toBeInTheDocument();

    fireEvent.click(deleteButtons[0]);

    expect(todoToDelete).not.toBeInTheDocument();
  });

  test("does not add empty todos", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/add a new todo/i);
    const button = screen.getByText(/add todo/i);

    const todosBefore = screen.getAllByRole("listitem");
    const countBefore = todosBefore.length;

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(button);

    const todosAfter = screen.getAllByRole("listitem");
    const countAfter = todosAfter.length;

    expect(countAfter).toBe(countBefore);
  });
});
