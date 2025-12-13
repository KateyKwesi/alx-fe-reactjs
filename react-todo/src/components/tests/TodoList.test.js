import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

test("renders initial todos", () => {
  render(<TodoList />);
  expect(screen.getByText("Learn React")).toBeInTheDocument();
  expect(screen.getByText("Build a project")).toBeInTheDocument();
});

test("adds a new todo", () => {
  render(<TodoList />);

  const input = screen.getByPlaceholderText("Add todo");
  const button = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "New Todo" } });
  fireEvent.click(button);

  expect(screen.getByText("New Todo")).toBeInTheDocument();
});

test("toggles a todo", () => {
  render(<TodoList />);

  const todo = screen.getByText("Learn React");
  expect(todo).toHaveStyle("text-decoration: none");

  fireEvent.click(todo);
  expect(todo).toHaveStyle("text-decoration: line-through");
});

test("deletes a todo", () => {
  render(<TodoList />);

  const itemsBefore = screen.getAllByRole("listitem");
  expect(itemsBefore.length).toBe(2);

  const deleteButtons = screen.getAllByText("Delete");
  fireEvent.click(deleteButtons[0]);

  const itemsAfter = screen.getAllByRole("listitem");
  expect(itemsAfter.length).toBe(1);
});
