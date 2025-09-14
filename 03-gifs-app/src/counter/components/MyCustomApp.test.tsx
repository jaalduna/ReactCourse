import { describe, expect, test } from "vitest";
import { MyCounterApp } from "./MyCounterApp";
import { fireEvent, render, screen } from "@testing-library/react";

describe("MyCustomApp", () => {
  test("should render the component", () => {
    render(<MyCounterApp />);

    expect(screen.getByRole("heading", { level: 1 })).toBeDefined();
    expect(screen.getAllByRole("button")).toHaveLength(3);
    expect(screen.getByRole("button", { name: "+1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "-1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "reset" })).toBeDefined();
  });

  test("should increment counter when button +1 is pressed", () => {
    render(<MyCounterApp />);

    const h1 = screen.getByRole("heading", { level: 1 });
    const button = screen.getByRole("button", { name: "+1" });

    fireEvent.click(button);
    expect(h1.innerHTML).toContain("counter: 11");
  });

  test("should decrese counter when button -1 is pressed", () => {
    render(<MyCounterApp />);

    const h1 = screen.getByRole("heading", { level: 1 });
    const button = screen.getByRole("button", { name: "-1" });

    fireEvent.click(button);
    expect(h1.innerHTML).toContain("counter: 9");
  });
  test("should reset counter when reset button is pressed", () => {
    render(<MyCounterApp />);

    const h1 = screen.getByRole("heading", { level: 1 });
    const button = screen.getByRole("button", { name: "-1" });
    const reset = screen.getByRole("button", { name: "reset" });

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(reset);
    expect(h1.innerHTML).toContain("counter: 10");
  });
});
