import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { MyCounterApp } from "./MyCounterApp";

const handleAddMock = vi.fn();
const handleSubstractMock = vi.fn();
const handleResetMock = vi.fn();
vi.mock("../hooks/useCounter", () => ({
  useCounter: () => ({
    counter: 40,
    handleAdd: handleAddMock,
    handleSubstract: handleSubstractMock,
    handleReset: handleResetMock,
  }),
}));

describe("MyCounterApp", () => {
  test("should render the component", () => {
    render(<MyCounterApp />);

    expect(screen.getByRole("heading", { level: 1 })).toBeDefined();
    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toBe(
      "counter: 40",
    );
    expect(screen.getAllByRole("button")).toHaveLength(3);
    expect(screen.getByRole("button", { name: "+1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "-1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "reset" })).toBeDefined();
  });

  test("should call handleAdd when button +1 is clicked", () => {
    render(<MyCounterApp />);
    const button = screen.getByRole("button", { name: "+1" });

    fireEvent.click(button);

    expect(handleAddMock).toBeCalledTimes(1);
  });
  test("should call handleSubstract when button -1 is clicked", () => {
    render(<MyCounterApp />);
    const button = screen.getByRole("button", { name: "-1" });

    fireEvent.click(button);

    expect(handleSubstractMock).toBeCalledTimes(1);
  });
  test("should call handleAdd when button +1 is clicked", () => {
    render(<MyCounterApp />);
    const button = screen.getByRole("button", { name: "reset" });

    fireEvent.click(button);

    expect(handleResetMock).toBeCalledTimes(1);
  });
});
