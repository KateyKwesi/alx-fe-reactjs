import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTodoForm from "../AddTodoForm";

describe("AddTodoForm Component Tests", () => {
  test("renders input and button", () => {
    const mockAddTodo = jest.fn();
    render(<AddTodoForm addTodo={mockAddTodo} />);

    expect(screen.getByPlaceholderText("Add a new todo")).toBeInTheDocument();
    expect(screen.getByText("Add Todo")).toBeInTheDocument();
  });

  test("calls addTodo when form is submitted with valid input", () => {
    const mockAddTodo = jest.fn();
    render(<AddTodoForm addTodo={mockAddTodo} />);

    const input = screen.getByPlaceholderText("Add a new todo");
    const button = screen.getByText("Add Todo");

    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.click(button);

    expect(mockAddTodo).toHaveBeenCalledWith("Test Todo");
    expect(input.value).toBe("");
  });

  test("does not call addTodo with empty input", () => {
    const mockAddTodo = jest.fn();
    render(<AddTodoForm addTodo={mockAddTodo} />);

    const button = screen.getByText("Add Todo");
    fireEvent.click(button);

    expect(mockAddTodo).not.toHaveBeenCalled();
  });
});
